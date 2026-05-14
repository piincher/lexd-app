const fs = require('fs');
const ts = require('typescript');

const f = 'src/features/admin/search/components/GlobalSearchHeader.tsx';
const content = fs.readFileSync(f, 'utf8');
const sourceFile = ts.createSourceFile(f, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

const COLOR_PROPS = new Set(['colors', 'status', 'background', 'text', 'neutral', 'primary', 'accent', 'feedback']);

function isThemeImport(node) {
  if (!ts.isImportDeclaration(node)) return false;
  const moduleSpec = node.moduleSpecifier;
  if (!ts.isStringLiteral(moduleSpec)) return false;
  const path = moduleSpec.text;
  return path === '@src/constants/Theme' || path === '@src/shared/constants/Theme';
}

function getImportName(node) {
  if (!ts.isImportDeclaration(node)) return null;
  const clause = node.importClause;
  if (!clause) return null;
  const named = clause.namedBindings;
  if (named && ts.isNamedImports(named)) {
    for (const el of named.elements) {
      if (el.name.text === 'Theme') return el.propertyName?.text || el.name.text;
    }
  }
  if (clause.name && clause.name.text === 'Theme') return clause.name.text;
  return null;
}

function isInsideFunction(node) {
  let current = node.parent;
  while (current) {
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isFunctionExpression(current) ||
      ts.isArrowFunction(current) ||
      ts.isMethodDeclaration(current) ||
      ts.isConstructorDeclaration(current) ||
      ts.isGetAccessorDeclaration(current) ||
      ts.isSetAccessorDeclaration(current)
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

let importName = null;
ts.forEachChild(sourceFile, (node) => {
  if (isThemeImport(node)) {
    importName = getImportName(node);
  }
});

console.log('importName', importName);

function visit(node) {
  let expr = null;
  if (ts.isPropertyAccessExpression(node)) {
    expr = node;
  } else if (ts.isElementAccessExpression(node)) {
    expr = node;
  }

  if (expr) {
    let root = expr;
    const chain = [];
    while (ts.isPropertyAccessExpression(root)) {
      chain.unshift(root.name.text);
      root = root.expression;
    }
    while (ts.isElementAccessExpression(root)) {
      chain.unshift('[]');
      root = root.expression;
    }
    if (ts.isIdentifier(root) && root.text === importName) {
      const hasColorProp = chain.some(p => COLOR_PROPS.has(p));
      console.log('Found Theme usage:', chain.join('.'), 'hasColorProp:', hasColorProp, 'insideFunction:', isInsideFunction(node));
    }
  }

  ts.forEachChild(node, visit);
}

visit(sourceFile);
