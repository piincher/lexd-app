// Minimal test to find undefined exports by analyzing source files
const fs = require('fs');
const path = require('path');

console.log('=== STARTING IMPORT ANALYSIS ===');

const SRC_DIR = path.join(__dirname, 'features/admin');

// Helper to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Helper to read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

// Helper to extract exports from file
function getExports(content) {
  const exports = [];
  const patterns = [
    /export\s+(?:const|let|var|function|class|interface|type|enum)\s+(\w+)/g,
    /export\s+\{\s*([^}]+)\s*\}/g,
    /export\s+\{\s*default\s+as\s+(\w+)\s*\}/g,
    /export\s+\*\s+from\s+['"]([^'"]+)['"]/g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      exports.push(match[1] || match[0]);
    }
  }
  return exports;
}

// Test 1: Check metro config
console.log('\n1. Testing Metro config...');
const metroPath = path.join(__dirname, '../metro.config.js');
if (fileExists(metroPath)) {
  console.log('✓ Metro config exists');
} else {
  console.error('✗ Metro config NOT FOUND');
}

// Test 2: Check features index exists
console.log('\n2. Testing features index...');
const featuresIndexPath = path.join(__dirname, 'features/index.ts');
if (fileExists(featuresIndexPath)) {
  console.log('✓ Features index exists');
  const content = readFile(featuresIndexPath);
  const exports = getExports(content);
  console.log(`  Found ${exports.length} export statements`);
} else {
  console.error('✗ Features index NOT FOUND');
}

// Test 3: Check admin index
console.log('\n3. Testing admin feature index...');
const adminIndexPath = path.join(__dirname, 'features/admin/index.ts');
if (fileExists(adminIndexPath)) {
  console.log('✓ Admin index exists');
  const content = readFile(adminIndexPath);
  const exports = getExports(content);
  console.log(`  Found ${exports.length} export statements`);
  
  // Check for re-exports from sub-features
  const reExportPattern = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  const reExports = [];
  while ((match = reExportPattern.exec(content)) !== null) {
    reExports.push(match[1]);
  }
  console.log(`  Re-exports from: ${reExports.join(', ')}`);
} else {
  console.error('✗ Admin index NOT FOUND');
}

// Test 4: Check specific sub-feature indices
console.log('\n4. Testing sub-feature indices...');
const subFeatures = ['consignees', 'routes', 'search', 'containers', 'goods', 'analytics', 'export'];
for (const feature of subFeatures) {
  const indexPath = path.join(__dirname, `features/admin/${feature}/index.ts`);
  if (fileExists(indexPath)) {
    const content = readFile(indexPath);
    const exports = getExports(content);
    console.log(`✓ ${feature}/index.ts: ${exports.length} exports`);
  } else {
    console.error(`✗ ${feature}/index.ts NOT FOUND`);
  }
}

// Test 5: Check specific screens exist
console.log('\n5. Testing screen files...');
const screens = [
  'features/admin/consignees/screens/ConsigneeListScreen.tsx',
  'features/admin/consignees/screens/ConsigneeDetailScreen.tsx',
  'features/admin/consignees/screens/CreateConsigneeScreen.tsx',
  'features/admin/routes/screens/RouteListScreen.tsx',
  'features/admin/routes/screens/RouteFormScreen.tsx',
  'features/admin/search/screens/GlobalSearchScreen.tsx',
  'features/admin/export/screens/DataExportScreen.tsx',
];

for (const screen of screens) {
  const screenPath = path.join(__dirname, screen);
  if (fileExists(screenPath)) {
    const content = readFile(screenPath);
    // Check for default export
    const hasDefaultExport = content.includes('export default');
    // Check for named export matching filename
    const fileName = path.basename(screen, '.tsx');
    const hasNamedExport = content.includes(`export const ${fileName}`) || 
                           content.includes(`export function ${fileName}`);
    
    if (hasDefaultExport || hasNamedExport) {
      console.log(`✓ ${screen}: has exports`);
    } else {
      console.error(`✗ ${screen}: NO EXPORTS FOUND`);
    }
  } else {
    console.error(`✗ ${screen}: FILE NOT FOUND`);
  }
}

// Test 6: Check for circular dependencies
console.log('\n6. Checking for circular dependencies...');
function checkCircularDependency(filePath, visited = new Set(), depth = 0) {
  if (depth > 10) return; // Prevent infinite recursion
  
  const content = readFile(filePath);
  if (!content) return;
  
  const importPattern = /from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importPattern.exec(content)) !== null) {
    const importPath = match[1];
    
    // Only check relative imports within src
    if (importPath.startsWith('.') || importPath.startsWith('@src/')) {
      let resolvedPath;
      if (importPath.startsWith('@src/')) {
        resolvedPath = path.join(__dirname, importPath.replace('@src/', ''));
      } else {
        resolvedPath = path.join(path.dirname(filePath), importPath);
      }
      
      // Add extensions if not present
      if (!resolvedPath.endsWith('.ts') && !resolvedPath.endsWith('.tsx')) {
        if (fileExists(resolvedPath + '/index.ts')) {
          resolvedPath = resolvedPath + '/index.ts';
        } else if (fileExists(resolvedPath + '.ts')) {
          resolvedPath = resolvedPath + '.ts';
        } else if (fileExists(resolvedPath + '.tsx')) {
          resolvedPath = resolvedPath + '.tsx';
        }
      }
      
      if (visited.has(resolvedPath)) {
        console.error(`  ✗ Circular dependency detected: ${filePath} -> ${importPath}`);
        return;
      }
      
      const newVisited = new Set(visited);
      newVisited.add(filePath);
      checkCircularDependency(resolvedPath, newVisited, depth + 1);
    }
  }
}

// Check admin index for circular deps
const adminIndexFullPath = path.join(__dirname, 'features/admin/index.ts');
checkCircularDependency(adminIndexFullPath);
console.log('  Circular dependency check complete');

// Test 7: Check for specific problematic patterns
console.log('\n7. Checking for problematic export patterns...');
function checkProblematicExports(filePath) {
  const content = readFile(filePath);
  if (!content) return;
  
  // Check for export * that might override
  const wildcardPattern = /export\s+\*\s+from/g;
  const hasWildcard = wildcardPattern.test(content);
  
  // Check for duplicate export names
  const exportPattern = /export\s+\{\s*([^}]+)\s*\}/g;
  const namedExports = [];
  let match;
  while ((match = exportPattern.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(' as ').pop().trim());
    namedExports.push(...names);
  }
  
  const duplicates = namedExports.filter((item, index) => namedExports.indexOf(item) !== index);
  
  return { hasWildcard, duplicates };
}

const adminIndexFull = path.join(__dirname, 'features/admin/index.ts');
const result = checkProblematicExports(adminIndexFull);
if (result) {
  if (result.hasWildcard) {
    console.log('  ⚠ Admin index has wildcard exports - potential for conflicts');
  }
  if (result.duplicates.length > 0) {
    console.error(`  ✗ Duplicate exports found: ${result.duplicates.join(', ')}`);
  } else {
    console.log('  ✓ No duplicate exports found');
  }
}

console.log('\n=== IMPORT ANALYSIS COMPLETE ===');
