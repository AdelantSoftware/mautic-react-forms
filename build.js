// Set environment variable
process.env.NODE_ENV = "production";

const externals = ["react-dom", "react", "next", "typescript"];
const banner = '"use client"';

// ESM Build
console.log("Building ESM version...");
const esm = Bun.spawn({
  cmd: [
    "bun",
    "build",
    "./src/index.ts",
    "--outdir",
    "dist",
    "--format",
    "esm",
    ...externals.flatMap((ext) => ["--external", ext]),
    "--banner",
    banner,
  ],
  stdout: "inherit",
  stderr: "inherit",
  env: {
    NODE_ENV: "production",
  },
});

await esm.exited;

// CJS Build
console.log("Building CJS version...");
const cjs = Bun.spawn({
  cmd: [
    "bun",
    "build",
    "./src/index.ts",
    "--outfile",
    "./dist/index.cjs",
    "--format",
    "cjs",
    ...externals.flatMap((ext) => ["--external", ext]),
    "--banner",
    banner,
  ],
  stdout: "inherit",
  stderr: "inherit",
  env: {
    NODE_ENV: "production",
  },
});

await cjs.exited;

// TypeScript declarations
console.log("Generating TypeScript declarations...");
const tsc = Bun.spawn({
  cmd: ["tsc", "--emitDeclarationOnly"],
  stdout: "inherit",
  stderr: "inherit",
});

await tsc.exited;

console.log("Build completed!");
