import com.sun.source.tree.*;
import com.sun.source.util.JavacTask;
import com.sun.source.util.TreePath;
import com.sun.source.util.TreePathScanner;
import com.sun.source.util.Trees;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import javax.lang.model.element.*;
import javax.lang.model.type.*;
import javax.tools.*;

/**
 * Java (decompiled MIDlet) to TypeScript transpiler driven by javac's attributed trees.
 *
 * usage: java J2TS.java <classpath> <srcdir> <outdir> [--check]
 *
 * Integer semantics: int multiply/divide/unsigned-shift and narrowing casts are
 * emitted exactly; int +/- are emitted plainly (and instrumented in --check mode
 * so overflow sites can be found); long maps to bigint with 64-bit wrapping.
 */
public final class J2TS {
    enum K { INT, SHORT, BYTE, CHAR, LONG, BOOLEAN, DOUBLE, FLOAT, STRING, ARRAY, REF, NULL, VOID }

    static final Map<String, String> RUNTIME_MODULE = new LinkedHashMap<>();

    static {
        for (String s : List.of("Vector", "Hashtable", "Stack", "Enumeration", "Random", "StringBuffer",
                "JavaThread", "Runnable", "ArrayIndexOutOfBoundsException", "IllegalArgumentException",
                "NoSuchElementException", "arraycopy", "classForName", "bytesToString", "toCharArray", "parseInt32",
                "errorMessage", "printStackTrace", "threadYield", "idiv", "lidiv", "d2i", "l2i", "band", "bor", "bxor",
                "newArray", "ci", "ca", "cs", "charStr", "jstr", "lshl", "lshr", "lushr", "replaceChar")) {
            RUNTIME_MODULE.put(s, "../runtime/java");
        }
        for (String s : List.of("DataInputStream", "DataOutputStream", "ByteArrayInputStream", "ByteArrayOutputStream",
                "InputStream", "OutputStream", "IOFailure", "Sys")) {
            RUNTIME_MODULE.put(s, "../runtime/io");
        }
        for (String s : List.of("Graphics", "Image", "Font", "Canvas", "Display", "Displayable", "MIDlet",
                "RecordStore", "Manager", "Player", "PlayerListener", "VolumeControl", "Control")) {
            RUNTIME_MODULE.put(s, "../runtime/midp");
        }
    }

    final Trees trees;
    final boolean check;
    final Set<String> gameClasses;
    final Set<String> interfaces = new TreeSet<>();
    String midletClass;
    final Map<String, String> classForNameMap = new TreeMap<>();
    CompilationUnitTree unit;
    String cls;
    StringBuilder out;
    int indent;
    final Set<String> runtimeUsed = new TreeSet<>();
    final Set<String> gameUsed = new TreeSet<>();
    final IdentityHashMap<Tree, TreePath> paths = new IdentityHashMap<>();
    final Map<String, List<ExecutableElement>> ctorsByClass = new HashMap<>();
    int tmpCounter;
    int siteCounter;
    final List<String> warnings = new ArrayList<>();
    final List<String> sites = new ArrayList<>();

    J2TS(Trees trees, Set<String> gameClasses, boolean check) {
        this.trees = trees;
        this.gameClasses = gameClasses;
        this.check = check;
    }

    public static void main(String[] args) throws Exception {
        String classpath = args[0];
        Path src = Path.of(args[1]);
        Path outDir = Path.of(args[2]);
        boolean check = Arrays.asList(args).contains("--check");
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector<JavaFileObject> diags = new DiagnosticCollector<>();
        StandardJavaFileManager fm = compiler.getStandardFileManager(diags, Locale.ENGLISH, StandardCharsets.UTF_8);
        List<File> files = new ArrayList<>();
        try (var s = Files.list(src)) {
            s.filter(p -> p.toString().endsWith(".java")).sorted().forEach(p -> files.add(p.toFile()));
        }
        JavacTask task = (JavacTask) compiler.getTask(null, fm, diags,
                List.of("-proc:none", "-cp", classpath, "-d", Files.createTempDirectory("j2ts").toString()),
                null, fm.getJavaFileObjectsFromFiles(files));
        List<CompilationUnitTree> units = new ArrayList<>();
        task.parse().forEach(units::add);
        task.analyze();
        for (Diagnostic<? extends JavaFileObject> d : diags.getDiagnostics()) {
            if (d.getKind() == Diagnostic.Kind.ERROR) {
                throw new IllegalStateException("source does not compile: " + d);
            }
        }
        Set<String> game = new TreeSet<>();
        for (CompilationUnitTree u : units) {
            for (Tree t : u.getTypeDecls()) {
                game.add(((ClassTree) t).getSimpleName().toString());
            }
        }
        J2TS tr = new J2TS(Trees.instance(task), game, check);
        Files.createDirectories(outDir);
        for (CompilationUnitTree u : units) {
            for (Tree t : u.getTypeDecls()) {
                if (t.getKind() == Tree.Kind.INTERFACE) {
                    tr.interfaces.add(((ClassTree) t).getSimpleName().toString());
                }
                Tree ext = ((ClassTree) t).getExtendsClause();
                if (ext != null && ext.toString().endsWith("MIDlet")) {
                    tr.midletClass = ((ClassTree) t).getSimpleName().toString();
                }
            }
        }
        for (CompilationUnitTree u : units) {
            tr.emitUnit(u, outDir);
        }
        tr.emitIndex(outDir);
        if (check) {
            Files.writeString(outDir.resolve("check-sites.txt"), String.join("\n", tr.sites) + "\n");
        }
        for (String w : tr.warnings) {
            System.err.println("warning: " + w);
        }
        System.out.println("transpiled " + units.size() + " units, " + tr.warnings.size() + " warnings");
    }

    // ---------------------------------------------------------------- output helpers

    void line(String s) {
        out.append("  ".repeat(indent)).append(s).append('\n');
    }

    String loc(Tree t) {
        long p = trees.getSourcePositions().getStartPosition(unit, t);
        return cls + ":" + unit.getLineMap().getLineNumber(p);
    }

    void warn(Tree t, String msg) {
        warnings.add(loc(t) + " " + msg);
    }

    String rt(String name) {
        if (!RUNTIME_MODULE.containsKey(name)) {
            throw new IllegalStateException("unknown runtime symbol " + name);
        }
        runtimeUsed.add(name);
        return name;
    }

    String gameRef(String name) {
        if (!name.equals(cls)) {
            gameUsed.add(name);
        }
        return name;
    }

    // ---------------------------------------------------------------- types

    TypeMirror type(Tree t) {
        TreePath p = paths.get(t);
        if (p == null) {
            throw new IllegalStateException("no path for " + t.getKind() + " at " + loc(t));
        }
        return trees.getTypeMirror(p);
    }

    Element element(Tree t) {
        TreePath p = paths.get(t);
        return p == null ? null : trees.getElement(p);
    }

