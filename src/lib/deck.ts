import type { SpeakingCard } from "@/lib/types";

type PhraseRow = {
  hanzi: string;
  pinyin: string;
  english: string;
};

const phraseRows: PhraseRow[] = [
  {
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    english: "hello; hi; hey"
  },
  {
    hanzi: "谢谢",
    pinyin: "xièxie",
    english: "thank you; thanks; thank you very much"
  },
  {
    hanzi: "再见",
    pinyin: "zàijiàn",
    english: "goodbye; bye; see you; see you later"
  },
  {
    hanzi: "是",
    pinyin: "shì",
    english: "to be; yes; is; are; am"
  },
  {
    hanzi: "不",
    pinyin: "bù",
    english: "no; not"
  },
  {
    hanzi: "我",
    pinyin: "wǒ",
    english: "I; me"
  },
  {
    hanzi: "你",
    pinyin: "nǐ",
    english: "you"
  },
  {
    hanzi: "他",
    pinyin: "tā",
    english: "he; him"
  },
  {
    hanzi: "水",
    pinyin: "shuǐ",
    english: "water; drinking water"
  },
  {
    hanzi: "吃",
    pinyin: "chī",
    english: "to eat; eat; have a meal"
  }
];

const extraAcceptedAnswersByHanzi: Record<string, string[]> = {
  "你好": [
    "hi",
    "hey",
    "yo"
  ]
};

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
  id: `phrase-${String(index + 1).padStart(3, "0")}`,
  hanzi: row.hanzi,
  pinyin: row.pinyin,
  englishAnswer: splitEnglishVariants(row.english)[0] || row.english.trim(),
  acceptedEnglishAnswers: expandAcceptedEnglishAnswers(
    row.english,
    extraAcceptedAnswersByHanzi[row.hanzi] || []
  )
}));
