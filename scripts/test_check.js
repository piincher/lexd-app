const fs = require('fs');
const content = fs.readFileSync('src/features/admin/search/components/FilterCategorySection.tsx','utf8');
let cleaned = content.replace(/\/\*[\s\S]*?\*\//g, '');
const lines = cleaned.split('\n');
let depth = 0;
for (let line of lines) {
  line = line.replace(/\/\/.*$/g, '');
  let noStrings = line.replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, '``');
  if (/Theme\./.test(line)) {
    console.log('depth', depth, 'line:', line.trim());
  }
  depth += (noStrings.match(/{/g) || []).length - (noStrings.match(/}/g) || []).length;
  if (depth < 0) depth = 0;
}
