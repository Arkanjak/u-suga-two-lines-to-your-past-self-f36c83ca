// Two Lines to Your Past Self — make.fun entry (program/v1).
//
// Writes exactly two lines to /output/entry.txt:
//   line 1 — a warning to the writer's past self about one specific moment;
//   line 2 — one sentence on why that moment mattered and what changed.
// The text is a constant embedded in this file: no file reads, no network,
// no environment secrets, so the program behaves identically from any cwd.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = [
  "Don't eat that last slice of pizza at 2 a.m. the night before your driving test, no matter how good it smells.",
  "The food poisoning kept you in bed, and the six-month wait for the next slot is why you still take the bus today.",
].join("\n");

function main(): void {
  // Gate (from RULES.txt): UTF-8 text of 1 to 280 characters, not only
  // whitespace, exactly two lines, one sentence each.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`entry is ${chars} characters, outside the 1-280 gate`);
  }
  const lines = ENTRY.split("\n");
  if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
    throw new Error("entry must be exactly two non-empty lines");
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
