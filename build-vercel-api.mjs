import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

globalThis.require = createRequire(import.meta.url);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

await build({
  entryPoints: [path.join(root, "artifacts/api-server/src/vercel-handler.ts")],
  outfile: path.join(root, "api/index.js"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "info",
  banner: {
    js: `import { createRequire as __cr } from 'node:module';
import __path from 'node:path';
import __url from 'node:url';
globalThis.require = __cr(import.meta.url);
globalThis.__filename = __url.fileURLToPath(import.meta.url);
globalThis.__dirname = __path.dirname(globalThis.__filename);`,
  },
});

console.log("Vercel API bundle: api/index.js");