    static K kind(TypeMirror t) {
        if (t == null) {
            return K.REF;
        }
        switch (t.getKind()) {
            case INT: return K.INT;
            case SHORT: return K.SHORT;
            case BYTE: return K.BYTE;
            case CHAR: return K.CHAR;
            case LONG: return K.LONG;
            case BOOLEAN: return K.BOOLEAN;
            case DOUBLE: return K.DOUBLE;
            case FLOAT: return K.FLOAT;
            case ARRAY: return K.ARRAY;
            case NULL: return K.NULL;
            case VOID: return K.VOID;
            case DECLARED:
                String n = ((DeclaredType) t).asElement().toString();
                if (n.equals("java.lang.String")) {
                    return K.STRING;
                }
                if (n.equals("java.lang.Integer")) {
                    return K.INT;
                }
                return K.REF;
            default:
                return K.REF;
        }
    }

    K kindOf(Tree t) {
        return kind(type(t));
    }

    static boolean isIntLike(K k) {
        return k == K.INT || k == K.SHORT || k == K.BYTE || k == K.CHAR;
    }

    static boolean isNumeric(K k) {
        return isIntLike(k) || k == K.LONG || k == K.DOUBLE || k == K.FLOAT;
    }

    String ts(TypeMirror t) {
        switch (t.getKind()) {
            case INT: case SHORT: case BYTE: case CHAR: case DOUBLE: case FLOAT:
                return "number";
            case LONG:
                return "bigint";
            case BOOLEAN:
                return "boolean";
            case VOID:
                return "void";
            case ARRAY: {
                TypeMirror c = ((ArrayType) t).getComponentType();
                switch (c.getKind()) {
                    case INT: return "Int32Array";
                    case SHORT: return "Int16Array";
                    case BYTE: return "Int8Array";
                    case CHAR: return "Uint16Array";
                    case LONG: return "BigInt64Array";
                    case DOUBLE: return "Float64Array";
                    case FLOAT: return "Float32Array";
                    case BOOLEAN: return "boolean[]";
                    default: return ts(c) + "[]";
                }
            }
            case DECLARED: {
                String q = ((DeclaredType) t).asElement().toString();
                String simple = ((DeclaredType) t).asElement().getSimpleName().toString();
                switch (q) {
                    case "java.lang.String": return "string";
                    case "java.lang.Object": return "any";
                    case "java.lang.Integer": return "number";
                    case "java.lang.Throwable":
                    case "java.lang.Exception":
                    case "java.lang.RuntimeException": return "any";
                    case "java.lang.Thread": return rt("JavaThread");
                    case "java.lang.Runnable": return rt("Runnable");
                    default:
                        if (gameClasses.contains(simple)) {
                            return gameRef(simple);
                        }
                        return rt(simple);
                }
            }
            default:
                return "any";
        }
    }

    String defaultValue(TypeMirror t) {
        switch (kind(t)) {
            case INT: case SHORT: case BYTE: case CHAR: case DOUBLE: case FLOAT: return "0";
            case LONG: return "0n";
            case BOOLEAN: return "false";
            default: return "null";
        }
    }

    // ---------------------------------------------------------------- units and classes

    void emitUnit(CompilationUnitTree u, Path outDir) throws Exception {
        unit = u;
        paths.clear();
        new TreePathScanner<Void, Void>() {
            @Override
            public Void scan(Tree tree, Void v) {
                if (tree != null) {
                    paths.put(tree, new TreePath(getCurrentPath(), tree));
                }
                return super.scan(tree, v);
            }
        }.scan(new TreePath(u), null);
        for (Tree t : u.getTypeDecls()) {
            ClassTree c = (ClassTree) t;
            cls = c.getSimpleName().toString();
            out = new StringBuilder();
            runtimeUsed.clear();
            gameUsed.clear();
            indent = 0;
            emitClass(c);
            StringBuilder file = new StringBuilder();
            file.append("// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.\n");
            Map<String, List<String>> byModule = new TreeMap<>();
            for (String r : runtimeUsed) {
                byModule.computeIfAbsent(RUNTIME_MODULE.get(r), k -> new ArrayList<>()).add(r);
            }
            for (var e : byModule.entrySet()) {
                file.append("import { ").append(String.join(", ", e.getValue())).append(" } from \"").append(e.getKey()).append("\";\n");
            }
            for (String g : gameUsed) {
                file.append("import { ").append(g).append(" } from \"./").append(g).append("\";\n");
            }
            file.append('\n').append(out);
            Files.writeString(outDir.resolve(cls + ".ts"), file.toString());
        }
    }

    void emitIndex(Path outDir) throws Exception {
        StringBuilder sb = new StringBuilder("// Generated: class registry for Class.forName.\n");
        List<String> concrete = gameClasses.stream().filter(g -> !interfaces.contains(g)).toList();
        for (String g : concrete) {
            sb.append("import { ").append(g).append(" } from \"./").append(g).append("\";\n");
        }
        sb.append("\nexport const classes: Record<string, any> = {\n");
        for (String g : concrete) {
            sb.append("  ").append(g).append(",\n");
        }
        sb.append("};\n");
        if (midletClass != null) {
            sb.append("\nexport { ").append(midletClass).append(" as MainMidlet };\n");
        }
        Files.writeString(outDir.resolve("index.ts"), sb.toString());
    }

    boolean isStatic(Tree member) {
        if (member instanceof MethodTree m) {
            return m.getModifiers().getFlags().contains(Modifier.STATIC);
        }
        if (member instanceof VariableTree v) {
            return v.getModifiers().getFlags().contains(Modifier.STATIC);
        }
        if (member instanceof BlockTree b) {
            return b.isStatic();
        }
        return false;
    }

    List<MethodTree> constructors(ClassTree c) {
        List<MethodTree> list = new ArrayList<>();
        for (Tree m : c.getMembers()) {
            if (m instanceof MethodTree mt && mt.getName().contentEquals("<init>")) {
                // javac synthesizes a default constructor; keep only source ones
                long p = trees.getSourcePositions().getStartPosition(unit, mt);
                if (p >= 0 && mt.getBody() != null && !isSyntheticDefault(mt)) {
                    list.add(mt);
                }
            }
        }
        return list;
    }

    boolean isSyntheticDefault(MethodTree mt) {
        Element e = trees.getElement(paths.get(mt));
        return e != null && trees.getSourcePositions().getEndPosition(unit, mt) < 0;
    }

    void emitClass(ClassTree c) {
        boolean iface = c.getKind() == Tree.Kind.INTERFACE;
        StringBuilder header = new StringBuilder("export ");
        header.append(iface ? "interface " : "class ").append(cls);
        if (c.getExtendsClause() != null) {
            header.append(" extends ").append(ts(type(c.getExtendsClause())));
        }
        if (!c.getImplementsClause().isEmpty()) {
            List<String> is = new ArrayList<>();
            for (Tree i : c.getImplementsClause()) {
                is.add(ts(type(i)));
            }
            header.append(iface ? " extends " : " implements ").append(String.join(", ", is));
        }
        line(header + " {");
        indent++;
        if (iface) {
            for (Tree m : c.getMembers()) {
                if (m instanceof MethodTree mt) {
                    line(mt.getName() + "(" + params(mt) + "): " + ts(type(mt.getReturnType())) + ";");
                }
            }
            indent--;
            line("}");
            return;
        }
        List<MethodTree> ctors = constructors(c);
        boolean multi = ctors.size() > 1;
        // Fields first (static then instance), preserving source order within each group.
        for (Tree m : c.getMembers()) {
            if (m instanceof VariableTree v) {
                emitField(v);
            } else if (m instanceof BlockTree b && b.isStatic()) {
                line("static {");
                indent++;
                for (StatementTree s : b.getStatements()) {
                    stmt(s);
                }
                indent--;
                line("}");
            }
        }
        if (multi) {
            Element ce = trees.getElement(paths.get(c));
            List<ExecutableElement> list = new ArrayList<>();
            for (MethodTree mt : ctors) {
                list.add((ExecutableElement) trees.getElement(paths.get(mt)));
            }
            ctorsByClass.put(cls, list);
            for (int i = 0; i < ctors.size(); i++) {
                emitCtor(ctors.get(i), "$init" + i, c);
            }
        } else if (ctors.size() == 1) {
            emitCtor(ctors.get(0), null, c);
        }
        for (Tree m : c.getMembers()) {
            if (m instanceof MethodTree mt && !mt.getName().contentEquals("<init>")) {
                emitMethod(mt);
            }
        }
        indent--;
        line("}");
    }

