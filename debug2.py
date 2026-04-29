from pathlib import Path

FEATURES_DIR = Path("src/features").resolve()

FEATURE_INDICATORS = {"screens", "hooks", "components", "api", "types", "lib", "constants", "utils", "services", "assets", "store", "context", "providers", "navigation", "i18n", "tests", "__tests__", "mocks"}

def find_feature_root(path):
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

def find_actual_file(path):
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

source = FEATURES_DIR / "auth/index.ts"
imp = "./screens/LoginScreen"
resolved = (source.parent / imp[2:]).resolve()
actual = find_actual_file(resolved)

print(f"Source: {source}")
print(f"Resolved: {resolved}")
print(f"Actual: {actual}")
print(f"Source root: {find_feature_root(source)}")
print(f"Resolved root: {find_feature_root(resolved)}")
print(f"Actual root: {find_feature_root(actual)}")
