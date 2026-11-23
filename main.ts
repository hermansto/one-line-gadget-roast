import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const roast =
  "My smartwatch celebrates every time I stand up, like walking to the fridge is Olympic training.";

// Validate the entry before touching the output directory, so a bad
// line fails fast instead of leaving a partial entry.txt behind.
if (roast.includes("\n") || roast.includes("\r") || roast.length > 200) {
  throw new Error("roast line must be a single line of at most 200 characters");
}
if (roast.trim() !== roast || roast.length === 0) {
  throw new Error("roast line must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, roast, "utf8");

// Read it back and confirm the file on disk is byte-for-byte the line.
const written = readFileSync(outPath, "utf8");
if (written !== roast) {
  throw new Error("entry.txt does not match the roast line exactly");
}
console.log(`Wrote ${written.length}-character roast to ${outPath}`);