    String modifiers(ModifiersTree mods) {
        StringBuilder sb = new StringBuilder();
        Set<Modifier> f = mods.getFlags();
        if (f.contains(Modifier.PRIVATE)) {
            sb.append("private ");
        }
        if (f.contains(Modifier.STATIC)) {
            sb.append("static ");
        }
        return sb.toString();
    }

    void emitField(VariableTree v) {
        TypeMirror t = type(v);
        String init = v.getInitializer() != null ? exprAs(v.getInitializer(), t) : defaultValue(t);
        line(modifiers(v.getModifiers()) + v.getName() + ": " + ts(t) + " = " + init + ";");
    }

    String params(MethodTree m) {
        List<String> ps = new ArrayList<>();
        for (VariableTree p : m.getParameters()) {
            ps.add(p.getName() + ": " + ts(type(p)));
        }
        return String.join(", ", ps);
    }

    void emitCtor(MethodTree m, String initName, ClassTree c) {
        List<? extends StatementTree> body = m.getBody().getStatements();
        if (initName == null) {
            line("constructor(" + params(m) + ") {");
        } else {
            line(initName + "(" + params(m) + "): this {");
        }
        indent++;
        for (StatementTree s : body) {
            if (s instanceof ExpressionStatementTree es && es.getExpression() instanceof MethodInvocationTree mi
                    && mi.getMethodSelect() instanceof IdentifierTree id) {
                String n = id.getName().toString();
                if (n.equals("super")) {
                    if (initName == null && c.getExtendsClause() != null) {
                        line("super(" + args(mi) + ");");
                    }
                    continue;
                }
                if (n.equals("this")) {
                    line("this." + initFor(mi) + "(" + args(mi) + ");");
                    continue;
                }
            }
            stmt(s);
        }
        if (initName != null) {
            line("return this;");
        }
        indent--;
        line("}");
    }

    String initFor(MethodInvocationTree mi) {
        ExecutableElement target = (ExecutableElement) element(mi);
        List<ExecutableElement> list = ctorsByClass.get(target.getEnclosingElement().getSimpleName().toString());
        int idx = list == null ? -1 : list.indexOf(target);
        if (idx < 0) {
            // constructors of a class not yet emitted: resolve by declaration order
            idx = ctorIndex(target);
        }
        return "$init" + idx;
    }

    int ctorIndex(ExecutableElement target) {
        int i = 0;
        for (Element e : target.getEnclosingElement().getEnclosedElements()) {
            if (e.getKind() == ElementKind.CONSTRUCTOR) {
                if (e.equals(target)) {
                    return i;
                }
                i++;
            }
        }
        throw new IllegalStateException("constructor not found " + target);
    }

    int ctorCount(TypeElement te) {
        int n = 0;
        for (Element e : te.getEnclosedElements()) {
            if (e.getKind() == ElementKind.CONSTRUCTOR) {
                n++;
            }
        }
        return n;
    }

    void emitMethod(MethodTree m) {
        String ret = ts(type(m.getReturnType()));
        line(modifiers(m.getModifiers()) + m.getName() + "(" + params(m) + "): " + ret + " {");
        indent++;
        tmpCounter = 0;
        for (StatementTree s : m.getBody().getStatements()) {
            stmt(s);
        }
        indent--;
        line("}");
    }

    // ---------------------------------------------------------------- statements

    void block(StatementTree s) {
        if (s instanceof BlockTree b) {
            for (StatementTree x : b.getStatements()) {
                stmt(x);
            }
        } else {
            stmt(s);
        }
    }

    void stmt(StatementTree s) {
        switch (s.getKind()) {
            case BLOCK -> {
                line("{");
                indent++;
                block(s);
                indent--;
                line("}");
            }
            case VARIABLE -> {
                VariableTree v = (VariableTree) s;
                TypeMirror t = type(v);
                String init = v.getInitializer() != null ? exprAs(v.getInitializer(), t) : defaultValue(t);
                line("let " + v.getName() + ": " + ts(t) + " = " + init + ";");
            }
            case EXPRESSION_STATEMENT -> line(exprStatement(((ExpressionStatementTree) s).getExpression()) + ";");
            case IF -> emitIf((IfTree) s, false);
            case WHILE_LOOP -> {
                WhileLoopTree w = (WhileLoopTree) s;
                line("while (" + cond(w.getCondition()) + ") {");
                indent++;
                block(w.getStatement());
                indent--;
                line("}");
            }
            case DO_WHILE_LOOP -> {
                DoWhileLoopTree d = (DoWhileLoopTree) s;
                line("do {");
                indent++;
                block(d.getStatement());
                indent--;
                line("} while (" + cond(d.getCondition()) + ");");
            }
            case FOR_LOOP -> {
                ForLoopTree f = (ForLoopTree) s;
                List<String> init = new ArrayList<>();
                boolean decl = false;
                String declType = null;
                for (StatementTree i : f.getInitializer()) {
                    if (i instanceof VariableTree v) {
                        decl = true;
                        TypeMirror t = type(v);
                        init.add(v.getName() + ": " + ts(t) + " = " + (v.getInitializer() != null ? exprAs(v.getInitializer(), t) : defaultValue(t)));
                    } else {
                        init.add(exprStatement(((ExpressionStatementTree) i).getExpression()));
                    }
                }
                List<String> upd = new ArrayList<>();
                for (ExpressionStatementTree u : f.getUpdate()) {
                    upd.add(exprStatement(u.getExpression()));
                }
                String c = f.getCondition() == null ? "" : cond(f.getCondition());
                line("for (" + (decl ? "let " : "") + String.join(", ", init) + "; " + c + "; " + String.join(", ", upd) + ") {");
                indent++;
                block(f.getStatement());
                indent--;
                line("}");
            }
            case SWITCH -> {
                SwitchTree sw = (SwitchTree) s;
                K k = kindOf(sw.getExpression());
                String selector = stripParens(expr(sw.getExpression()));
                Element selEl = element(sw.getExpression() instanceof ParenthesizedTree pt ? pt.getExpression() : sw.getExpression());
                if (selEl != null && selEl.getKind() == ElementKind.FIELD && isNumeric(k)) {
                    selector = selector + " as number";
                }
                line("switch (" + selector + ") {");
                indent++;
                for (CaseTree c : sw.getCases()) {
                    if (c.getExpressions().isEmpty()) {
                        line("default:");
                    } else {
                        for (ExpressionTree e : c.getExpressions()) {
                            line("case " + expr(e) + ":");
                        }
                    }
                    indent++;
                    if (c.getStatements() != null) {
                        for (StatementTree x : c.getStatements()) {
                            stmt(x);
                        }
                    }
                    indent--;
                }
                indent--;
                line("}");
            }
            case LABELED_STATEMENT -> {
                LabeledStatementTree l = (LabeledStatementTree) s;
                StatementTree inner = l.getStatement();
                if (inner instanceof BlockTree) {
                    line(l.getLabel() + ": {");
                    indent++;
                    block(inner);
                    indent--;
                    line("}");
                } else {
                    // Emit the labeled loop/switch on the same logical line.
                    int mark = out.length();
                    stmt(inner);
                    String emitted = out.substring(mark);
                    out.setLength(mark);
                    String pad = "  ".repeat(indent);
                    out.append(pad).append(l.getLabel()).append(": ").append(emitted.substring(pad.length()));
                }
            }
            case BREAK -> {
                BreakTree b = (BreakTree) s;
                line(b.getLabel() == null ? "break;" : "break " + b.getLabel() + ";");
            }
            case CONTINUE -> {
                ContinueTree c = (ContinueTree) s;
                line(c.getLabel() == null ? "continue;" : "continue " + c.getLabel() + ";");
            }
            case RETURN -> {
                ReturnTree r = (ReturnTree) s;
                if (r.getExpression() == null) {
                    line("return;");
                } else {
                    TreePath p = paths.get(s);
                    TypeMirror ret = methodReturnType(p);
                    line("return " + exprAs(r.getExpression(), ret) + ";");
                }
            }
            case THROW -> line("throw " + expr(((ThrowTree) s).getExpression()) + ";");
            case TRY -> emitTry((TryTree) s);
            case EMPTY_STATEMENT -> line(";");
            case SYNCHRONIZED -> block(((SynchronizedTree) s).getBlock());
            default -> throw new IllegalStateException("unsupported statement " + s.getKind() + " at " + loc(s));
        }
    }

