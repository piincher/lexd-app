#!/usr/bin/env node

/**
 * Expo Bundle Analyzer Script
 * 
 * Analyzes the bundle size for Expo projects using expo export.
 * Generates a report of bundle sizes and largest dependencies.
 * 
 * Usage: node scripts/analyze-bundle-expo.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log(`${COLORS.bold}${COLORS.cyan}📦 Expo Bundle Analysis${COLORS.reset}\n`);

  const distPath = path.join(process.cwd(), 'dist');
  
  // Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    console.log(`${COLORS.yellow}⚠️  No dist folder found.${COLORS.reset}`);
    console.log('Run the following command first to generate bundles:');
    console.log(`${COLORS.cyan}  npx expo export --platform web${COLORS.reset}\n`);
    
    // Try to run expo export
    console.log(`${COLORS.bold}Attempting to run expo export...${COLORS.reset}\n`);
    try {
      execSync('npx expo export --platform web', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } catch (error) {
      console.log(`\n${COLORS.yellow}Note: Bundle export may require a clean project state.${COLORS.reset}`);
      return;
    }
  }

  // Analyze the bundles in dist folder
  const bundles = [];
  
  function scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relPath = path.join(relativePath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, relPath);
      } else if (item.endsWith('.js') || item.endsWith('.js.map') || item.endsWith('.hbc')) {
        bundles.push({
          name: relPath,
          size: stat.size,
          type: item.endsWith('.map') ? 'sourcemap' : 'bundle'
        });
      }
    }
  }

  if (fs.existsSync(distPath)) {
    scanDirectory(distPath);
  }

  if (bundles.length === 0) {
    console.log(`${COLORS.yellow}No bundle files found in dist/ folder${COLORS.reset}`);
    return;
  }

  // Sort by size (largest first)
  bundles.sort((a, b) => b.size - a.size);

  console.log(`${COLORS.bold}📊 Bundle Analysis Results${COLORS.reset}\n`);
  console.log(`Found ${bundles.length} bundle files:\n`);

  const jsBundles = bundles.filter(b => b.type === 'bundle');
  let totalSize = 0;

  console.log(`${COLORS.bold}JavaScript Bundles:${COLORS.reset}`);
  console.log('─'.repeat(60));
  
  for (const bundle of jsBundles) {
    const sizeStr = formatBytes(bundle.size);
    const status = bundle.size > 3 * 1024 * 1024 ? COLORS.red :
                   bundle.size > 2 * 1024 * 1024 ? COLORS.yellow : COLORS.green;
    
    console.log(`${status}${sizeStr.padStart(12)}${COLORS.reset}  ${bundle.name}`);
    totalSize += bundle.size;
  }

  console.log('─'.repeat(60));
  console.log(`${COLORS.bold}Total JS Bundle Size: ${formatBytes(totalSize)}${COLORS.reset}\n`);

  // Performance budget check
  const maxSize = 3 * 1024 * 1024; // 3MB
  if (totalSize > maxSize) {
    console.log(`${COLORS.red}❌ WARNING: Total bundle size exceeds 3MB recommendation${COLORS.reset}`);
  } else if (totalSize > 2.5 * 1024 * 1024) {
    console.log(`${COLORS.yellow}⚠️  WARNING: Bundle size approaching 3MB limit${COLORS.reset}`);
  } else {
    console.log(`${COLORS.green}✅ Bundle size is within recommended limits${COLORS.reset}`);
  }

  // Sourcemaps
  const sourcemaps = bundles.filter(b => b.type === 'sourcemap');
  if (sourcemaps.length > 0) {
    console.log(`\n${COLORS.bold}Source Maps:${COLORS.reset}`);
    console.log('─'.repeat(60));
    for (const map of sourcemaps) {
      console.log(`${formatBytes(map.size).padStart(12)}  ${map.name}`);
    }
  }

  // Node modules analysis
  console.log(`\n${COLORS.bold}📦 Dependencies Analysis${COLORS.reset}\n`);
  
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    const largePackages = [];
    
    function getPackageSize(packagePath) {
      let totalSize = 0;
      try {
        const items = fs.readdirSync(packagePath);
        for (const item of items) {
          if (item === 'node_modules') continue; // Skip nested node_modules
          const itemPath = path.join(packagePath, item);
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            // Recursively get size
            const subItems = fs.readdirSync(itemPath, { recursive: true });
            for (const subItem of subItems) {
              const subItemPath = path.join(itemPath, subItem);
              try {
                const subStat = fs.statSync(subItemPath);
                if (subStat.isFile()) {
                  totalSize += subStat.size;
                }
              } catch (e) {}
            }
          } else {
            totalSize += stat.size;
          }
        }
      } catch (e) {}
      return totalSize;
    }

    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    console.log(`${COLORS.bold}Key Dependencies:${COLORS.reset}`);
    console.log('─'.repeat(60));
    
    const keyPackages = [
      'react-native', 'expo', '@react-navigation/native', 
      'react-native-paper', 'stream-chat-react-native', '@sentry/react-native',
      'react-native-reanimated', 'moti', 'react-native-gifted-charts',
      '@tanstack/react-query', 'zustand', 'axios'
    ];

    for (const pkg of keyPackages) {
      if (deps[pkg]) {
        const pkgPath = path.join(nodeModulesPath, pkg);
        if (fs.existsSync(pkgPath)) {
          const size = getPackageSize(pkgPath);
          const color = size > 1024 * 1024 ? COLORS.red : 
                       size > 500 * 1024 ? COLORS.yellow : COLORS.reset;
          console.log(`${color}${formatBytes(size).padStart(12)}${COLORS.reset}  ${pkg}@${deps[pkg]}`);
        }
      }
    }
  }

  console.log(`\n${COLORS.cyan}💡 Recommendations:${COLORS.reset}`);
  console.log('• Use "npx react-native-bundle-visualizer" for detailed treemap analysis');
  console.log('• Run with Metro server stopped for accurate results');
  console.log('• Review docs/PERFORMANCE.md for optimization strategies');
}

analyzeBundle();
