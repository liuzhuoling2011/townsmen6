"""Build a harness script from a compact step list.

Steps (whitespace separated), each advancing time:
  wN        wait N frames
  F U D L R fire / up / down / left / right (press 1 frame, release)
  SL SR     left / right soft key
  0-9 * #   keypad
  sNAME     screenshot named NAME (at current frame)
  hK:N      hold key K (e.g. hR:10) for N frames

usage: python3 mkscript.py "w41 F w60 F w240 sTitle" out.txt
"""
import sys

KEYS = {"F": -5, "U": -1, "D": -2, "L": -3, "R": -4, "SL": -6, "SR": -7, "*": 42, "#": 35}
for d in range(10):
    KEYS[str(d)] = 48 + d


def build(steps):
    frame = 0
    lines = []
    for tok in steps.split():
        if tok.startswith("w"):
            frame += int(tok[1:])
        elif tok.startswith("s") and tok not in KEYS:
            lines.append(f"{frame} shot {tok[1:]}")
        elif tok.startswith("h"):
            key, n = tok[1:].split(":")
            lines.append(f"{frame} key {KEYS[key]} down")
            frame += int(n)
            lines.append(f"{frame} key {KEYS[key]} up")
            frame += 1
        else:
            lines.append(f"{frame} key {KEYS[tok]} down")
            frame += 1
            lines.append(f"{frame} key {KEYS[tok]} up")
            frame += 4
    lines.append(f"{frame} shot end")
    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    open(sys.argv[2], "w").write(build(sys.argv[1]))
