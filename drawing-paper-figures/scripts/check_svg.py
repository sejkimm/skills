# /// script
# requires-python = ">=3.11"
# ///
"""Check SVG figures against the drawing-paper-figures rules. Exit 1 on any error."""

import re
import sys
import xml.etree.ElementTree as ET

NS = "{http://www.w3.org/2000/svg}"
COLOR_KEYS = ("fill", "stroke", "stop-color", "color")
NEUTRAL = {"none", "currentcolor", "transparent", "inherit", "black", "white", "gray", "grey"}
WHITE = {"#fff", "#ffffff", "white"}


def is_gray(value: str) -> bool:
    v = value.strip().lower()
    if v in NEUTRAL or v.startswith("url("):
        return True
    if re.fullmatch(r"#[0-9a-f]{3}", v):
        return v[1] == v[2] == v[3]
    if re.fullmatch(r"#[0-9a-f]{6}", v):
        return v[1:3] == v[3:5] == v[5:7]
    m = re.fullmatch(r"rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)", v)
    return bool(m) and m[1] == m[2] == m[3]


def props(el: ET.Element) -> dict[str, str]:
    """Presentation attributes plus inline style declarations."""
    out = {k: v for k, v in el.attrib.items() if "}" not in k}
    for decl in el.get("style", "").split(";"):
        if ":" in decl:
            k, v = decl.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def check(path: str) -> list[str]:
    root = ET.parse(path).getroot()
    errors = []
    if not root.get("viewBox"):
        errors.append("missing viewBox on <svg>")

    white_bg = has_text = False
    for el in root.iter():
        tag, p = el.tag.removeprefix(NS), props(el)
        for k in COLOR_KEYS:
            if k in p and not is_gray(p[k]):
                errors.append(f"non-gray {k}={p[k]!r} on <{tag}>")
        if tag in ("rect", "path") and p.get("fill", "").lower() in WHITE:
            white_bg = True
        if tag == "text":
            has_text = True
    if not white_bg:
        errors.append("no white background rect")

    if has_text and root.find(f"{NS}metadata") is not None:  # matplotlib leaves <metadata>
        errors.append("matplotlib text is not converted to paths; set svg.fonttype to 'path'")
    elif has_text:  # hand-written diagram; matplotlib output has glyph paths instead
        for tag in ("title", "desc"):
            el = root.find(NS + tag)
            if el is None or not (el.text or "").strip():
                errors.append(f"missing <{tag}>")
        if "serif" not in root.get("font-family", ""):
            errors.append("root font-family has no serif fallback")
    return errors


def main() -> None:
    failed = False
    for path in sys.argv[1:]:
        errors = check(path)
        for e in errors:
            print(f"{path}: {e}")
        if not errors:
            print(f"ok: {path}")
        failed |= bool(errors)
    if not sys.argv[1:]:
        sys.exit("usage: check_svg.py FILE.svg...")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
