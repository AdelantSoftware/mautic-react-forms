// Set environment variable
process.env.NODE_ENV = "production";

const externals = ["react-dom", "react", "next", "typescript"];
const banner = '"use client"';

// ESM Build
console.log("Building ESM version...");
await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  format: "esm",
  external: externals,
  banner: banner,
});

// CJS Build
console.log("Building CJS version...");
await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  naming: "[dir]/[name].cjs",
  format: "cjs",
  external: externals,
  banner: banner,
});

// TypeScript declarations
console.log("Generating TypeScript declarations...");
const tsc = Bun.spawn({
  cmd: ["./node_modules/.bin/tsc", "--emitDeclarationOnly"],
  stdout: "inherit",
  stderr: "inherit",
});

await tsc.exited;

console.log("Build completed!");
