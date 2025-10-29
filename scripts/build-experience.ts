#!/usr/bin/env zx

import path from "node:path";
import process from "node:process";
import { $ } from "zx";

const cwd = process.cwd();
const project = path.basename(cwd);
const output = `../../dist/packages/${project}/bundle.ts`;

// We use esbuild to bundle the initial output
await $`esbuild --bundle --format=esm --outfile='${output}' ./src/index.ts`;

// Due to changes in the Portal scripting, @ts-nocheck directives do not work anymore
// We solve type errors with a simple jscodeshift transformer
await $`jscodeshift -t ../../scripts/typescript-transformer.ts '${output}'`;

// Some type errors to the mod API are not easily fixed with simple type
// annotations, so we relax its types too.
await $`sed -i '1i\\declare const mod: any;' '${output}'`;

// Add some build metadata for easier build identification
const date = new Date().toISOString();
await $`sed -i '1i\\// Build date: ${date}' '${output}'`;

