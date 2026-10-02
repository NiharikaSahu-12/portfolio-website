// Temporary verification script:
//  1. every relative import in src/ resolves to a real file
//  2. every named react-icons import exists in the installed package
// Deleted after running — not part of the project.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const root = process.cwd();
const files = [];

(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx?|mjs)$/.test(entry.name)) files.push(full);
  }
})(join(root, "src"));

/* ---------- 1. relative imports ---------- */
const candidates = ["", ".jsx", ".js", ".mjs", ".png", ".svg", ".css", "/index.jsx", "/index.js"];
let brokenPaths = 0;

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const pattern = /from\s+["'](\.[^"']+)["']/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const target = resolve(dirname(file), match[1]);
    if (!candidates.some((ext) => existsSync(target + ext))) {
      console.log(`MISSING PATH   ${file.replace(root, "")}  ->  ${match[1]}`);
      brokenPaths += 1;
    }
  }
}

/* ---------- 2. react-icons named exports ---------- */
const packCache = new Map();
function exportsOf(pack) {
  if (packCache.has(pack)) return packCache.get(pack);
  const dts = join(root, "node_modules", "react-icons", pack, "index.d.ts");
  const names = new Set();
  if (existsSync(dts)) {
    const text = readFileSync(dts, "utf8");
    const re = /export declare const (\w+):/g;
    let m;
    while ((m = re.exec(text)) !== null) names.add(m[1]);
  } else {
    names.add("__PACK_NOT_INSTALLED__");
  }
  packCache.set(pack, names);
  return names;
}

let missingIcons = 0;
for (const file of files) {
  const source = readFileSync(file, "utf8");
  const re = /import\s*\{([^}]+)\}\s*from\s*["']react-icons\/(\w+)["']/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const pack = m[2];
    const available = exportsOf(pack);
    for (const raw of m[1].split(",")) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (!name) continue;
      if (!available.has(name)) {
        console.log(`MISSING ICON   ${file.replace(root, "")}  ->  ${pack}/${name}`);
        missingIcons += 1;
      }
    }
  }
}

console.log(
  `\nChecked ${files.length} modules | broken imports: ${brokenPaths} | missing icons: ${missingIcons}`
);
