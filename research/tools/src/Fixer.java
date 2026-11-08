import com.sun.source.tree.AssignmentTree;
import com.sun.source.tree.BinaryTree;
import com.sun.source.tree.CompilationUnitTree;
import com.sun.source.tree.CompoundAssignmentTree;
import com.sun.source.tree.ExpressionTree;
import com.sun.source.tree.IdentifierTree;
import com.sun.source.tree.MethodTree;
import com.sun.source.tree.ParenthesizedTree;
import com.sun.source.tree.Tree;
import com.sun.source.tree.UnaryTree;
import com.sun.source.tree.VariableTree;
import com.sun.source.util.JavacTask;
import com.sun.source.util.SourcePositions;
import com.sun.source.util.TreePath;
import com.sun.source.util.TreePathScanner;
import com.sun.source.util.Trees;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.type.TypeKind;
import javax.lang.model.type.TypeMirror;
import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;

/**
 * Repairs decompiler output where an obfuscator reused boolean slots as ints.
 * In bytecode booleans are ints, so retyping a slot to int and coercing at
 * boolean/int boundaries ("!= 0", "? 1 : 0") preserves semantics exactly.
 *
 * usage: java Fixer.java <classpath> <srcdir>
 */
public final class Fixer {
    record Edit(Path file, long start, long end, String replacement, int priority, boolean retype) {
        Edit(Path file, long start, long end, String replacement, int priority) {
            this(file, start, end, replacement, priority, false);
        }
    }

    public static void main(String[] args) throws Exception {
        String classpath = args[0];
        Path src = Path.of(args[1]);
        for (int round = 1; round <= 40; round++) {
            int errors = round(classpath, src);
            if (errors <= 0) {
                System.out.println("round " + round + ": " + (errors == 0 ? "clean" : "no fixable edits"));
                return;
            }
        }
        System.out.println("gave up after 40 rounds");
    }

