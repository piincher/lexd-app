from pathlib import Path
import re

FEATURES_DIR = Path("src/features")

FEATURE_INDICATORS = {"screens", "hooks", "components", "api", "types", "lib", "constants", "utils", "services", "assets", "store", "context", "providers", "navigation", "i18n", "tests", "__tests__", "mocks"}

def find_feature_root(path):
    rel = path.relative_to(FEATURES_DIR)
    parts = list(rel.parts)
    if path.is_file():
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

file_path = FEATURES_DIR / "admin/communications/screens/SendSms.tsx"
source_root = find_feature_root(file_path)
print(f"Source file: {file_path}")
print(f"Source root: {source_root}")

content = file_path.read_text(encoding="utf-8")
pattern = r'(?:import|export)\s+.*?\s+from\s+["\']([^"\']+)["\']'
for match in re.finditer(pattern, content):
    imp = match.group(1)
    if imp.startswith("./") or imp.startswith("../"):
        base = file_path.parent
        resolved = (base / imp).resolve()
        target_root = find_feature_root(resolved)
        print(f"  Import: {imp}")
        print(f"    Resolved: {resolved}")
        print(f"    Target root: {target_root}")
