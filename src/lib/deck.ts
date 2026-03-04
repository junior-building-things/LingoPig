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
    english: "hello"
  },
  {
    hanzi: "谢谢",
    pinyin: "xièxie",
    english: "thank you"
  },
  {
    hanzi: "再见",
    pinyin: "zàijiàn",
    english: "goodbye"
  },
  {
    hanzi: "是",
    pinyin: "shì",
    english: "to be / yes"
  },
  {
    hanzi: "不",
    pinyin: "bù",
    english: "no / not"
  },
  {
    hanzi: "我",
    pinyin: "wǒ",
    english: "I / me"
  },
  {
    hanzi: "你",
    pinyin: "nǐ",
    english: "you"
  },
  {
    hanzi: "他",
    pinyin: "tā",
    english: "he / him"
  },
  {
    hanzi: "水",
    pinyin: "shuǐ",
    english: "water"
  },
  {
    hanzi: "吃",
    pinyin: "chī",
    english: "to eat"
  }
];

const extraAcceptedAnswersByHanzi: Record<string, string[]> = {
  "你好": [
    "hi",
    "hey",
    "yo"
  ]
};

function expandAcceptedEnglishAnswers(
  english: string,
  extraAnswers: string[] = []
) {
  const variants = new Set<string>();
  const normalizedEnglish = english.trim();

  if (normalizedEnglish) {
    variants.add(normalizedEnglish);
  }

  if (normalizedEnglish.includes("/")) {
    for (const variant of normalizedEnglish
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean)) {
      variants.add(variant);
    }
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
  englishAnswer: row.english,
  acceptedEnglishAnswers: expandAcceptedEnglishAnswers(
    row.english,
    extraAcceptedAnswersByHanzi[row.hanzi] || []
  )
}));
