#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const version = process.argv[2];
if (!version || !/^\d+\.\d+$/.test(version)) {
  console.error('Usage: npm run docs:snapshot <version>');
  console.error('Example: npm run docs:snapshot 2.0');
  process.exit(1);
}

const docsDir = path.join(rootDir, 'src/content/docs/docs');
const idDocsDir = path.join(rootDir, 'src/content/docs/id/docs');
const targetDocsDir = path.join(docsDir, version);
const targetIdDocsDir = path.join(idDocsDir, version);

if (fs.existsSync(targetDocsDir) || fs.existsSync(targetIdDocsDir)) {
  console.error(`Error: Version ${version} already exists.`);
  process.exit(1);
}

function copyDocs(src, dest, isId = false) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    // Skip version directories (e.g. 2.0, 2.1)
    if (entry.isDirectory() && /^\d+\.\d+$/.test(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDocs(srcPath, destPath, isId);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        let content = fs.readFileSync(srcPath, 'utf-8');
        // Fix relative image links by adding one extra parent level '../'
        // In EN docs, assets were at ../../../../assets; in versioned docs they are at ../../../../../assets
        // In ID docs, assets were at ../../../../../assets; in versioned ID docs they are at ../../../../../../assets
        if (isId) {
          content = content.replace(
            /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/assets\//g,
            '../../../../../../assets/',
          );
        } else {
          content = content.replace(/\.\.\/\.\.\/\.\.\/\.\.\/assets\//g, '../../../../../assets/');
        }
        fs.writeFileSync(destPath, content, 'utf-8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log(`Snapshotting documentation version ${version}...`);
copyDocs(docsDir, targetDocsDir, false);
console.log(`Created ${path.relative(rootDir, targetDocsDir)}`);
copyDocs(idDocsDir, targetIdDocsDir, true);
console.log(`Created ${path.relative(rootDir, targetIdDocsDir)}`);

// Update src/lib/versions.ts
const versionsFile = path.join(rootDir, 'src/lib/versions.ts');
let versionsContent = fs.readFileSync(versionsFile, 'utf-8');

if (!versionsContent.includes(`slug: '${version}'`)) {
  versionsContent = versionsContent.replace(
    /export const VERSIONS: DocVersion\[\] = \[([\s\S]*?)\];/,
    (_, p1) => {
      const trimmed = p1.trim();
      const newEntry = `  { slug: '${version}', label: '${version}', isLatest: false },`;
      return `export const VERSIONS: DocVersion[] = [\n  ${trimmed}\n${newEntry}\n];`;
    },
  );
  fs.writeFileSync(versionsFile, versionsContent, 'utf-8');
  console.log(`Registered version ${version} in src/lib/versions.ts`);
}

console.log(`Done snapshotting version ${version}.`);