    static int round(String classpath, Path src) throws Exception {
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector<JavaFileObject> diags = new DiagnosticCollector<>();
        StandardJavaFileManager fm = compiler.getStandardFileManager(diags, Locale.ENGLISH, StandardCharsets.UTF_8);
        List<File> files = new ArrayList<>();
        try (var s = Files.list(src)) {
            s.filter(p -> p.toString().endsWith(".java")).forEach(p -> files.add(p.toFile()));
        }
        JavacTask task = (JavacTask) compiler.getTask(null, fm, diags,
                List.of("-proc:none", "-Xmaxerrs", "5000", "-cp", classpath, "-d", Files.createTempDirectory("fixer").toString()),
                null, fm.getJavaFileObjectsFromFiles(files));
        Iterable<? extends CompilationUnitTree> units = task.parse();
        task.analyze();
        Trees trees = Trees.instance(task);
        SourcePositions pos = trees.getSourcePositions();
        Map<String, CompilationUnitTree> byFile = new HashMap<>();
        for (CompilationUnitTree u : units) {
            byFile.put(Path.of(u.getSourceFile().toUri()).toString(), u);
        }

        List<Edit> edits = new ArrayList<>();
        Set<Element> retyped = new HashSet<>();
        int errorCount = 0;
        for (Diagnostic<? extends JavaFileObject> d : diags.getDiagnostics()) {
            if (d.getKind() != Diagnostic.Kind.ERROR) {
                continue;
            }
            errorCount++;
            Path file = Path.of(d.getSource().toUri());
            CompilationUnitTree unit = byFile.get(file.toString());
            String msg = d.getMessage(Locale.ENGLISH);
            TreePath path = find(unit, pos, d.getStartPosition(), d.getEndPosition());
            if (path == null) {
                System.err.println("no tree for " + file.getFileName() + ":" + d.getLineNumber() + " " + msg);
                continue;
            }
            Tree leaf = path.getLeaf();
            String text = source(unit, pos, leaf);

            if (msg.contains("int cannot be converted to boolean") || msg.contains("byte cannot be converted to boolean")) {
                Element target = assignedVariable(path, trees);
                if (target != null && isBoolean(target) && !retyped.contains(target)) {
                    retype(target, trees, unit, pos, edits, file);
                    retyped.add(target);
                } else if (target == null || !isBoolean(target)) {
                    edits.add(new Edit(file, pos.getStartPosition(unit, leaf), pos.getEndPosition(unit, leaf), "((" + text + ") != 0)", 1));
                }
            } else if (msg.contains("boolean cannot be converted to")) {
                edits.add(new Edit(file, pos.getStartPosition(unit, leaf), pos.getEndPosition(unit, leaf), "((" + text + ") ? 1 : 0)", 1));
            } else if (msg.contains("bad operand type boolean for unary operator")) {
                ExpressionTree operand = ((UnaryTree) leaf).getExpression();
                Element target = trees.getElement(new TreePath(path, operand));
                if (target != null && !retyped.contains(target)) {
                    retype(target, trees, unit, pos, edits, file);
                    retyped.add(target);
                }
            } else if (msg.contains("bad operand types for binary operator") || msg.contains("incomparable types")) {
                Tree bin = leaf instanceof BinaryTree ? leaf : leaf instanceof CompoundAssignmentTree ? leaf : null;
                if (bin instanceof BinaryTree b) {
                    for (ExpressionTree operand : List.of(b.getLeftOperand(), b.getRightOperand())) {
                        TypeMirror t = trees.getTypeMirror(new TreePath(path, operand));
                        if (t != null && t.getKind() == TypeKind.BOOLEAN) {
                            edits.add(new Edit(file, pos.getStartPosition(unit, operand), pos.getEndPosition(unit, operand),
                                    "((" + source(unit, pos, operand) + ") ? 1 : 0)", 1));
                        }
                    }
                } else if (bin instanceof CompoundAssignmentTree c) {
                    Element target = trees.getElement(new TreePath(path, c.getVariable()));
                    if (target != null && isBoolean(target) && !retyped.contains(target)) {
                        retype(target, trees, unit, pos, edits, file);
                        retyped.add(target);
                    }
                } else {
                    System.err.println("unhandled binary at " + file.getFileName() + ":" + d.getLineNumber() + " " + leaf.getKind());
                }
            } else if (msg.contains("selector type boolean is not allowed")) {
                edits.add(new Edit(file, pos.getStartPosition(unit, leaf), pos.getEndPosition(unit, leaf), "((" + text + ") ? 1 : 0)", 1));
            } else {
                System.err.println("unhandled: " + file.getFileName() + ":" + d.getLineNumber() + " " + msg.lines().findFirst().orElse(""));
            }
        }
        System.out.println("errors=" + errorCount + " edits=" + edits.size() + " retyped=" + retyped.size());
        if (errorCount == 0) {
            return 0;
        }
        // Retype first: a slot that becomes int must not also get boolean coercions this round.
        List<Edit> retypeEdits = edits.stream().filter(e -> e.priority() >= 2 || e.retype()).toList();
        if (!retypeEdits.isEmpty()) {
            edits = new ArrayList<>(retypeEdits);
        }
        if (edits.isEmpty()) {
            for (Diagnostic<? extends JavaFileObject> d : diags.getDiagnostics()) {
                if (d.getKind() == Diagnostic.Kind.ERROR) {
                    System.err.println(Path.of(d.getSource().toUri()).getFileName() + ":" + d.getLineNumber() + " " + d.getMessage(Locale.ENGLISH));
                }
            }
            return -1;
        }
        apply(edits);
        return errorCount;
    }

    static boolean isBoolean(Element e) {
        return e.asType().getKind() == TypeKind.BOOLEAN;
    }

    /** Variable receiving the value at path: "x = <expr>" or "boolean x = <expr>". */
    static Element assignedVariable(TreePath path, Trees trees) {
        TreePath p = path;
        while (p.getParentPath() != null && p.getParentPath().getLeaf() instanceof ParenthesizedTree) {
            p = p.getParentPath();
        }
        Tree parent = p.getParentPath() == null ? null : p.getParentPath().getLeaf();
        if (parent instanceof AssignmentTree a && a.getExpression() == p.getLeaf()) {
            Element e = trees.getElement(new TreePath(p.getParentPath(), a.getVariable()));
            return local(e);
        }
        if (parent instanceof VariableTree v && v.getInitializer() == p.getLeaf()) {
            return local(trees.getElement(p.getParentPath()));
        }
        return null;
    }

