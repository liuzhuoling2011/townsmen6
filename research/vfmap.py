"""Build an original-name -> Vineflower-name map from `$VF: renamed from:` comments."""
import json
import re
import sys
from pathlib import Path

RENAMED = re.compile(r"//\s*\$VF: renamed from: (.+)$")
CLASS_DECL = re.compile(r"\b(?:class|interface)\s+(\w+)")
FIELD_DECL = re.compile(r"\b(\w+)\s*(?:=|;)")
METHOD_DECL = re.compile(r"\b(\w+)\s*\(")


def build(root):
    classes, members = {}, []
    for path in sorted(Path(root).rglob("*.java")):
        lines = path.read_text().splitlines()
        owner = None
        for idx, line in enumerate(lines):
            m = RENAMED.search(line)
            if not m:
                continue
            origin = m.group(1).strip()
            decl = next((l for l in lines[idx + 1:] if l.strip() and not l.strip().startswith("//")), "")
            if "class " in decl or "interface " in decl:
                new = CLASS_DECL.search(decl).group(1)
                pkg = "hg/" if "/hg/" in str(path) else ""
                classes[origin.replace(".", "/")] = pkg + new
                owner = origin.replace(".", "/")
                continue
            parts = origin.split(" ", 1)
            name, sig = parts[0], parts[1] if len(parts) > 1 else ""
            kind = "method" if sig.startswith("(") else "field"
            pattern = METHOD_DECL if kind == "method" else FIELD_DECL
            new = pattern.search(decl.split("//")[0])
            members.append({
                "owner": owner,
                "kind": kind,
                "name": name,
                "sig": sig,
                "new": new.group(1) if new else None,
            })
    return {"classes": classes, "members": members}


if __name__ == "__main__":
    data = build(sys.argv[1])
    out = Path(sys.argv[2])
    out.write_text(json.dumps(data, indent=1))
    print(f"classes={len(data['classes'])} members={len(data['members'])} -> {out}")
    if len(sys.argv) > 3:
        for query in sys.argv[3:]:
            owner, _, rest = query.partition(".")
            for m in data["members"]:
                if m["owner"] == owner and (m["name"] + " " + m["sig"]).startswith(rest):
                    print(f"{query:30} -> {data['classes'].get(owner)}.{m['new']}   [{m['name']} {m['sig']}]")
