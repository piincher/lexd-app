import os
import re
from pathlib import Path

SRC_DIR = Path("src").resolve()
FEATURES_DIR = (SRC_DIR / "features").resolve()
SHARED_DIR = (SRC_DIR / "shared").resolve()
ROOT_DIR = Path(".").resolve()

FEATURE_INDICATORS = {"screens", "hooks", "components", "api", "types", "lib", "constants", "utils", "services", "assets", "store", "context", "providers", "navigation", "i18n", "tests", "__tests__", "mocks"}

def find_feature_root(path: Path) -> str:
    try:
        rel = path.relative_to(FEATURES_DIR)
    except ValueError:
        return ""
    parts = list(rel.parts)
    if path.is_file() or not path.exists():
        parts = parts[:-1]
    for i in range(len(parts), 0, -1):
        candidate = FEATURES_DIR / Path(*parts[:i])
        if not candidate.exists():
            continue
        level = i
        if level > 2:
            continue
        dir_name = parts[i-1]
        if dir_name in FEATURE_INDICATORS:
            continue
        try:
            children = {child.name for child in candidate.iterdir() if child.is_dir()}
            files = {child.name for child in candidate.iterdir() if child.is_file()}
        except:
            continue
        if children & FEATURE_INDICATORS or "index.ts" in files:
            return str(Path(*parts[:i])).replace("\\", "/")
    if len(parts) >= 2:
        return str(Path(*parts[:2])).replace("\\", "/")
    elif parts:
        return parts[0]
    return ""

def find_actual_file(path: Path) -> Path:
    if path.exists() and path.is_file():
        return path
    if path.suffix in (".ts", ".tsx"):
        if path.exists():
            return path
        return None
    for ext in [".ts", ".tsx"]:
        candidate = path.parent / (path.name + ext)
        if candidate.exists():
            return candidate
    for ext in ["index.ts", "index.tsx"]:
        candidate = path / ext
        if candidate.exists():
            return candidate
    return None

def resolve_relative_import(source_file: Path, import_path: str) -> Path:
    if import_path.startswith("./"):
        base = source_file.parent
        rel = import_path[2:]
    elif import_path.startswith("../"):
        base = source_file.parent
        rel = import_path
    else:
        return None
    try:
        resolved = (base / rel).resolve()
        actual = find_actual_file(resolved)
        return actual if actual else resolved
    except:
        return None

def extract_imports(file_path: Path) -> list:
    imports = []
    try:
        content = file_path.read_text(encoding="utf-8")
    except:
        return imports
    pattern = r'(?:import|export)\s+.*?\s+from\s+["\']([^"\']+)["\']'
    for match in re.finditer(pattern, content):
        imports.append(match.group(1))
    return imports

feature_roots = {}
for file_path in FEATURES_DIR.rglob("*"):
    if file_path.is_file() and file_path.suffix in (".ts", ".tsx"):
        root = find_feature_root(file_path)
        feature_roots[str(file_path)] = root

file_path = FEATURES_DIR / "auth/index.ts"
source_root = feature_roots.get(str(file_path), "")
imports = extract_imports(file_path)

for imp in imports:
    if imp.startswith("./") or imp.startswith("../"):
        resolved = resolve_relative_import(file_path, imp)
        if resolved:
            target_root = feature_roots.get(str(resolved), "")
            if not target_root:
                target_root = find_feature_root(resolved)
            if target_root and target_root != source_root:
                print(f"VIOLATION: {imp} -> {target_root} (resolved: {resolved})")
            else:
                print(f"OK: {imp} -> {target_root} (resolved: {resolved})")
