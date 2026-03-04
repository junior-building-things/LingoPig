import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceFileName = "hsk1-phrases.csv";
const sourcePath = path.join(projectRoot, sourceFileName);
const outputPath = path.join(projectRoot, "src", "lib", "deck.ts");

const extraAcceptedAnswersByHanzi = {
  "你好": ["hi", "hey", "yo"]
};

function splitEnglishVariants(english) {
  return english
    .split(/[;/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parsePhrasesCsv(rawCsv) {
  const normalizedCsv = rawCsv.replace(/^\uFEFF/, "");
  const lines = normalizedCsv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.slice(1).map((line, index) => {
    const [hanziRaw, pinyinRaw, ...englishParts] = line.split(",");
    const hanzi = (hanziRaw || "").trim();
    const pinyin = (pinyinRaw || "").trim();
    const english = englishParts.join(",").trim();

    if (!hanzi || !english) {
      throw new Error(
        `Invalid ${sourceFileName} row ${index + 2}: expected Chinese, Pinyin, English.`
      );
    }

    return {
      hanzi,
      pinyin,
      english
    };
  });
}

function buildDeckModule(rows) {
  const serializedRows = rows
    .map(
      (row) =>
        `  {\n    hanzi: ${JSON.stringify(row.hanzi)},\n    pinyin: ${JSON.stringify(row.pinyin)},\n    english: ${JSON.stringify(row.english)}\n  }`
    )
    .join(",\n");
  const serializedExtraAcceptedAnswers = JSON.stringify(
    extraAcceptedAnswersByHanzi,
    null,
    2
  );

  return `import type { SpeakingCard } from "@/lib/types";

type PhraseRow = {
  hanzi: string;
  pinyin: string;
  english: string;
};

const phraseRows: PhraseRow[] = [
${serializedRows}
];

const extraAcceptedAnswersByHanzi: Record<string, string[]> = ${serializedExtraAcceptedAnswers};

function splitEnglishVariants(english: string) {
  return english
    .split(/[;/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function expandAcceptedEnglishAnswers(
  english: string,
  extraAnswers: string[] = []
) {
  const variants = new Set<string>();
  const baseVariants = splitEnglishVariants(english);

  if (!baseVariants.length) {
    const normalizedEnglish = english.trim();

    if (normalizedEnglish) {
      variants.add(normalizedEnglish);
    }
  }

  for (const variant of baseVariants) {
    variants.add(variant);
  }

  for (const extraAnswer of extraAnswers
    .map((answer) => answer.trim())
    .filter(Boolean)) {
    variants.add(extraAnswer);
  }

  return Array.from(variants);
}

export const currentDeck: SpeakingCard[] = phraseRows.map((row, index) => ({
  id: \`phrase-\${String(index + 1).padStart(3, "0")}\`,
  hanzi: row.hanzi,
  pinyin: row.pinyin,
  englishAnswer: splitEnglishVariants(row.english)[0] || row.english.trim(),
  acceptedEnglishAnswers: expandAcceptedEnglishAnswers(
    row.english,
    extraAcceptedAnswersByHanzi[row.hanzi] || []
  )
}));
`;
}

async function main() {
  const rawCsv = await readFile(sourcePath, "utf8");
  const rows = parsePhrasesCsv(rawCsv);
  const deckModule = buildDeckModule(rows);

  await writeFile(outputPath, deckModule, "utf8");

  console.log(
    `Synced ${rows.length} phrases from ${sourceFileName} to src/lib/deck.ts`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
