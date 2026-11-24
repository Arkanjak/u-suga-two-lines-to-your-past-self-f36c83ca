// Two Lines to Your Past Self — make.fun entry (program/v3).
//
// Writes exactly two lines to /output/entry.txt:
//   line 1 — a warning to the writer's past self about one specific moment;
//   line 2 — one sentence on why that moment mattered and what changed.
// The text is a constant embedded in this file: no file reads, no network,
// no environment secrets, so the program behaves identically from any cwd.
//
// NOTE: the entry text itself is frozen — only the code around it changes.
// Any edit here must keep the written bytes identical (sha256
// 27db60232ee2b6866b1247c3b14b50012bb7735c137ee96ffd6a0833b6f4bce1).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The two lines, kept as separate constants so each can be read on its own.
const LINE_ONE =
  "Don't eat that last slice of pizza at 2 a.m. the night before your driving test, no matter how good it smells.";
const LINE_TWO =
  "The food poisoning kept you in bed, and the six-month wait for the next slot is why you still take the bus today.";

const ENTRY = [LINE_ONE, LINE_TWO].join("\n");

// Gate (from RULES.txt): UTF-8 text of 1 to 280 characters, not only
// whitespace, exactly two lines, one sentence each. A line counts as one
// sentence when it holds no inner newline and ends with a full stop.
function checkEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`entry is ${chars} characters, outside the 1-280 gate`);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const [index, line] of lines.entries()) {
    if (line.trim().length === 0) {
      throw new Error(`entry line ${index + 1} must not be empty`);
    }
    if (!line.endsWith(".")) {
      throw new Error(`entry line ${index + 1} must be a single sentence`);
    }
  }
}

function main(): void {
  checkEntry(ENTRY);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