    static Element local(Element e) {
        if (e != null && (e.getKind() == ElementKind.LOCAL_VARIABLE || e.getKind() == ElementKind.PARAMETER)) {
            return e;
        }
        return null;
    }

    static void retype(Element target, Trees trees, CompilationUnitTree unit, SourcePositions pos, List<Edit> edits, Path file) {
        TreePath decl = trees.getPath(target);
        if (decl == null) {
            System.err.println("no declaration for " + target);
            return;
        }
        VariableTree v = (VariableTree) decl.getLeaf();
        Tree type = v.getType();
        if (target.getKind() == ElementKind.LOCAL_VARIABLE) {
            edits.add(new Edit(file, pos.getStartPosition(unit, type), pos.getEndPosition(unit, type), "int", 2));
            if (v.getInitializer() != null) {
                ExpressionTree init = v.getInitializer();
                TypeMirror t = trees.getTypeMirror(new TreePath(decl, init));
                if (t != null && t.getKind() == TypeKind.BOOLEAN) {
                    edits.add(new Edit(file, pos.getStartPosition(unit, init), pos.getEndPosition(unit, init),
                            "((" + source(unit, pos, init) + ") ? 1 : 0)", 1, true));
                }
            }
            return;
        }
        String name = v.getName().toString();
        long nameEnd = pos.getEndPosition(unit, v);
        edits.add(new Edit(file, nameEnd - name.length(), nameEnd, name + "_z", 2));
        MethodTree m = (MethodTree) decl.getParentPath().getLeaf();
        long bodyStart = pos.getStartPosition(unit, m.getBody());
        edits.add(new Edit(file, bodyStart + 1, bodyStart + 1, "\n      int " + name + " = " + name + "_z ? 1 : 0;", 3));
        System.out.println("retype param " + name + " in " + m.getName());
    }

    static String source(CompilationUnitTree unit, SourcePositions pos, Tree t) {
        try {
            CharSequence cs = unit.getSourceFile().getCharContent(true);
            return cs.subSequence((int) pos.getStartPosition(unit, t), (int) pos.getEndPosition(unit, t)).toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /** Smallest tree covering [start, end]. */
    static TreePath find(CompilationUnitTree unit, SourcePositions pos, long start, long end) {
        TreePath[] best = new TreePath[1];
        new TreePathScanner<Void, Void>() {
            @Override
            public Void scan(Tree tree, Void unused) {
                if (tree == null) {
                    return null;
                }
                long s = pos.getStartPosition(unit, tree);
                long e = pos.getEndPosition(unit, tree);
                if (s <= start && e >= end && s >= 0) {
                    TreePath p = new TreePath(getCurrentPath(), tree);
                    if (best[0] == null || (s >= pos.getStartPosition(unit, best[0].getLeaf()) && e <= pos.getEndPosition(unit, best[0].getLeaf()))) {
                        best[0] = p;
                    }
                    return super.scan(tree, unused);
                }
                return null;
            }
        }.scan(new TreePath(unit), null);
        return best[0];
    }

    static void apply(List<Edit> edits) throws Exception {
        Map<Path, List<Edit>> byFile = new HashMap<>();
        for (Edit e : edits) {
            byFile.computeIfAbsent(e.file(), k -> new ArrayList<>()).add(e);
        }
        for (var entry : byFile.entrySet()) {
            List<Edit> list = entry.getValue();
            list.sort(Comparator.comparingLong(Edit::start).reversed().thenComparing(Comparator.comparingInt(Edit::priority).reversed()));
            StringBuilder sb = new StringBuilder(Files.readString(entry.getKey()));
            long lastStart = Long.MAX_VALUE;
            Set<String> seen = new HashSet<>();
            for (Edit e : list) {
                String key = e.start() + ":" + e.end() + ":" + e.replacement();
                if (!seen.add(key)) {
                    continue;
                }
                if (e.end() > lastStart && e.start() != e.end()) {
                    continue;
                }
                sb.replace((int) e.start(), (int) e.end(), e.replacement());
                if (e.start() != e.end()) {
                    lastStart = e.start();
                }
            }
            Files.writeString(entry.getKey(), sb.toString());
        }
    }
}
