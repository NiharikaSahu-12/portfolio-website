// Temporary: finds colour opacity modifiers whose value is not on Tailwind's
// default opacity scale (multiples of 5) and not an arbitrary [...] value.
// Those silently produce no CSS, or break `@apply` with a build error.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const targets = [];

(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx?|css)$/.test(entry.name)) targets.push(full);
  }
})(join(root, "src"));

targets.push(join(root, "index.html"));

const offenders = new Map();

for (const file of targets) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    // e.g. ink/12, cream/45, ink/[0.035]
    const re = /\/(\d{1,3})(?![\d.\w\]]|\/)/g;
    let match;
    while ((match = re.exec(line)) !== null) {
      const value = Number(match[1]);
      if (value > 100 || value % 5 !== 0) {
        const key = `${file.replace(root, "")}:${index + 1}`;
        if (!offenders.has(key)) offenders.set(key, []);
        offenders.get(key).push(match[0] + ` (from "${line.trim().slice(0, 90)}")`);
      }
    }
  });
}

if (offenders.size === 0) {
  console.log("No off-scale opacity modifiers found.");
} else {
  for (const [location, hits] of offenders) {
    console.log(`${location}  ->  ${hits.join(" | ")}`);
  }
}
console.log(`\nScanned ${targets.length} files. Offending files: ${offenders.size}`);
