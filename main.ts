// One Line, Best Line — make.fun entry.
// Writes the entry line (exactly one line of text) to /output/entry.txt.
// Node standard library only; deterministic: same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I waved back at a mannequin in a shop window today, and the worst part is that the mannequin started it.";

// The line, chosen by criteria critique over 9 rivals (see
// ../candidates.md): it stops the scroll in its first six words
// ("I waved back at a mannequin"), stays a single sentence, and saves
// its turn for the final clause — the mannequin started it.

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-240
// characters, on a single line, and not only whitespace. A carriage
// return would also break the one-line promise on some readers, so
// reject it too rather than trusting the "\n" check alone.
if (
  LINE.length < 1 ||
  LINE.length > 240 ||
  LINE.includes("\n") ||
  LINE.includes("\r") ||
  !LINE.trim()
) {
  throw new Error("entry line violates the gate constraints");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
