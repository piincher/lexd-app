#!/usr/bin/env node

/**
 * Bundle Size Check Script
 * 
 * Verifies that bundle sizes remain within acceptable limits.
 * Run this script in CI to prevent oversized bundles from being deployed.
 * 
 * Supports:
 * - Traditional React Native bundles (.jsbundle, .android.bundle)
 * - Hermes bytecode bundles (.hbc)
 * - Expo export bundles
 * 
 * Usage: node scripts/check-bundle-size.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MAX_BUNDLE_SIZE_MB = 3; // Raw JS bundle limit
const MAX_HERMES_SIZE_MB = 8; // Hermes bytecode limit (compressed ~50-70%)
const MAX_HERMES_SIZE_BYTES = MAX_HERMES_SIZE_MB * 1024 * 1024;
const MAX_BUNDLE_SIZE_BYTES = MAX_BUNDLE_SIZE_MB * 1024 * 1024;
const WARNING_THRESHOLD_PERCENT = 0.85; // Warn at 85% of limit

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

function getStatus(sizeBytes, isHermes = false) {
  const limit = isHermes ? MAX_HERMES_SIZE_BYTES : MAX_BUNDLE_SIZE_BYTES;
  const sizeMB = sizeBytes / (1024 * 1024);
  const limitMB = limit / (1024 * 1024);
  
  if (sizeBytes > limit) {
    return { icon: '❌', color: COLORS.red, status: `EXCEEDS ${isHermes ? limitMB + 'MB' : limitMB + 'MB'}` };
  } else if (sizeBytes > limit * WARNING_THRESHOLD_PERCENT) {
    return { icon: '⚠️', color: COLORS.yellow, status: 'WARNING' };
  }
  return { icon: '✅', color: COLORS.green, status: 'OK' };
}

function scanDirectory(dir, extensions) {
  const bundles = [];
  
  if (!fs.existsSync(dir)) return bundles;
  
  const items = fs.readdirSync(dir, { recursive: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          bundles.push({
            path: item,
            fullPath: fullPath,
            size: stat.size,
            type: ext === '.hbc' ? 'hermes' : 'javascript'
          });
        }
      }
    } catch (e) {}
  }
  
  return bundles;
}

function checkBundleSize() {
  console.log(`${COLORS.bold}🔍 Bundle Size Check${COLORS.reset}\n`);
  console.log(`JavaScript limit: ${MAX_BUNDLE_SIZE_MB} MB`);
  console.log(`Hermes bytecode limit: ${MAX_HERMES_SIZE_MB} MB`);
  console.log(`Warning threshold: ${(WARNING_THRESHOLD_PERCENT * 100).toFixed(0)}%\n`);

  let allBundles = [];

  // Check traditional React Native bundle paths
  const traditionalPaths = [
    { path: 'ios/main.jsbundle', platform: 'iOS', type: 'javascript' },
    { path: 'android/app/src/main/assets/index.android.bundle', platform: 'Android', type: 'javascript' }
  ];

  for (const bundle of traditionalPaths) {
    const fullPath = path.join(process.cwd(), bundle.path);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      allBundles.push({
        path: bundle.path,
        fullPath: fullPath,
        size: stats.size,
        platform: bundle.platform,
        type: bundle.type
      });
    }
  }

  // Check Expo dist folder for Hermes bytecode
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const hbcBundles = scanDirectory(distPath, ['.hbc', '.js']);
    for (const bundle of hbcBundles) {
      // Determine platform from path
      let platform = 'Unknown';
      if (bundle.path.includes('ios')) platform = 'iOS';
      else if (bundle.path.includes('android')) platform = 'Android';
      else if (bundle.path.includes('web')) platform = 'Web';
      
      allBundles.push({
        path: bundle.path,
        fullPath: bundle.fullPath,
        size: bundle.size,
        platform: platform,
        type: bundle.type
      });
    }
  }

  // Deduplicate by path
  const seen = new Set();
  allBundles = allBundles.filter(b => {
    if (seen.has(b.path)) return false;
    seen.add(b.path);
    return true;
  });

  if (allBundles.length === 0) {
    console.log(`${COLORS.yellow}⚠️  No bundle files found.${COLORS.reset}`);
    console.log(`\nThis is expected in development. Bundles are generated during build.`);
    console.log(`\nTo generate bundles manually:`);
    console.log(`  Expo:    npx expo export --platform web`);
    console.log(`  iOS:     npx react-native bundle --platform ios --entry-file index.js --bundle-output ios/main.jsbundle`);
    console.log(`  Android: npx react-native bundle --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle`);
    console.log(`\n${COLORS.blue}ℹ️  CI Note: Bundle size check skipped (no bundles found)${COLORS.reset}`);
    process.exit(0);
  }

  // Sort by size (largest first)
  allBundles.sort((a, b) => b.size - a.size);

  let hasErrors = false;
  let hasWarnings = false;

  console.log(`${COLORS.bold}📊 Bundle Analysis:${COLORS.reset}\n`);
  console.log('─'.repeat(70));

  for (const bundle of allBundles) {
    const isHermes = bundle.type === 'hermes';
    const { icon, color, status } = getStatus(bundle.size, isHermes);
    
    console.log(`${icon} ${COLORS.bold}${bundle.platform}${COLORS.reset} (${bundle.type})`);
    console.log(`   Path: ${bundle.path}`);
    console.log(`   Size: ${color}${formatBytes(bundle.size)}${COLORS.reset}`);
    console.log(`   Status: ${color}${status}${COLORS.reset}\n`);

    if (isHermes && bundle.size > MAX_HERMES_SIZE_BYTES) {
      hasErrors = true;
    } else if (!isHermes && bundle.size > MAX_BUNDLE_SIZE_BYTES) {
      hasErrors = true;
    } else if (bundle.size > (isHermes ? MAX_HERMES_SIZE_BYTES : MAX_BUNDLE_SIZE_BYTES) * WARNING_THRESHOLD_PERCENT) {
      hasWarnings = true;
    }
  }

  console.log('─'.repeat(70));

  // Summary
  console.log(`\n${COLORS.bold}📈 Summary${COLORS.reset}`);
  console.log(`Total bundles found: ${allBundles.length}`);
  
  const jsBundles = allBundles.filter(b => b.type === 'javascript');
  const hbcBundles = allBundles.filter(b => b.type === 'hermes');
  
  if (jsBundles.length > 0) {
    const totalJs = jsBundles.reduce((sum, b) => sum + b.size, 0);
    console.log(`JavaScript bundles: ${jsBundles.length} (${formatBytes(totalJs)})`);
  }
  
  if (hbcBundles.length > 0) {
    const totalHbc = hbcBundles.reduce((sum, b) => sum + b.size, 0);
    console.log(`Hermes bytecode: ${hbcBundles.length} (${formatBytes(totalHbc)})`);
    console.log(`  ${COLORS.blue}ℹ️  Note: Hermes bytecode is precompiled and compresses well in the app store${COLORS.reset}`);
  }

  if (hasErrors) {
    console.log(`\n${COLORS.red}❌ Bundle size check FAILED${COLORS.reset}`);
    console.log(`One or more bundles exceed the size limits.`);
    console.log(`\nRecommendations:`);
    console.log(`1. Run: npm run analyze:expo`);
    console.log(`2. Identify large dependencies in the output`);
    console.log(`3. Review docs/PERFORMANCE.md for optimization strategies`);
    console.log(`4. Consider lazy loading heavy features`);
    process.exit(1);
  }

  if (hasWarnings) {
    console.log(`\n${COLORS.yellow}⚠️  Bundle size check PASSED with warnings${COLORS.reset}`);
    console.log(`Bundles are within limits but approaching thresholds.`);
    process.exit(0);
  }

  console.log(`\n${COLORS.green}✅ Bundle size check PASSED${COLORS.reset}`);
  console.log(`All bundles are within the recommended limits.`);
  process.exit(0);
}

// Run the check
checkBundleSize();
