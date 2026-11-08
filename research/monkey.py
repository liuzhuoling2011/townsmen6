"""Seeded random key script after a fixed boot into the campaign.

usage: python3 monkey.py <seed> <frames> out.txt [--no-boot]
"""
import random
import sys

from mkscript import KEYS, build

BOOT = "w41 F w60 F w240 F w30"


def monkey(seed, frames, boot=True):
    rng = random.Random(seed)
    prefix = build(BOOT).splitlines()[:-1] if boot else []
    frame = int(prefix[-1].split()[0]) + 5 if prefix else 0
    lines = list(prefix)
    weights = {"F": 6, "U": 4, "D": 4, "L": 4, "R": 4, "SL": 2, "SR": 1, "5": 1, "2": 1, "8": 1, "4": 1, "6": 1, "*": 1, "#": 1, "0": 1}
    keys = list(weights)
    w = [weights[k] for k in keys]
    shot = 0
    while frame < frames:
        k = rng.choices(keys, w)[0]
        hold = rng.choice([1, 1, 1, 2, 4, 8, 15])
        lines.append(f"{frame} key {KEYS[k]} down")
        lines.append(f"{frame + hold} key {KEYS[k]} up")
        frame += hold + rng.randint(1, 12)
        if frame // 500 > shot:
            shot = frame // 500
            lines.append(f"{frame} shot m{shot:03d}")
    lines.append(f"{frame} shot end")
    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    open(sys.argv[3], "w").write(monkey(int(sys.argv[1]), int(sys.argv[2]), "--no-boot" not in sys.argv))
