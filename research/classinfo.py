"""Minimal JVM class-file reader: dumps external API references and method sizes."""
import struct
import sys
from collections import defaultdict
from pathlib import Path


def read_class(path):
    data = Path(path).read_bytes()
    pos = 0

    def u1():
        nonlocal pos
        v = data[pos]
        pos += 1
        return v

    def u2():
        nonlocal pos
        v = struct.unpack_from(">H", data, pos)[0]
        pos += 2
        return v

    def u4():
        nonlocal pos
        v = struct.unpack_from(">I", data, pos)[0]
        pos += 4
        return v

    magic = u4()
    assert magic == 0xCAFEBABE, path
    minor, major = u2(), u2()
    count = u2()
    cp = [None] * count
    i = 1
    while i < count:
        tag = u1()
        if tag == 1:
            n = u2()
            cp[i] = ("Utf8", data[pos:pos + n].decode("utf-8", "replace"))
            pos += n
        elif tag in (3, 4):
            cp[i] = ("Int" if tag == 3 else "Float", u4())
        elif tag in (5, 6):
            cp[i] = ("Long" if tag == 5 else "Double", (u4(), u4()))
            i += 1
        elif tag == 7:
            cp[i] = ("Class", u2())
        elif tag == 8:
            cp[i] = ("String", u2())
        elif tag in (9, 10, 11):
            cp[i] = ({9: "Field", 10: "Method", 11: "IMethod"}[tag], u2(), u2())
        elif tag == 12:
            cp[i] = ("NameType", u2(), u2())
        else:
            raise ValueError(f"tag {tag} at {i} in {path}")
        i += 1

    def utf(idx):
        return cp[idx][1]

    def cls(idx):
        return utf(cp[idx][1])

    access, this_c, super_c = u2(), u2(), u2()
    interfaces = [cls(u2()) for _ in range(u2())]

    def skip_attrs():
        nonlocal pos
        attrs = []
        for _ in range(u2()):
            name = utf(u2())
            length = u4()
            attrs.append((name, data[pos:pos + length]))
            pos += length
        return attrs

    fields = []
    for _ in range(u2()):
        acc, n, d = u2(), u2(), u2()
        skip_attrs()
        fields.append((utf(n), utf(d), acc))
    methods = []
    for _ in range(u2()):
        acc, n, d = u2(), u2(), u2()
        attrs = skip_attrs()
        code_len = 0
        for name, body in attrs:
            if name == "Code":
                code_len = struct.unpack_from(">I", body, 4)[0]
        methods.append((utf(n), utf(d), acc, code_len))

    refs = []
    for entry in cp:
        if entry and entry[0] in ("Field", "Method", "IMethod"):
            owner = cls(entry[1])
            nt = cp[entry[2]]
            refs.append((entry[0], owner, utf(nt[1]), utf(nt[2])))
    strings = [utf(e[1]) for e in cp if e and e[0] == "String"]
    return {
        "name": cls(this_c),
        "super": cls(super_c) if super_c else None,
        "interfaces": interfaces,
        "version": (major, minor),
        "fields": fields,
        "methods": methods,
        "refs": refs,
        "strings": strings,
    }


def main(root):
    classes = [read_class(p) for p in sorted(Path(root).rglob("*.class"))]
    local = {c["name"] for c in classes}
    api = defaultdict(set)
    total_code = 0
    print("== classes ==")
    for c in classes:
        code = sum(m[3] for m in c["methods"])
        total_code += code
        print(f"{c['name']:6} v{c['version'][0]} extends {c['super']:40} "
              f"impl {','.join(c['interfaces']) or '-':45} "
              f"fields={len(c['fields']):3} methods={len(c['methods']):3} code={code}")
        for kind, owner, name, desc in c["refs"]:
            if owner not in local:
                api[owner].add(f"{name}{desc}")
    print(f"total bytecode bytes: {total_code}")
    print("\n== external API ==")
    for owner in sorted(api):
        print(owner)
        for m in sorted(api[owner]):
            print("   ", m)
    if len(sys.argv) > 2:
        print("\n== strings ==")
        for c in classes:
            if c["strings"]:
                print(c["name"], [s for s in c["strings"]][:200])


if __name__ == "__main__":
    main(sys.argv[1])
