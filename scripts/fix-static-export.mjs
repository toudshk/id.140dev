/**
 * REG.RU блокирует /_next/, /n140/ и часто всю вложенную static/.
 * Выносим ассеты в корень: /css/, /js/, /media/ — как noise.svg.
 */
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "out");
const STATIC = path.join(OUT, "_next", "static");
const TEXT_EXT = new Set([".html", ".js", ".css", ".txt", ".json"]);

const REPLACEMENTS = [
  ["/_next/static/chunks/", "/js/"],
  ["/_next/static/css/", "/css/"],
  ["/_next/static/media/", "/media/"],
  ["/n140/static/chunks/", "/js/"],
  ["/n140/static/css/", "/css/"],
  ["/n140/static/media/", "/media/"],
  ["/assets/static/chunks/", "/js/"],
  ["/assets/static/css/", "/css/"],
  ["/assets/static/media/", "/media/"],
  // RSC payload and runtime still reference bare static/* after _next is removed
  ["static/chunks/", "/js/"],
  ["static/css/", "/css/"],
  ["static/media/", "/media/"]
];

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, onFile);
    else onFile(full);
  }
}

function rmDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

if (!fs.existsSync(STATIC)) {
  console.error("_next/static not found — run next build first");
  process.exit(1);
}

rmDir(path.join(OUT, "css"));
rmDir(path.join(OUT, "js"));
rmDir(path.join(OUT, "media"));

copyDir(path.join(STATIC, "css"), path.join(OUT, "css"));
copyDir(path.join(STATIC, "chunks"), path.join(OUT, "js"));

if (fs.existsSync(path.join(STATIC, "media"))) {
  copyDir(path.join(STATIC, "media"), path.join(OUT, "media"));
}

for (const entry of fs.readdirSync(STATIC, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (["css", "chunks", "media"].includes(entry.name)) continue;
  copyDir(path.join(STATIC, entry.name), path.join(OUT, "js", entry.name));
}

let filesPatched = 0;

walk(OUT, (file) => {
  if (path.dirname(file).includes(`${path.sep}_next${path.sep}`)) return;
  if (path.dirname(file).includes(`${path.sep}n140${path.sep}`)) return;
  if (!TEXT_EXT.has(path.extname(file))) return;

  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const [from, to] of REPLACEMENTS) {
    if (!content.includes(from)) continue;
    content = content.replaceAll(from, to);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    filesPatched++;
  }
});

rmDir(path.join(OUT, "_next"));
rmDir(path.join(OUT, "n140"));
rmDir(path.join(OUT, "assets"));

console.log(
  `fix-static-export: css/ js/ media/ at site root, patched ${filesPatched} files`
);
