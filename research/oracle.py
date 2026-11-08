"""Prepare the decompiled source, build the headless reference, and run it.

usage: python3 oracle.py build
       python3 oracle.py run <script> <outdir> [--drawlog] [--original] [--size WxH]

build/prepared is the single source of truth consumed by both the Java
reference build and the TypeScript transpiler.
"""
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
JDK = Path.home() / ".local/lib/jdk-21/bin"
BUILD = ROOT / "build"
RES = ROOT / "jar"

CLASS_NAMES = {'"t"': '"class_23"', '"m"': '"class_9"', '"c"': '"class_19"'}
IO_SHIMS = ("DataInputStream", "DataOutputStream")


def sh(*cmd):
    subprocess.run([str(c) for c in cmd], check=True)


def prepare(dst):
    shutil.copytree(ROOT / "java-src", dst)
    # Javac cannot reference default-package classes from package hg.
    hg = dst / "hg" / "class_22.java"
    (dst / "class_22.java").write_text(hg.read_text().replace("package hg;\n", ""))
    shutil.rmtree(dst / "hg")
    for path in dst.glob("*.java"):
        text = path.read_text().replace("import hg.class_22;\n", "")
        for name in IO_SHIMS:
            text = text.replace(f"import java.io.{name};", f"import jio.{name};")
        text = text.replace("catch (IOException ", "catch (jio.IOFailure ")
        text = text.replace("System.currentTimeMillis()", "jio.Sys.currentTimeMillis()")
        text = text.replace("Thread.sleep(", "jio.Sys.sleep(")
        text = text.replace("Runtime.getRuntime().getClass().getResourceAsStream(", "jio.Sys.resource(")
        # The loader thread never waits on the main loop, so it runs to completion synchronously.
        text = re.sub(r"(\(field_583 = new class_11\(var0, var1, var2\)\))\.start\(\)", r"\1.run()", text)
        for old, new in CLASS_NAMES.items():
            text = text.replace(f"Class.forName({old})", f"Class.forName({new})")
        path.write_text(text)


def build():
    shutil.rmtree(BUILD, ignore_errors=True)
    midp_out = BUILD / "midp"
    midp_out.mkdir(parents=True)
    sh(JDK / "javac", "-nowarn", "-d", midp_out, *sorted((ROOT / "midp/src").rglob("*.java")))
    prepared = BUILD / "prepared"
    prepare(prepared)
    sh(JDK / "java", "-Duser.language=en", "-Duser.country=US", ROOT / "tools/src/Fixer.java", midp_out, prepared)
    oracle_out = BUILD / "oracle"
    oracle_out.mkdir()
    sh(JDK / "javac", "-nowarn", "-encoding", "UTF-8", "-Xmaxerrs", "2000", "-cp", midp_out,
       "-d", oracle_out, *sorted(prepared.glob("*.java")))
    print("built", oracle_out)


def patched_original():
    """Original JAR with java/lang/Runtime renamed (same length) so resources resolve on the classpath."""
    import zipfile
    out = BUILD / "original-patched.jar"
    if out.exists():
        return out
    jar = ROOT.parent / "Townsmen6-Revolution_s40v2a.jar"
    swaps = [(b"java/lang/Runtime", b"harness/RuntimeXX")]
    with zipfile.ZipFile(jar) as src, zipfile.ZipFile(out, "w") as dst:
        for info in src.infolist():
            data = src.read(info)
            if info.filename.endswith(".class"):
                for old, new in swaps:
                    assert len(old) == len(new)
                    data = data.replace(old, new)
            dst.writestr(info, data)
    return out


def run(args):
    script, outdir = args[0], args[1]
    props = ["-Ddrawlog=true"] if "--drawlog" in args else []
    if "--pretty" in args:
        props.append("-Dpretty=true")
    size = []
    if "--size" in args:
        size = args[args.index("--size") + 1].split("x")
    jar = ROOT.parent / "Townsmen6-Revolution_s40v2a.jar"
    if "--original" in args:
        cp = f"{BUILD / 'midp'}:{patched_original()}"
        main = "hg.HG"
    else:
        cp = f"{BUILD / 'midp'}:{BUILD / 'oracle'}"
        main = "class_22"
    sh(JDK / "java", "-Djava.awt.headless=true", *props, "-cp", cp, "harness.Run", main, RES, script, outdir, *size)


if __name__ == "__main__":
    if sys.argv[1] == "build":
        build()
    else:
        run(sys.argv[2:])
