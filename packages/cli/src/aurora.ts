#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function help() {
  console.log(`aurora (AuroraStack CLI)

Usage:
  aurora --help
  aurora init <dir> [--template app-basic]

Examples:
  aurora init my-app --template app-basic
`);
}

function copyDir(src: string, dst: string) {
  fs.mkdirSync(dst, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dst, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.length === 0) return help();

  const cmd = args[0];
  if (cmd !== 'init') {
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
  }

  const dir = args[1];
  if (!dir) {
    console.error('Missing <dir>');
    process.exit(1);
  }

  const tIndex = args.findIndex((a) => a === '--template');
  const template = tIndex >= 0 ? args[tIndex + 1] : 'app-basic';

  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const templatePath = path.join(repoRoot, 'templates', template);

  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    process.exit(1);
  }

  const out = path.resolve(process.cwd(), dir);
  if (fs.existsSync(out) && fs.readdirSync(out).length > 0) {
    console.error(`Directory not empty: ${out}`);
    process.exit(1);
  }

  copyDir(templatePath, out);

  console.log(`Initialized ${dir} from template ${template}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
