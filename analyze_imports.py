import os
import re
from pathlib import Path
from collections import Counter, defaultdict

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

def main():
    violations = []
    
    feature_roots = {}
    for file_path in FEATURES_DIR.rglob("*"):
        if file_path.is_file() and file_path.suffix in (".ts", ".tsx"):
            root = find_feature_root(file_path)
            feature_roots[str(file_path)] = root
    
    skip_files = {
        str(FEATURES_DIR / "admin/index.ts"),
        str(FEATURES_DIR / "customer/index.ts"),
    }
    
    for file_path in FEATURES_DIR.rglob("*"):
        if not file_path.is_file() or file_path.suffix not in (".ts", ".tsx"):
            continue
        
        if str(file_path.resolve()) in skip_files:
            continue
        
        source_root = feature_roots.get(str(file_path), "")
        if not source_root:
            continue
        
        imports = extract_imports(file_path)
        
        for imp in imports:
            target_root = None
            
            if imp.startswith("@src/features/"):
                rest = imp[len("@src/features/"):]
                parts = rest.split("/")
                
                target_file_path = FEATURES_DIR / rest
                actual = find_actual_file(target_file_path)
                if actual:
                    target_file_path = actual
                
                target_root = feature_roots.get(str(target_file_path), "")
                if not target_root:
                    target_root = find_feature_root(target_file_path)
            
            elif imp.startswith("./") or imp.startswith("../"):
                resolved = resolve_relative_import(file_path, imp)
                if resolved:
                    target_root = feature_roots.get(str(resolved), "")
                    if not target_root:
                        target_root = find_feature_root(resolved)
            
            if target_root and target_root != source_root:
                violations.append({
                    "importing_file": str(file_path.relative_to(ROOT_DIR)).replace("\\", "/"),
                    "imported_module": imp,
                    "source_feature": source_root,
                    "target_feature": target_root,
                    "type": "cross-feature"
                })
    
    for file_path in SHARED_DIR.rglob("*"):
        if not file_path.is_file() or file_path.suffix not in (".ts", ".tsx"):
            continue
        
        imports = extract_imports(file_path)
        for imp in imports:
            if imp.startswith("@src/features/") or imp.startswith("../features/") or imp.startswith("../../features/"):
                if imp.startswith("@src/features/"):
                    rest = imp[len("@src/features/"):]
                    parts = rest.split("/")
                    target_root = parts[0] if len(parts) >= 1 else ""
                    if len(parts) >= 2:
                        target_root = f"{parts[0]}/{parts[1]}"
                else:
                    target_root = "features/..."
                
                rel_path = str(file_path.relative_to(ROOT_DIR)).replace("\\", "/")
                is_ui = rel_path.startswith("src/shared/ui/")
                violations.append({
                    "importing_file": rel_path,
                    "imported_module": imp,
                    "source_feature": "shared" + ("/ui" if is_ui else ""),
                    "target_feature": target_root,
                    "type": "shared-layer" if is_ui else "shared-imports-feature"
                })
    
    by_target = defaultdict(list)
    by_source_target = Counter()
    for v in violations:
        by_target[v['target_feature']].append(v)
        by_source_target[(v['source_feature'], v['target_feature'])] += 1
    
    print(f"Total violations found: {len(violations)}")
    print("\n" + "="*80)
    print("\nTOP TARGET FEATURES (imported from most often):")
    for target, count in Counter({k: len(v) for k, v in by_target.items()}).most_common(15):
        print(f"  {target}: {count} violations")
    
    print("\n" + "="*80)
    print("\nTOP SOURCE -> TARGET PAIRS:")
    for (source, target), count in by_source_target.most_common(20):
        print(f"  {source} -> {target}: {count}")
    
    print("\n" + "="*80)
    print("\nALL VIOLATIONS:")
    for v in violations:
        print(f"\nFile: {v['importing_file']}")
        print(f"  Import: {v['imported_module']}")
        print(f"  Source feature: {v['source_feature']}")
        print(f"  Target feature: {v['target_feature']}")
        print(f"  Type: {v['type']}")

if __name__ == "__main__":
    main()
