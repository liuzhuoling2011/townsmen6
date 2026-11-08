"""Regenerate web/src/game from the prepared decompiled source.

usage: python3 research/transpile.py [--check] [--no-names]

Vineflower's class_N / field_N / method_N identifiers are globally unique (and
overriding methods keep the overridden name), so the semantic names collected in
research/names/*.json are applied as whole-word replacements on the output.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
JDK = Path.home() / ".local/lib/jdk-21/bin"
OUT = ROOT.parent / "web/src/game"
TOKEN = re.compile(r"\b(?:class|field|method)_\d+\b")
RESERVED = {"name", "length", "prototype", "constructor", "caller", "arguments", "toString", "valueOf"}


def load_names():
    names = {}
    for path in sorted((ROOT / "names").glob("*.json")):
        data = json.loads(path.read_text())
        for old, new in data.get("names", data).items():
            if not TOKEN.fullmatch(old) or not isinstance(new, str):
                continue
            if not re.fullmatch(r"[A-Za-z_$][\w$]*", new) or new in RESERVED:
                raise SystemExit(f"{path.name}: invalid name {old} -> {new}")
            if old in names and names[old] != new:
                raise SystemExit(f"{path.name}: {old} named both {names[old]} and {new}")
            names[old] = new
    classes = [v for k, v in names.items() if k.startswith("class_")]
    dupes = {c for c in classes if classes.count(c) > 1}
    if dupes:
        raise SystemExit(f"duplicate class names: {dupes}")
    return names


def apply_names(names):
    for path in list(OUT.iterdir()):
        if path.suffix != ".ts":
            continue
        text = TOKEN.sub(lambda m: names.get(m.group(0), m.group(0)), path.read_text())
        target = OUT / (names.get(path.stem, path.stem) + ".ts")
        path.unlink()
        target.write_text(text)
    sites = OUT / "check-sites.txt"
    if sites.exists():
        sites.write_text(TOKEN.sub(lambda m: names.get(m.group(0), m.group(0)), sites.read_text()))


def main():
    subprocess.run([sys.executable, str(ROOT / "oracle.py"), "build"], check=True)
    if OUT.exists():
        shutil.rmtree(OUT)
    cmd = [str(JDK / "java"), "-Duser.language=en", str(ROOT / "tools/src/J2TS.java"),
           str(ROOT / "build/midp"), str(ROOT / "build/prepared"), str(OUT)]
    if "--check" in sys.argv:
        cmd.append("--check")
    subprocess.run(cmd, check=True)
    if "--no-names" not in sys.argv:
        names = load_names()
        apply_names(names)
        print(f"applied {len(names)} names")


if __name__ == "__main__":
    main()
