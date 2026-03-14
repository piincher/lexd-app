/**
 * IMPORT ANALYSIS SCRIPT
 * 
 * This script analyzes the feature exports and index files to identify
 * potential issues with exports without loading React Native dependencies.
 * 
 * Run with: node src/import-analysis.js
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('IMPORT ANALYSIS - Checking for export/import issues');
console.log('='.repeat(80));
console.log('');

const issues = {
  emptyExports: [],
  circularRefs: [],
  undefinedChecks: [],
  missingFiles: [],
  duplicateExports: [],
};

// Helper to check if a path is a directory
function isDirectory(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return false;
  return fs.statSync(fullPath).isDirectory();
}

// Helper to check if a file exists and is a file
function fileExists(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return false;
  return fs.statSync(fullPath).isFile();
}

// Helper to read file content
function readFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return null;
  if (fs.statSync(fullPath).isDirectory()) return null;
  return fs.readFileSync(fullPath, 'utf-8');
}

// Helper to check if file has content
function hasExports(filePath) {
  const content = readFile(filePath);
  if (!content) return false;
  // Check for export statements
  return /\bexport\b/.test(content);
}

// ============================================================================
// SECTION 1: Check all feature index files
// ============================================================================
console.log('SECTION 1: Checking Feature Index Files');
console.log('-'.repeat(80));

const featuresToCheck = [
  'features/admin/index.ts',
  'features/customer/index.ts',
  'features/auth/index.ts',
  'features/chat/index.ts',
  'features/goods/index.ts',
  'features/home/index.ts',
  'features/notifications/index.ts',
  'features/onboarding/index.ts',
  'features/order-detail/index.ts',
  'features/orders/index.ts',
  'features/payments/index.ts',
  'features/profile/index.ts',
  'features/public/index.ts',
  'features/routes/index.ts',
  'features/search/index.ts',
  'features/stats/index.ts',
  // Admin sub-features
  'features/admin/analytics/index.ts',
  'features/admin/consignees/index.ts',
  'features/admin/containers/index.ts',
  'features/admin/export/index.ts',
  'features/admin/goods/index.ts',
  'features/admin/orders/index.ts',
  'features/admin/routes/index.ts',
  'features/admin/search/index.ts',
  // Customer sub-features
  'features/customer/containers/index.ts',
  'features/customer/dashboard/index.ts',
  'features/customer/orders/index.ts',
  'features/customer/payments/index.ts',
  'features/customer/support/index.ts',
];

console.log('\n--- Checking Index Files Exist and Have Exports ---\n');
featuresToCheck.forEach(featurePath => {
  const content = readFile(featurePath);
  if (!content) {
    console.log(`❌ ${featurePath} - FILE NOT FOUND`);
    issues.missingFiles.push(featurePath);
  } else if (!hasExports(featurePath)) {
    console.log(`⚠️  ${featurePath} - NO EXPORTS FOUND`);
    issues.emptyExports.push(featurePath);
  } else {
    const exportCount = (content.match(/\bexport\b/g) || []).length;
    console.log(`✅ ${featurePath} - ${exportCount} export statements`);
  }
});

// ============================================================================
// SECTION 2: Check for specific problematic patterns
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SECTION 2: Checking for Problematic Export Patterns');
console.log('-'.repeat(80));

// Check for export * from patterns that might cause issues
function checkExportPatterns(filePath) {
  const content = readFile(filePath);
  if (!content) return;
  
  const lines = content.split('\n');
  
  lines.forEach((line, idx) => {
    // Check for export * from
    if (line.includes('export * from')) {
      const match = line.match(/export \* from ['"](.+?)['"]/);
      if (match) {
        const importPath = match[1];
        // Resolve relative path
        const baseDir = path.dirname(filePath);
        let resolvedPath;
        
        if (importPath.startsWith('.')) {
          resolvedPath = path.join(baseDir, importPath);
        } else if (importPath.startsWith('@src/')) {
          resolvedPath = importPath.replace('@src/', 'features/../');
        } else {
          return; // Skip node_modules imports
        }
        
        // Check if the file exists
        const possiblePaths = [
          resolvedPath,
          resolvedPath + '.ts',
          resolvedPath + '.tsx',
          resolvedPath + '/index.ts',
          resolvedPath + '/index.tsx',
        ];
        
        const exists = possiblePaths.some(p => fileExists(p));
        if (!exists) {
          console.log(`❌ ${filePath}:${idx + 1}`);
          console.log(`   Export references non-existent path: ${importPath}`);
          issues.missingFiles.push(`${filePath} -> ${importPath}`);
        }
      }
    }
    
    // Check for export { default } patterns (potential undefined export)
    if (line.includes('export { default }') || line.includes('export {default}')) {
      console.log(`⚠️  ${filePath}:${idx + 1}`);
      console.log(`   Uses 'export { default }' pattern - may cause undefined value if source has no default export`);
      console.log(`   Line: ${line.trim()}`);
      issues.undefinedChecks.push(`${filePath}:${idx + 1} - ${line.trim()}`);
    }
    
    // Check for export { X as default } patterns
    if (line.includes(' as default')) {
      console.log(`ℹ️  ${filePath}:${idx + 1}`);
      console.log(`   Uses 'as default' pattern: ${line.trim()}`);
    }
    
    // Check for export const, export function patterns
    if (/export\s+(const|let|var|function|class|interface|type)\s+(\w+)/.test(line)) {
      const nameMatch = line.match(/export\s+(?:const|let|var|function|class|interface|type)\s+(\w+)/);
      if (nameMatch) {
        const name = nameMatch[1];
        // Check if it's exported as undefined initially
        if (line.includes(name + ' = undefined') || (line.includes(name + ';') && !line.includes('='))) {
          console.log(`⚠️  ${filePath}:${idx + 1}`);
          console.log(`   Export may be undefined: ${name}`);
          issues.undefinedChecks.push(`${filePath}:${idx + 1} - ${name}`);
        }
      }
    }
  });
}

console.log('\n--- Analyzing Export Patterns ---\n');
featuresToCheck.forEach(featurePath => {
  checkExportPatterns(featurePath);
});

// ============================================================================
// SECTION 3: Check for index.ts files that might have circular references
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SECTION 3: Checking for Potential Circular References');
console.log('-'.repeat(80));

function findCircularReferences(filePath, visited) {
  if (!visited) visited = new Set();
  
  if (visited.has(filePath)) {
    return [filePath]; // Circular reference found
  }
  
  const content = readFile(filePath);
  if (!content) return [];
  
  visited.add(filePath);
  const circular = [];
  
  // Find all export/import from local paths
  const importMatches = content.matchAll(/from ['"](\.\/[^'"]+)['"]/g);
  for (const match of importMatches) {
    const importPath = match[1];
    const baseDir = path.dirname(filePath);
    let resolvedPath = path.join(baseDir, importPath);
    
    // If it's a directory, look for index.ts
    if (isDirectory(resolvedPath)) {
      resolvedPath = path.join(resolvedPath, 'index.ts');
    } else {
      // Try adding extensions
      const withExt = resolvedPath + '.ts';
      if (fileExists(withExt)) {
        resolvedPath = withExt;
      }
    }
    
    if (fileExists(resolvedPath)) {
      const subCircular = findCircularReferences(resolvedPath, new Set(visited));
      if (subCircular.length > 0) {
        circular.push(filePath, ...subCircular);
      }
    }
  }
  
  return circular;
}

console.log('\n--- Checking Key Files for Circular References ---\n');
const keyFiles = [
  'features/index.ts',
  'features/admin/index.ts',
  'features/customer/index.ts',
];

keyFiles.forEach(file => {
  console.log(`Checking ${file}...`);
  const circular = findCircularReferences(file);
  if (circular.length > 0) {
    console.log(`  ⚠️  Potential circular reference detected: ${circular.join(' -> ')}`);
    issues.circularRefs.push(`${file}: ${circular.join(' -> ')}`);
  } else {
    console.log(`  ✅ No circular references detected`);
  }
});

// ============================================================================
// SECTION 4: Check screen index files specifically
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SECTION 4: Checking Screen Index Files');
console.log('-'.repeat(80));

const screenIndexFiles = [
  // Admin screens
  'features/admin/analytics/screens/AnalyticsDashboardScreen/index.ts',
  'features/admin/consignees/screens/ConsigneeDetailScreen/index.ts',
  'features/admin/consignees/screens/ConsigneeListScreen/index.ts',
  'features/admin/consignees/screens/CreateConsigneeScreen/index.ts',
  'features/admin/containers/screens/ContainerDetailScreen/index.ts',
  'features/admin/containers/screens/ContainerListScreen/index.ts',
  'features/admin/containers/screens/CreateContainerScreen/index.ts',
  'features/admin/containers/screens/LoadingListScreen/index.ts',
  'features/admin/containers/screens/WaypointManagementScreen/index.ts',
  'features/admin/goods/screens/GoodsDetailScreen/index.ts',
  'features/admin/goods/screens/GoodsListScreen/index.ts',
  'features/admin/goods/screens/ReceiveGoodsScreen/index.ts',
  'features/admin/routes/screens/RouteFormScreen/index.ts',
  'features/admin/routes/screens/RouteListScreen/index.ts',
  'features/admin/search/screens/GlobalSearchScreen/index.ts',
  'features/admin/whatsapp-requests/screens/WhatsAppRequestListScreen/index.ts',
  // Customer screens
  'features/customer/containers/screens/ClientLoadingListScreen/index.ts',
  'features/customer/containers/screens/ClientPackingListScreen/index.ts',
  'features/customer/containers/screens/ContainerTrackingScreen/index.ts',
  'features/customer/containers/screens/MyContainersScreen/index.ts',
  'features/customer/dashboard/screens/index.ts',
  'features/customer/orders/screens/PastOrdersScreenV2.tsx',
  'features/customer/payments/screens/PaymentConfirmationScreen/index.ts',
  'features/customer/payments/screens/PaymentPortalScreen/index.ts',
  'features/customer/support/screens/CreateTicketScreen/index.ts',
  'features/customer/support/screens/TicketDetailScreen/index.ts',
  'features/customer/support/screens/TicketListScreen/index.ts',
];

console.log('\n--- Checking Screen Exports ---\n');
screenIndexFiles.forEach(screenPath => {
  const content = readFile(screenPath);
  if (!content) {
    console.log(`❌ ${screenPath} - NOT FOUND`);
    issues.missingFiles.push(screenPath);
    return;
  }
  
  // Check what the screen exports
  const hasDefaultExport = /export\s+default/.test(content);
  const hasNamedExports = /export\s+(const|function|class|interface|type|{)/.test(content);
  const hasReExport = /export\s+\*\s+from/.test(content);
  
  if (hasReExport) {
    // Check what it re-exports
    const reExportMatch = content.match(/export\s+\*\s+from\s+['"]([^'"]+)['"]/);
    if (reExportMatch) {
      const targetFile = reExportMatch[1];
      const dir = path.dirname(screenPath);
      let targetPath = path.join(dir, targetFile);
      
      // Try different extensions
      const targetExists = [
        targetPath,
        targetPath + '.ts',
        targetPath + '.tsx',
      ].some(p => fileExists(p));
      
      if (!targetExists) {
        console.log(`❌ ${screenPath}`);
        console.log(`   Re-exports from non-existent file: ${targetFile}`);
        issues.missingFiles.push(`${screenPath} -> ${targetFile}`);
      } else {
        console.log(`✅ ${screenPath} - re-exports from ${targetFile}`);
      }
    }
  } else if (hasDefaultExport) {
    console.log(`✅ ${screenPath} - has default export`);
  } else if (hasNamedExports) {
    const namedMatch = content.match(/export\s+(?:const|function|class)\s+(\w+)/);
    console.log(`✅ ${screenPath} - named export: ${namedMatch ? namedMatch[1] : 'unknown'}`);
  } else {
    console.log(`⚠️  ${screenPath} - NO EXPORTS DETECTED`);
    issues.emptyExports.push(screenPath);
  }
});

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n');
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

console.log(`\n📊 ISSUES FOUND:`);
console.log(`  - Missing files: ${issues.missingFiles.length}`);
console.log(`  - Empty exports: ${issues.emptyExports.length}`);
console.log(`  - Undefined checks: ${issues.undefinedChecks.length}`);
console.log(`  - Circular refs: ${issues.circularRefs.length}`);

if (issues.missingFiles.length > 0) {
  console.log('\n--- MISSING FILES ---');
  issues.missingFiles.forEach(file => console.log(`  ❌ ${file}`));
}

if (issues.emptyExports.length > 0) {
  console.log('\n--- EMPTY EXPORTS ---');
  issues.emptyExports.forEach(file => console.log(`  ⚠️  ${file}`));
}

if (issues.undefinedChecks.length > 0) {
  console.log('\n--- POTENTIAL UNDEFINED EXPORTS ---');
  issues.undefinedChecks.forEach(check => console.log(`  ⚠️  ${check}`));
}

if (issues.circularRefs.length > 0) {
  console.log('\n--- CIRCULAR REFERENCES ---');
  issues.circularRefs.forEach(ref => console.log(`  🔄 ${ref}`));
}

console.log('\n');
console.log('='.repeat(80));
if (Object.values(issues).every(arr => arr.length === 0)) {
  console.log('✅ NO ISSUES DETECTED - All exports look good!');
} else {
  console.log('⚠️  ISSUES DETECTED - Review the output above');
}
console.log('='.repeat(80));

// Export for programmatic use
module.exports = { issues };
