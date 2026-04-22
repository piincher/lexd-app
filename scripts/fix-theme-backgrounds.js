/**
 * Bulk replace backgroundColor: Theme.neutral.white with theme-aware card background
 * Only touches lines that have backgroundColor: preceding Theme.neutral.white
 */

const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules') {
      walkDir(dirPath, callback);
    } else if (!isDirectory && (f.endsWith('.ts') || f.endsWith('.tsx'))) {
      callback(dirPath);
    }
  });
}

let fixedFiles = 0;
let totalReplacements = 0;

walkDir(path.join(__dirname, '..', 'src'), (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let changed = false;

  const newLines = lines.map((line) => {
    // Only replace when backgroundColor: precedes Theme.neutral.white on the same line
    if (line.includes('backgroundColor') && line.includes('Theme.neutral.white')) {
      const newLine = line.replace(/Theme\.neutral\.white/g, 'Theme.colors.background.card');
      if (newLine !== line) {
        changed = true;
        totalReplacements++;
      }
      return newLine;
    }
    return line;
  });

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    fixedFiles++;
  }
});

console.log(`Fixed ${fixedFiles} files with ${totalReplacements} backgroundColor replacements.`);
