import { readFileSync, rmSync } from "node:fs";

process.env.NODE_ENV = "production";

const externals = ["react-dom", "react", "next", "typescript"];
const banner = '"use client"';
const buildDefines = {
  "process.env.NODE_ENV": '"production"',
};

const assertNoJsxDevRuntime = () => {
  const bundlePaths = ["dist/index.js", "dist/index.cjs"];

  for (const bundlePath of bundlePaths) {
    const contents = readFileSync(bundlePath, "utf8");
    if (contents.includes("jsxDEV") || contents.includes("react/jsx-dev-runtime")) {
      throw new Error(
        `Build emitted development JSX runtime in ${bundlePath}. Ensure production JSX transform is used.`,
      );
    }
  }
};

rmSync("dist", { recursive: true, force: true });

console.log("Building ESM version...");
const esmBuild = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  format: "esm",
  external: externals,
  banner: banner,
  define: buildDefines,
  minify: true,
});

if (!esmBuild.success) {
  throw new Error("ESM build failed");
}

console.log("Building CJS version...");
const cjsBuild = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  naming: "[dir]/[name].cjs",
  format: "cjs",
  external: externals,
  banner: banner,
  define: buildDefines,
  minify: true,
});

if (!cjsBuild.success) {
  throw new Error("CJS build failed");
}

assertNoJsxDevRuntime();

console.log("Generating TypeScript declarations...");
const tsc = Bun.spawn({
  cmd: ["bun", "x", "tsc", "--emitDeclarationOnly"],
  stdout: "inherit",
  stderr: "inherit",
});

const tscExitCode = await tsc.exited;

if (tscExitCode !== 0) {
  throw new Error(`Declaration build failed with exit code ${tscExitCode}`);
}

console.log("Build completed!");
