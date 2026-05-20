#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const APP_JSON_PATH = path.join(ROOT_DIR, 'app.json');

function readJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function isValidVersion(version) {
  return /^\d+\.\d+\.\d+$/.test(version);
}

function incrementVersion(version, type) {
  const parts = version.split('.').map(Number);
  const [major, minor, patch] = parts;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Unknown bump type: ${type}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  let bumpType = 'patch';
  let createTag = false;

  for (const arg of args) {
    if (arg === '--tag') {
      createTag = true;
    } else if (!arg.startsWith('--')) {
      bumpType = arg;
    }
  }

  if (!fs.existsSync(PACKAGE_JSON_PATH)) {
    console.error('Error: package.json not found');
    process.exit(1);
  }

  if (!fs.existsSync(APP_JSON_PATH)) {
    console.error('Error: app.json not found');
    process.exit(1);
  }

  const packageJson = readJson(PACKAGE_JSON_PATH);
  const appJson = readJson(APP_JSON_PATH);

  const oldVersion = packageJson.version;

  if (!oldVersion) {
    console.error('Error: package.json does not have a version');
    process.exit(1);
  }

  let newVersion;

  if (isValidVersion(bumpType)) {
    newVersion = bumpType;
  } else if (['patch', 'minor', 'major'].includes(bumpType)) {
    if (!isValidVersion(oldVersion)) {
      console.error(`Error: current version "${oldVersion}" is not a valid semver`);
      process.exit(1);
    }
    newVersion = incrementVersion(oldVersion, bumpType);
  } else {
    console.error(`Error: invalid argument "${bumpType}". Use patch, minor, major, or a specific version (e.g. 2.10.0)`);
    process.exit(1);
  }

  packageJson.version = newVersion;

  if (appJson.expo) {
    appJson.expo.version = newVersion;
  } else {
    appJson.version = newVersion;
  }

  writeJson(PACKAGE_JSON_PATH, packageJson);
  writeJson(APP_JSON_PATH, appJson);

  console.log(`Version updated: ${oldVersion} -> ${newVersion}`);

  if (createTag) {
    const { execSync } = require('child_process');
    const tagName = `v${newVersion}`;
    try {
      execSync(`git tag -a ${tagName} -m "Release ${tagName}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log(`Git tag created: ${tagName}`);
    } catch (err) {
      console.error(`Failed to create git tag: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