    TypeMirror methodReturnType(TreePath p) {
        while (p != null && !(p.getLeaf() instanceof MethodTree)) {
            p = p.getParentPath();
        }
        MethodTree m = (MethodTree) p.getLeaf();
        return type(m.getReturnType());
    }

    void emitIf(IfTree i, boolean elseIf) {
        String head = "if (" + cond(i.getCondition()) + ") {";
        if (elseIf) {
            // caller already wrote "} else "
            out.append(head).append('\n');
        } else {
            line(head);
        }
        indent++;
        block(i.getThenStatement());
        indent--;
        StatementTree e = i.getElseStatement();
        if (e == null) {
            line("}");
        } else if (e instanceof IfTree ei) {
            out.append("  ".repeat(indent)).append("} else ");
            emitIf(ei, true);
        } else {
            line("} else {");
            indent++;
            block(e);
            indent--;
            line("}");
        }
    }

    void emitTry(TryTree t) {
        line("try {");
        indent++;
        block(t.getBlock());
        indent--;
        List<? extends CatchTree> catches = t.getCatches();
        if (!catches.isEmpty()) {
            boolean catchAll = false;
            String var = catches.get(0).getParameter().getName().toString();
            if (catches.size() == 1 && isCatchAll(catches.get(0))) {
                line("} catch (" + var + ") {");
                indent++;
                block(catches.get(0).getBlock());
                indent--;
            } else {
                String ev = "$e" + (tmpCounter++);
                line("} catch (" + ev + ") {");
                indent++;
                boolean first = true;
                for (CatchTree c : catches) {
                    String n = c.getParameter().getName().toString();
                    if (isCatchAll(c)) {
                        line((first ? "" : "} else ") + "{");
                        catchAll = true;
                    } else {
                        String type = ts(type(c.getParameter().getType()));
                        line((first ? "if" : "} else if") + " (" + ev + " instanceof " + type + ") {");
                    }
                    indent++;
                    line("const " + n + " = " + ev + ";");
                    block(c.getBlock());
                    indent--;
                    first = false;
                    if (catchAll) {
                        break;
                    }
                }
                if (!catchAll) {
                    line("} else {");
                    indent++;
                    line("throw " + ev + ";");
                    indent--;
                }
                line("}");
                indent--;
            }
        }
        if (t.getFinallyBlock() != null) {
            line("} finally {");
            indent++;
            block(t.getFinallyBlock());
            indent--;
        }
        line("}");
    }

    boolean isCatchAll(CatchTree c) {
        String q = type(c.getParameter().getType()).toString();
        return q.equals("java.lang.Throwable") || q.equals("java.lang.Exception") || q.equals("java.lang.RuntimeException");
    }

    // ---------------------------------------------------------------- expressions

    String cond(ExpressionTree e) {
        String s = expr(e);
        return stripParens(s);
    }

