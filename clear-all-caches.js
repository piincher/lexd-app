const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== COMPLETE CACHE CLEAR ===\n');

const pathsToDelete = [
  '.expo',
  'node_modules/.cache',
  'node_modules/.metro-cache',
  'ios/build',
  'android/build',
  'android/app/build',
  'ios/Pods',
];

for (const p of pathsToDelete) {
  const fullPath = path.join(__dirname, p);
  if (fs.existsSync(fullPath)) {
    console.log(`Deleting: ${p}`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`  ✓ Deleted`);
    } catch (e) {
      console.log(`  ✗ Error: ${e.message}`);
    }
  } else {
    console.log(`Skipping: ${p} (not found)`);
  }
}

console.log('\n=== CLEARING WATCHMAN ===');
try {
  execSync('watchman watch-del-all', { stdio: 'inherit' });
} catch (e) {
  console.log('Watchman not available or already cleared');
}

console.log('\n=== CLEARING NPM CACHE ===');
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
} catch (e) {
  console.log('NPM cache clear failed:', e.message);
}

console.log('\n=== DONE ===');
console.log('Now run: npx expo start --clear');
