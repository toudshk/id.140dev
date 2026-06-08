import { spawnSync } from "node:child_process";

process.env.STATIC_EXPORT = "1";

const build = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
  env: process.env
});

if (build.status !== 0) process.exit(build.status ?? 1);

const fix = spawnSync("node", ["scripts/fix-static-export.mjs"], {
  stdio: "inherit",
  shell: true,
  env: process.env
});

process.exit(fix.status ?? 0);
