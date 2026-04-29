const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const files = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
}
walk(srcDir);

const graph = {};
const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"];?/g;
const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

for (const file of files) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const imports = [];
  let m;
  while ((m = importRegex.exec(content)) !== null) imports.push(m[1]);
  while ((m = requireRegex.exec(content)) !== null) imports.push(m[1]);
  graph[relPath] = imports;
}

function resolveImport(fromFile, importPath) {
  if (!importPath.startsWith('.')) return null;
  const dir = path.dirname(fromFile);
  let resolved = path.join(dir, importPath);
  const exts = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'];
  for (const ext of exts) {
    const full = resolved + ext;
    if (fs.existsSync(full)) return full.replace(/\\/g, '/');
  }
  return null;
}

function findCycles(startFile, targetFile, visited, pathStack) {
  visited = visited || new Set();
  pathStack = pathStack || [];
  if (visited.has(startFile)) return [];
  visited.add(startFile);
  pathStack.push(startFile);

  const imports = graph[startFile] || [];
  const cycles = [];

  for (const imp of imports) {
    const resolved = resolveImport(startFile, imp);
    if (!resolved) continue;
    if (resolved === targetFile) {
      cycles.push([...pathStack, targetFile]);
    } else {
      const subCycles = findCycles(resolved, targetFile, new Set(visited), [...pathStack]);
      cycles.push(...subCycles);
    }
  }

  return cycles;
}

const colorsFile = 'src/shared/constants/Colors.ts';
const cycles = findCycles(colorsFile, colorsFile);
console.log('Cycles involving Colors.ts:', cycles.length);
for (const cycle of cycles.slice(0, 10)) {
  console.log('Cycle:', cycle.join(' -> '));
}
