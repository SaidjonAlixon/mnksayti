import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { build } from "esbuild";

globalThis.require = createRequire(import.meta.url);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const staticSrc = path.join(root, "artifacts/mnk-logistics/dist/public");
const outputRoot = path.join(root, ".vercel/output");
const staticOut = path.join(outputRoot, "static");
const funcDir = path.join(outputRoot, "functions", "api.func");
const shim = path.join(root, "scripts/import-meta-url-shim.cjs");

if (!existsSync(staticSrc)) {
  throw new Error(`Frontend build missing: ${staticSrc}`);
}

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(staticOut, { recursive: true });
mkdirSync(funcDir, { recursive: true });

cpSync(staticSrc, staticOut, { recursive: true });

await build({
  entryPoints: [path.join(root, "artifacts/api-server/src/vercel-handler.ts")],
  outfile: path.join(funcDir, "index.js"),
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  logLevel: "info",
  inject: [shim],
  define: {
    "import.meta.url": "import_meta_url",
  },
  footer: {
    js: `
const __mod = module.exports;
module.exports = __mod.default ?? __mod;
if (__mod.config) module.exports.config = __mod.config;
`,
  },
});

writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.js",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
      maxDuration: 60,
      memory: 1024,
    },
    null,
    2,
  ) + "\n",
);

writeFileSync(
  path.join(outputRoot, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "^/api(?:/(.*))?$", dest: "/api" },
        { src: "^/(.*)$", dest: "/index.html" },
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log("Vercel Build Output API ready:", path.relative(root, outputRoot));
