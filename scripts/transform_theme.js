const fs = require('fs');
const ts = require('typescript');

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node transform_theme.js <file1> <file2> ...');
  process.exit(1);
}

function transformContent(content, filePath) {
  const isStylesFile = filePath.endsWith('.styles.ts');

  // Check for module-level styles declaration (only StyleSheet.create)
  const hasModuleLevelStyles = /(?:export\s+)?const\s+styles\s*=\s*StyleSheet\s*\.\s*create\s*\(/.test(content);
  const hasCreateStylesAlready = /const\s+createStyles\s*=\s*\(colors/.test(content);

  // Step 1: Replace color usages globally
  content = content.replace(/Theme\.colors\./g, 'colors.');
  content = content.replace(/Theme\.status\./g, 'colors.status.');
  content = content.replace(/Theme\.background\./g, 'colors.background.');
  content = content.replace(/Theme\.text\./g, 'colors.text.');
  content = content.replace(/Theme\.neutral\[/g, 'colors.neutral[');
  content = content.replace(/Theme\.primary\[/g, 'colors.primary[');
  content = content.replace(/Theme\.accent\[/g, 'colors.accent[');
  content = content.replace(/Theme\.feedback\[/g, 'colors.feedback[');

  // Step 2: Convert module-level styles to createStyles
  if (hasModuleLevelStyles) {
    content = content.replace(/export\s+const\s+styles\s*=\s*StyleSheet\s*\.\s*create\s*\(/, 'export const createStyles = (colors: any) => StyleSheet.create(');
    content = content.replace(/(?<!export\s)const\s+styles\s*=\s*StyleSheet\s*\.\s*create\s*\(/, 'const createStyles = (colors: any) => StyleSheet.create(');
  }

  // Step 3: Determine what we need
  const needsUseAppTheme = !isStylesFile && (content.includes('colors.') || hasCreateStylesAlready || hasModuleLevelStyles);
  const needsUseMemo = !isStylesFile && (hasModuleLevelStyles || hasCreateStylesAlready) && content.includes('styles.');

  // Step 4: Add imports if needed
  if (needsUseAppTheme && !content.includes('useAppTheme')) {
    content = addNamedImport(content, 'useAppTheme', '@src/providers/ThemeProvider');
  }
  if (needsUseMemo && !content.includes('useMemo')) {
    content = addNamedImport(content, 'useMemo', 'react');
  }

  // Step 5: Insert hook calls inside exported functions for tsx/ts files
  if (!isStylesFile && needsUseAppTheme) {
    content = insertHookCalls(content, needsUseMemo);
  }

  // Step 6: Remove unused Theme import
  if (!content.match(/Theme\.(spacing|radius|shadows|gradients)/)) {
    content = removeThemeImport(content);
  }

  return content;
}

function addNamedImport(content, name, modulePath) {
  const regex = new RegExp(`import\\s*\\{([^}]*)\\}\\s*from\\s*['"]${modulePath.replace(/\//g, '\\\\/')}['"];?`);
  const match = content.match(regex);
  if (match) {
    const existing = match[1];
    if (existing.includes(name)) return content;
    const newImport = `import { ${existing.trim()}, ${name} } from '${modulePath}';`;
    return content.replace(regex, newImport);
  }
  // Find all import statements
  const importMatches = Array.from(content.matchAll(/import\s+.*?from\s+['"][^'"]+['"];?/g));
  if (importMatches.length > 0) {
    const last = importMatches[importMatches.length - 1];
    const insertPos = last.index + last[0].length;
    return content.slice(0, insertPos) + '\n' + `import { ${name} } from '${modulePath}';` + content.slice(insertPos);
  }
  return `import { ${name} } from '${modulePath}';\n` + content;
}

function removeThemeImport(content) {
  // Remove standalone import { Theme } from '...'
  content = content.replace(/import\s*\{\s*Theme\s*\}\s*from\s*['"]@src\/(?:constants|shared\/constants)\/Theme['"];?\n?/g, '');
  // Remove Theme from multi-import
  content = content.replace(/import\s*\{\s*([^}]*)Theme,\s*([^}]*)\}\s*from\s*['"]@src\/(?:constants|shared\/constants)\/Theme['"];?\n?/g, (match, before, after) => {
    const items = (before + after).split(',').map(s => s.trim()).filter(Boolean);
    if (items.length === 0) return '';
    return `import { ${items.join(', ')} } from '@src/constants/Theme';\n`;
  });
  content = content.replace(/import\s*\{\s*([^,]*),\s*Theme\s*\}\s*from\s*['"]@src\/(?:constants|shared\/constants)\/Theme['"];?\n?/g, (match, before) => {
    const items = before.split(',').map(s => s.trim()).filter(Boolean);
    if (items.length === 0) return '';
    return `import { ${items.join(', ')} } from '@src/constants/Theme';\n`;
  });
  return content;
}

function findExportedFunctions(sourceFile) {
  const functions = [];
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      functions.push(node);
    }
    if (ts.isVariableStatement(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        if (decl.initializer && (ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
          functions.push(decl.initializer);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return functions;
}

function insertHookCalls(content, needsUseMemo) {
  const sourceFile = ts.createSourceFile('tmp.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const funcs = findExportedFunctions(sourceFile);
  if (funcs.length === 0) return content;

  // Sort by start position descending so earlier positions remain valid after insertions
  funcs.sort((a, b) => b.getStart() - a.getStart());

  for (const func of funcs) {
    let body;
    if (ts.isFunctionDeclaration(func)) {
      body = func.body;
    } else if (ts.isArrowFunction(func)) {
      body = func.body;
    } else {
      continue;
    }
    if (!body || !ts.isBlock(body)) continue;

    const funcText = content.slice(func.getStart(), func.getEnd());

    // Skip if already migrated
    if (funcText.includes('const { colors } = useAppTheme();')) continue;

    const hasCreateStyles = content.includes('createStyles');
    const usesStyles = funcText.includes('styles.');
    const hasColors = funcText.includes('colors.');

    if (!hasColors && !usesStyles) continue;

    const bracePos = body.getStart() + 1;
    const indent = '  ';
    let insertText = '';
    insertText += `\n${indent}const { colors } = useAppTheme();`;
    if (needsUseMemo && hasCreateStyles && usesStyles) {
      insertText += `\n${indent}const styles = useMemo(() => createStyles(colors), [colors]);`;
    }
    insertText += '\n';

    content = content.slice(0, bracePos) + insertText + content.slice(bracePos);
  }

  return content;
}

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log('MISSING ' + filePath);
    continue;
  }
  const original = fs.readFileSync(filePath, 'utf8');
  const transformed = transformContent(original, filePath);
  if (transformed !== original) {
    fs.writeFileSync(filePath, transformed, 'utf8');
    console.log('MODIFIED ' + filePath);
  } else {
    console.log('SKIP ' + filePath);
  }
}