    static String stripParens(String s) {
        if (s.startsWith("(") && s.endsWith(")")) {
            int depth = 0;
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                if (c == '(') {
                    depth++;
                } else if (c == ')') {
                    depth--;
                    if (depth == 0 && i < s.length() - 1) {
                        return s;
                    }
                }
            }
            return s.substring(1, s.length() - 1);
        }
        return s;
    }

    /** Expression converted to the target type (numeric widening to long, etc.). */
    String exprAs(ExpressionTree e, TypeMirror target) {
        K from = kindOf(e);
        K to = kind(target);
        if (e instanceof NewArrayTree na && na.getType() == null) {
            return arrayLiteral(na, target);
        }
        String s = expr(e);
        if (to == K.LONG && isIntLike(from)) {
            if (e instanceof LiteralTree) {
                return s + "n";
            }
            return "BigInt(" + s + ")";
        }
        return s;
    }

    String exprStatement(ExpressionTree e) {
        // Increments/compound assignments in statement position can use simpler forms.
        if (e instanceof UnaryTree u && (u.getKind() == Tree.Kind.POSTFIX_INCREMENT || u.getKind() == Tree.Kind.POSTFIX_DECREMENT
                || u.getKind() == Tree.Kind.PREFIX_INCREMENT || u.getKind() == Tree.Kind.PREFIX_DECREMENT)) {
            return incDec(u, true);
        }
        return stripParens(expr(e));
    }

    String expr(ExpressionTree e) {
        switch (e.getKind()) {
            case INT_LITERAL: {
                int v = (Integer) ((LiteralTree) e).getValue();
                return v < 0 ? "(" + v + ")" : Integer.toString(v);
            }
            case LONG_LITERAL: {
                long v = (Long) ((LiteralTree) e).getValue();
                return v < 0 ? "(" + v + "n)" : v + "n";
            }
            case FLOAT_LITERAL:
            case DOUBLE_LITERAL: {
                double v = ((Number) ((LiteralTree) e).getValue()).doubleValue();
                String s = Double.toString(v);
                return v < 0 ? "(" + s + ")" : s;
            }
            case CHAR_LITERAL: {
                char c = (Character) ((LiteralTree) e).getValue();
                return Integer.toString(c);
            }
            case BOOLEAN_LITERAL:
                return ((LiteralTree) e).getValue().toString();
            case STRING_LITERAL:
                return jsString((String) ((LiteralTree) e).getValue());
            case NULL_LITERAL:
                return "null";
            case PARENTHESIZED:
                return "(" + stripParens(expr(((ParenthesizedTree) e).getExpression())) + ")";
            case IDENTIFIER:
                return identifier((IdentifierTree) e);
            case MEMBER_SELECT:
                return memberSelect((MemberSelectTree) e);
            case ARRAY_ACCESS: {
                ArrayAccessTree a = (ArrayAccessTree) e;
                String arr = expr(a.getExpression());
                String idx = stripParens(expr(a.getIndex()));
                if (check && !isLValue(e)) {
                    return rt("ca") + "(" + arr + ", " + idx + ", " + site(e) + ")";
                }
                return arr + "[" + idx + "]";
            }
            case METHOD_INVOCATION:
                return invocation((MethodInvocationTree) e);
            case NEW_CLASS:
                return newClass((NewClassTree) e);
            case NEW_ARRAY:
                return newArray((NewArrayTree) e, type(e));
            case TYPE_CAST:
                return cast((TypeCastTree) e);
            case INSTANCE_OF: {
                InstanceOfTree i = (InstanceOfTree) e;
                TypeMirror t = type(i.getType());
                if (kind(t) == K.STRING) {
                    return "(typeof " + expr(i.getExpression()) + " === \"string\")";
                }
                return expr(i.getExpression()) + " instanceof " + ts(t);
            }
            case CONDITIONAL_EXPRESSION: {
                ConditionalExpressionTree c = (ConditionalExpressionTree) e;
                TypeMirror t = type(e);
                return cond(c.getCondition()) + " ? " + exprAs(c.getTrueExpression(), t) + " : " + exprAs(c.getFalseExpression(), t);
            }
            case ASSIGNMENT:
                return assignment((AssignmentTree) e);
            case LOGICAL_COMPLEMENT:
                return "!" + expr(((UnaryTree) e).getExpression());
            case UNARY_MINUS: {
                UnaryTree u = (UnaryTree) e;
                K k = kindOf(e);
                String inner = expr(u.getExpression());
                if (k == K.LONG) {
                    return "BigInt.asIntN(64, -" + inner + ")";
                }
                return "-" + inner;
            }
            case UNARY_PLUS:
                return expr(((UnaryTree) e).getExpression());
            case BITWISE_COMPLEMENT: {
                UnaryTree u = (UnaryTree) e;
                return "~" + expr(u.getExpression());
            }
            case POSTFIX_INCREMENT:
            case POSTFIX_DECREMENT:
            case PREFIX_INCREMENT:
            case PREFIX_DECREMENT:
                return incDec((UnaryTree) e, false);
            default:
                if (e instanceof BinaryTree b) {
                    return binary(b);
                }
                if (e instanceof CompoundAssignmentTree ca) {
                    return compound(ca);
                }
                throw new IllegalStateException("unsupported expression " + e.getKind() + " at " + loc(e));
        }
    }

    boolean isLValue(ExpressionTree e) {
        TreePath p = paths.get(e).getParentPath();
        while (p != null && p.getLeaf() instanceof ParenthesizedTree) {
            p = p.getParentPath();
        }
        Tree parent = p == null ? null : p.getLeaf();
        if (parent instanceof AssignmentTree a) {
            return unparen(a.getVariable()) == e;
        }
        if (parent instanceof CompoundAssignmentTree c) {
            return unparen(c.getVariable()) == e;
        }
        if (parent instanceof UnaryTree u) {
            switch (u.getKind()) {
                case POSTFIX_INCREMENT, POSTFIX_DECREMENT, PREFIX_INCREMENT, PREFIX_DECREMENT -> {
                    return true;
                }
                default -> {
                    return false;
                }
            }
        }
        return false;
    }

    static ExpressionTree unparen(ExpressionTree e) {
        while (e instanceof ParenthesizedTree pt) {
            e = pt.getExpression();
        }
        return e;
    }

    String site(Tree t) {
        sites.add(loc(t));
        return Integer.toString(sites.size() - 1);
    }

    static String jsString(String s) {
        StringBuilder sb = new StringBuilder("\"");
        for (char c : s.toCharArray()) {
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < 0x20 || c > 0x7e) {
                        sb.append(String.format("\\u%04x", (int) c));
                    } else {
                        sb.append(c);
                    }
                }
            }
        }
        return sb.append('"').toString();
    }

    String identifier(IdentifierTree id) {
        Element el = element(id);
        String name = id.getName().toString();
        if (el == null || name.equals("this") || name.equals("super")) {
            return name;
        }
        switch (el.getKind()) {
            case FIELD: {
                String owner = el.getEnclosingElement().getSimpleName().toString();
                if (el.getModifiers().contains(Modifier.STATIC)) {
                    return (gameClasses.contains(owner) ? gameRef(owner) : rt(owner)) + "." + name;
                }
                return "this." + name;
            }
            case CLASS:
            case INTERFACE: {
                if (gameClasses.contains(name)) {
                    return gameRef(name);
                }
                return name;
            }
            default:
                return name;
        }
    }

    String memberSelect(MemberSelectTree m) {
        Element el = element(m);
        String name = m.getIdentifier().toString();
        if (name.equals("length") && kindOf(m.getExpression()) == K.ARRAY) {
            return expr(m.getExpression()) + ".length";
        }
        if (el != null && (el.getKind() == ElementKind.CLASS || el.getKind() == ElementKind.INTERFACE)) {
            String simple = el.getSimpleName().toString();
            return gameClasses.contains(simple) ? gameRef(simple) : rt(simple);
        }
        if (el != null && el.getKind() == ElementKind.FIELD && el.getModifiers().contains(Modifier.STATIC)) {
            String owner = el.getEnclosingElement().getSimpleName().toString();
            if (el.getModifiers().contains(Modifier.FINAL) && ((VariableElement) el).getConstantValue() != null
                    && !gameClasses.contains(owner)) {
                Object v = ((VariableElement) el).getConstantValue();
                return v instanceof String s ? jsString(s) : v.toString();
            }
            return (gameClasses.contains(owner) ? gameRef(owner) : rt(owner)) + "." + name;
        }
        return expr(m.getExpression()) + "." + name;
    }

    String args(MethodInvocationTree mi) {
        ExecutableElement m = (ExecutableElement) element(mi);
        List<String> list = new ArrayList<>();
        List<? extends VariableElement> ps = m.getParameters();
        for (int i = 0; i < mi.getArguments().size(); i++) {
            ExpressionTree a = mi.getArguments().get(i);
            list.add(stripParens(i < ps.size() ? exprAs(a, ps.get(i).asType()) : expr(a)));
        }
        return String.join(", ", list);
    }

    String args(List<? extends ExpressionTree> as, ExecutableElement m) {
        List<String> list = new ArrayList<>();
        List<? extends VariableElement> ps = m.getParameters();
        for (int i = 0; i < as.size(); i++) {
            list.add(stripParens(i < ps.size() ? exprAs(as.get(i), ps.get(i).asType()) : expr(as.get(i))));
        }
        return String.join(", ", list);
    }

    /** Converts a value of the given expression to a JS string as Java's String conversion would. */
    String toStr(ExpressionTree e) {
        K k = kindOf(e);
        String s = expr(e);
        switch (k) {
            case STRING:
                return s;
            case CHAR:
                return rt("charStr") + "(" + stripParens(s) + ")";
            default:
                return rt("jstr") + "(" + stripParens(s) + ")";
        }
    }

    String invocation(MethodInvocationTree mi) {
        ExecutableElement m = (ExecutableElement) element(mi);
        String name = m.getSimpleName().toString();
        TypeElement owner = (TypeElement) m.getEnclosingElement();
        String q = owner.getQualifiedName().toString();
        String simpleOwner = owner.getSimpleName().toString();
        boolean isStatic = m.getModifiers().contains(Modifier.STATIC);
        ExpressionTree sel = mi.getMethodSelect();
        String recv;
        if (sel instanceof MemberSelectTree ms) {
            recv = isStatic ? null : expr(ms.getExpression());
        } else {
            recv = isStatic ? null : "this";
        }
        List<? extends ExpressionTree> as = mi.getArguments();

        if (gameClasses.contains(simpleOwner)) {
            String target = isStatic ? gameRef(simpleOwner) : recv;
            return target + "." + name + "(" + args(mi) + ")";
        }
        switch (q) {
            case "java.lang.String": {
                switch (name) {
                    case "length": return recv + ".length";
                    case "charAt": return recv + ".charCodeAt(" + stripParens(expr(as.get(0))) + ")";
                    case "equals": return "(" + recv + " === " + expr(as.get(0)) + ")";
                    case "indexOf": {
                        String needle = kindOf(as.get(0)) == K.STRING ? expr(as.get(0)) : rt("charStr") + "(" + stripParens(expr(as.get(0))) + ")";
                        return recv + ".indexOf(" + needle + (as.size() > 1 ? ", " + stripParens(expr(as.get(1))) : "") + ")";
                    }
                    case "substring": return recv + ".substring(" + args(mi) + ")";
                    case "toUpperCase": return recv + ".toUpperCase()";
                    case "trim": return recv + ".trim()";
                    case "toCharArray": return rt("toCharArray") + "(" + recv + ")";
                    case "replace": return rt("replaceChar") + "(" + recv + ", " + args(mi) + ")";
                    case "valueOf": return toStr(as.get(0));
                    default: break;
                }
                break;
            }
            case "java.lang.StringBuffer": {
                if (name.equals("append")) {
                    return recv + ".append(" + stripParens(toStr(as.get(0))) + ")";
                }
                if (name.equals("insert")) {
                    return recv + ".insert(" + stripParens(expr(as.get(0))) + ", " + stripParens(toStr(as.get(1))) + ")";
                }
                return recv + "." + name + "(" + args(mi) + ")";
            }
            case "java.lang.Math": {
                K k = as.isEmpty() ? K.INT : kindOf(as.get(0));
                if (k == K.LONG) {
                    warn(mi, "Math." + name + " on long");
                }
                return "Math." + name + "(" + args(mi) + ")";
            }
            case "java.lang.System": {
                switch (name) {
                    case "arraycopy": return rt("arraycopy") + "(" + args(mi) + ")";
                    case "gc": return "void 0";
                    default: break;
                }
                break;
            }
            case "java.lang.Integer": {
                switch (name) {
                    case "parseInt": return rt("parseInt32") + "(" + args(mi) + ")";
                    case "intValue": return recv;
                    case "valueOf": return stripParens(expr(as.get(0)));
                    default: break;
                }
                break;
            }
            case "java.lang.Class": {
                switch (name) {
                    case "forName": return rt("classForName") + "(" + args(mi) + ")";
                    case "newInstance": return recv + ".newInstance()";
                    default: break;
                }
                break;
            }
            case "java.lang.Thread": {
                switch (name) {
                    case "yield": return rt("threadYield") + "()";
                    default: return recv + "." + name + "(" + args(mi) + ")";
                }
            }
            case "java.lang.Throwable": {
                switch (name) {
                    case "getMessage": return rt("errorMessage") + "(" + recv + ")";
                    case "printStackTrace": return rt("printStackTrace") + "(" + recv + ")";
                    default: break;
                }
                break;
            }
            case "java.lang.Object": {
                if (name.equals("equals")) {
                    return "(" + recv + " === " + expr(as.get(0)) + ")";
                }
                break;
            }
            default:
                break;
        }
        if (q.startsWith("java.util.") || q.startsWith("jio.") || q.startsWith("javax.microedition.") || q.startsWith("java.io.")) {
            String target = isStatic ? rt(simpleOwner) : recv;
            return target + "." + name + "(" + args(mi) + ")";
        }
        throw new IllegalStateException("unmapped call " + q + "." + name + " at " + loc(mi));
    }

    String newClass(NewClassTree n) {
        TypeMirror t = type(n);
        TypeElement te = (TypeElement) ((DeclaredType) t).asElement();
        String q = te.getQualifiedName().toString();
        String simple = te.getSimpleName().toString();
        ExecutableElement ctor = (ExecutableElement) element(n);
        String a = args(n.getArguments(), ctor);
        if (gameClasses.contains(simple)) {
            gameRef(simple);
            if (ctorCount(te) > 1) {
                return "new " + simple + "().$init" + ctorIndex(ctor) + "(" + a + ")";
            }
            return "new " + simple + "(" + a + ")";
        }
        switch (q) {
            case "java.lang.Integer":
                return stripParens(expr(n.getArguments().get(0)));
            case "java.lang.String":
                return rt("bytesToString") + "(" + a + ")";
            case "java.lang.Object":
                return "{}";
            default:
                break;
        }
        return "new " + rt(simple) + "(" + a + ")";
    }

    String arrayLiteral(NewArrayTree na, TypeMirror arrayType) {
        TypeMirror comp = ((ArrayType) arrayType).getComponentType();
        List<String> items = new ArrayList<>();
        for (ExpressionTree i : na.getInitializers()) {
            if (i instanceof NewArrayTree inner && inner.getType() == null) {
                items.add(arrayLiteral(inner, comp));
            } else {
                items.add(stripParens(exprAs(i, comp)));
            }
        }
        String ctor = typedArrayCtor(comp);
        String joined = String.join(", ", items);
        if (ctor != null) {
            return ctor + ".of(" + joined + ")";
        }
        return "[" + joined + "]";
    }

    static String typedArrayCtor(TypeMirror comp) {
        switch (comp.getKind()) {
            case INT: return "Int32Array";
            case SHORT: return "Int16Array";
            case BYTE: return "Int8Array";
            case CHAR: return "Uint16Array";
            case LONG: return "BigInt64Array";
            case DOUBLE: return "Float64Array";
            case FLOAT: return "Float32Array";
            default: return null;
        }
    }

    String newArray(NewArrayTree na, TypeMirror arrayType) {
        if (na.getInitializers() != null) {
            return arrayLiteral(na, arrayType);
        }
        List<String> dims = new ArrayList<>();
        for (ExpressionTree d : na.getDimensions()) {
            dims.add(stripParens(expr(d)));
        }
        // Innermost allocated component type after the given dimensions.
        TypeMirror t = arrayType;
        for (int i = 0; i < dims.size() - 1; i++) {
            t = ((ArrayType) t).getComponentType();
        }
        TypeMirror leafComp = ((ArrayType) t).getComponentType();
        String leaf;
        String ctor = typedArrayCtor(leafComp);
        String lastDim = dims.get(dims.size() - 1);
        if (ctor != null) {
            leaf = "new " + ctor + "(" + lastDim + ")";
        } else if (leafComp.getKind() == TypeKind.BOOLEAN) {
            leaf = "new Array<boolean>(" + lastDim + ").fill(false)";
        } else {
            leaf = "new Array<" + ts(leafComp) + ">(" + lastDim + ").fill(null)";
        }
        if (dims.size() == 1) {
            return leaf;
        }
        // Nested: build from the inside out.
        String inner = leaf;
        for (int i = dims.size() - 2; i >= 0; i--) {
            inner = rt("newArray") + "(" + dims.get(i) + ", () => " + inner + ")";
        }
        return inner;
    }

    String cast(TypeCastTree c) {
        TypeMirror to = type(c.getType());
        K tk = kind(to);
        K fk = kindOf(c.getExpression());
        String s = stripParens(expr(c.getExpression()));
        if (tk == K.REF || tk == K.ARRAY || tk == K.STRING) {
            String target = ts(to);
            if (target.equals("any")) {
                return expr(c.getExpression());
            }
            return "(" + s + " as " + target + ")";
        }
        if (tk == fk) {
            return expr(c.getExpression());
        }
        switch (tk) {
            case INT:
                if (fk == K.LONG) return rt("l2i") + "(" + s + ")";
                if (fk == K.DOUBLE || fk == K.FLOAT) return rt("d2i") + "(" + s + ")";
                return expr(c.getExpression());
            case SHORT:
                if (fk == K.BYTE) return expr(c.getExpression());
                if (fk == K.LONG) s = rt("l2i") + "(" + s + ")";
                if (fk == K.DOUBLE || fk == K.FLOAT) s = rt("d2i") + "(" + s + ")";
                return "((" + s + ") << 16 >> 16)";
            case BYTE:
                if (fk == K.LONG) s = rt("l2i") + "(" + s + ")";
                if (fk == K.DOUBLE || fk == K.FLOAT) s = rt("d2i") + "(" + s + ")";
                return "((" + s + ") << 24 >> 24)";
            case CHAR:
                if (fk == K.LONG) s = rt("l2i") + "(" + s + ")";
                return "((" + s + ") & 65535)";
            case LONG:
                if (fk == K.DOUBLE || fk == K.FLOAT) {
                    warn(c, "double to long cast");
                    return "BigInt(Math.trunc(" + s + "))";
                }
                return "BigInt(" + s + ")";
            case DOUBLE:
                if (fk == K.LONG) return "Number(" + s + ")";
                return expr(c.getExpression());
            case FLOAT:
                if (fk == K.LONG) return "Math.fround(Number(" + s + "))";
                return "Math.fround(" + s + ")";
            case BOOLEAN:
                return expr(c.getExpression());
            default:
                throw new IllegalStateException("cast to " + tk + " at " + loc(c));
        }
    }

    static String opText(Tree.Kind k) {
        switch (k) {
            case PLUS: case PLUS_ASSIGNMENT: return "+";
            case MINUS: case MINUS_ASSIGNMENT: return "-";
            case MULTIPLY: case MULTIPLY_ASSIGNMENT: return "*";
            case DIVIDE: case DIVIDE_ASSIGNMENT: return "/";
            case REMAINDER: case REMAINDER_ASSIGNMENT: return "%";
            case LEFT_SHIFT: case LEFT_SHIFT_ASSIGNMENT: return "<<";
            case RIGHT_SHIFT: case RIGHT_SHIFT_ASSIGNMENT: return ">>";
            case UNSIGNED_RIGHT_SHIFT: case UNSIGNED_RIGHT_SHIFT_ASSIGNMENT: return ">>>";
            case AND: case AND_ASSIGNMENT: return "&";
            case OR: case OR_ASSIGNMENT: return "|";
            case XOR: case XOR_ASSIGNMENT: return "^";
            case LESS_THAN: return "<";
            case GREATER_THAN: return ">";
            case LESS_THAN_EQUAL: return "<=";
            case GREATER_THAN_EQUAL: return ">=";
            case EQUAL_TO: return "===";
            case NOT_EQUAL_TO: return "!==";
            case CONDITIONAL_AND: return "&&";
            case CONDITIONAL_OR: return "||";
            default: throw new IllegalStateException("op " + k);
        }
    }

    /** Applies a binary operator with Java semantics to already-emitted operands of the given kinds. */
    String arith(Tree.Kind op, String l, K lk, String r, K rk, K resultKind, Tree at) {
        String o = opText(op);
        if (resultKind == K.STRING) {
            return l + " + " + r;
        }
        if (resultKind == K.BOOLEAN) {
            switch (o) {
                case "&": return rt("band") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                case "|": return rt("bor") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                case "^": return rt("bxor") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                default: break;
            }
            // Relational on mixed long/int operands: promote the int side.
            if (lk == K.LONG && isIntLike(rk)) {
                r = "BigInt(" + stripParens(r) + ")";
            } else if (rk == K.LONG && isIntLike(lk)) {
                l = "BigInt(" + stripParens(l) + ")";
            }
            return l + " " + o + " " + r;
        }
        if (resultKind == K.LONG) {
            if (isIntLike(lk)) {
                l = "BigInt(" + stripParens(l) + ")";
            }
            switch (o) {
                case "<<": return rt("lshl") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                case ">>": return rt("lshr") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                case ">>>": return rt("lushr") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                default: break;
            }
            if (isIntLike(rk)) {
                r = "BigInt(" + stripParens(r) + ")";
            }
            switch (o) {
                case "+": case "-": case "*":
                    return "BigInt.asIntN(64, " + l + " " + o + " " + r + ")";
                case "/":
                    return rt("lidiv") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
                default:
                    return l + " " + o + " " + r;
            }
        }
        if (resultKind == K.DOUBLE || resultKind == K.FLOAT) {
            String res = l + " " + o + " " + r;
            return resultKind == K.FLOAT ? "Math.fround(" + res + ")" : res;
        }
        // int arithmetic (byte/short/char operands are promoted to int)
        switch (o) {
            case "*":
                return "Math.imul(" + stripParens(l) + ", " + stripParens(r) + ")";
            case "/":
                return rt("idiv") + "(" + stripParens(l) + ", " + stripParens(r) + ")";
            case ">>>":
                return "(" + l + " >>> " + r + " | 0)";
            case "+":
            case "-":
                if (check) {
                    return rt("ci") + "(" + l + " " + o + " " + r + ", " + site(at) + ")";
                }
                return l + " " + o + " " + r;
            default:
                return l + " " + o + " " + r;
        }
    }

    String binary(BinaryTree b) {
        K lk = kindOf(b.getLeftOperand());
        K rk = kindOf(b.getRightOperand());
        K res = kindOf(b);
        if (res == K.STRING) {
            return toStr(b.getLeftOperand()) + " + " + toStr(b.getRightOperand());
        }
        String l = expr(b.getLeftOperand());
        String r = expr(b.getRightOperand());
        if (res == K.BOOLEAN && (b.getKind() == Tree.Kind.EQUAL_TO || b.getKind() == Tree.Kind.NOT_EQUAL_TO)) {
            if (lk == K.LONG && isIntLike(rk)) {
                r = b.getRightOperand() instanceof LiteralTree ? r + "n" : "BigInt(" + stripParens(r) + ")";
            } else if (rk == K.LONG && isIntLike(lk)) {
                l = b.getLeftOperand() instanceof LiteralTree ? l + "n" : "BigInt(" + stripParens(l) + ")";
            }
            return l + " " + opText(b.getKind()) + " " + r;
        }
        if (res == K.LONG && isIntLike(rk) && b.getRightOperand() instanceof LiteralTree
                && b.getKind() != Tree.Kind.LEFT_SHIFT && b.getKind() != Tree.Kind.RIGHT_SHIFT && b.getKind() != Tree.Kind.UNSIGNED_RIGHT_SHIFT) {
            r = r + "n";
            rk = K.LONG;
        }
        if (res == K.BOOLEAN && b.getRightOperand() instanceof LiteralTree && lk == K.LONG && isIntLike(rk)) {
            r = r + "n";
            rk = K.LONG;
        }
        return arith(b.getKind(), l, lk, r, rk, res, b);
    }

    boolean hasSideEffects(ExpressionTree e) {
        boolean[] found = new boolean[1];
        new TreePathScanner<Void, Void>() {
            @Override
            public Void visitMethodInvocation(MethodInvocationTree node, Void unused) {
                found[0] = true;
                return null;
            }

            @Override
            public Void visitAssignment(AssignmentTree node, Void unused) {
                found[0] = true;
                return null;
            }

            @Override
            public Void visitCompoundAssignment(CompoundAssignmentTree node, Void unused) {
                found[0] = true;
                return null;
            }

            @Override
            public Void visitUnary(UnaryTree node, Void unused) {
                switch (node.getKind()) {
                    case POSTFIX_INCREMENT, POSTFIX_DECREMENT, PREFIX_INCREMENT, PREFIX_DECREMENT -> found[0] = true;
                    default -> super.visitUnary(node, unused);
                }
                return null;
            }

            @Override
            public Void visitNewClass(NewClassTree node, Void unused) {
                found[0] = true;
                return null;
            }
        }.scan(new TreePath(paths.get(e).getParentPath(), e), null);
        return found[0];
    }

    /** Narrowing applied when storing an int into a variable of the given kind (fields/locals, not typed arrays). */
    String narrow(String value, K target, ExpressionTree lhs) {
        boolean typedArraySlot = lhs instanceof ArrayAccessTree;
        if (typedArraySlot) {
            return value;
        }
        switch (target) {
            case BYTE: return "(" + stripParens(value) + ") << 24 >> 24";
            case SHORT: return "(" + stripParens(value) + ") << 16 >> 16";
            case CHAR: return "(" + stripParens(value) + ") & 65535";
            default: return value;
        }
    }

    String assignment(AssignmentTree a) {
        TypeMirror t = type(a.getVariable());
        return expr(a.getVariable()) + " = " + stripParens(exprAs(a.getExpression(), t));
    }

    String compound(CompoundAssignmentTree c) {
        ExpressionTree lhs = c.getVariable();
        K tk = kindOf(lhs);
        K rk = kindOf(c.getExpression());
        String target = expr(lhs);
        if (tk == K.STRING) {
            return target + " += " + stripParens(toStr(c.getExpression()));
        }
        String o = opText(c.getKind());
        boolean simpleInt = tk == K.INT && isIntLike(rk)
                && (o.equals("<<") || o.equals(">>") || o.equals("&") || o.equals("|") || o.equals("^")
                || (!check && (o.equals("+") || o.equals("-"))));
        if (simpleInt || (tk == K.DOUBLE && (rk == K.DOUBLE || isIntLike(rk)))) {
            return target + " " + o + "= " + stripParens(expr(c.getExpression()));
        }
        if (tk == K.BOOLEAN) {
            String r = stripParens(expr(c.getExpression()));
            return target + " = " + arith(c.getKind(), target, K.BOOLEAN, r, K.BOOLEAN, K.BOOLEAN, c);
        }
        if (hasSideEffects(lhs)) {
            warn(c, "compound assignment target with side effects: " + target);
        }
        K resKind = tk == K.LONG || rk == K.LONG && (o.equals("+") || o.equals("-") || o.equals("*") || o.equals("/")) ? K.LONG
                : (tk == K.DOUBLE || rk == K.DOUBLE ? K.DOUBLE : K.INT);
        if (tk == K.LONG) {
            resKind = K.LONG;
        }
        String r = expr(c.getExpression());
        String value = arith(c.getKind(), target, tk == K.LONG ? K.LONG : (isIntLike(tk) ? K.INT : tk), r, rk, resKind, c);
        if (isIntLike(tk) && resKind == K.LONG) {
            value = rt("l2i") + "(" + value + ")";
        } else if (isIntLike(tk) && resKind == K.DOUBLE) {
            value = rt("d2i") + "(" + value + ")";
        }
        return target + " = " + narrow(value, tk, lhs);
    }

    String incDec(UnaryTree u, boolean statement) {
        ExpressionTree v = u.getExpression();
        K k = kindOf(v);
        String target = expr(v);
        boolean inc = u.getKind() == Tree.Kind.POSTFIX_INCREMENT || u.getKind() == Tree.Kind.PREFIX_INCREMENT;
        boolean prefix = u.getKind() == Tree.Kind.PREFIX_INCREMENT || u.getKind() == Tree.Kind.PREFIX_DECREMENT;
        String op = inc ? "++" : "--";
        if (k == K.INT || k == K.DOUBLE || (v instanceof ArrayAccessTree && isIntLike(k))) {
            if (check && k == K.INT) {
                if (statement) {
                    return target + " = " + rt("ci") + "(" + target + (inc ? " + 1" : " - 1") + ", " + site(u) + ")";
                }
            }
            return prefix ? op + target : target + op;
        }
        if (k == K.LONG) {
            String nv = "BigInt.asIntN(64, " + target + (inc ? " + 1n" : " - 1n") + ")";
            if (statement || prefix) {
                return "(" + target + " = " + nv + ")";
            }
            warn(u, "postfix long increment in expression");
            return "(" + target + " = " + nv + ")" + (inc ? " - 1n" : " + 1n");
        }
        // byte/short/char locals or fields: wrap explicitly
        String nv = narrow(target + (inc ? " + 1" : " - 1"), k, v);
        if (statement || prefix) {
            return "(" + target + " = " + nv + ")";
        }
        warn(u, "postfix increment of narrow type in expression");
        return "((" + target + " = " + nv + ")" + (inc ? " - 1" : " + 1") + ")";
    }
}
