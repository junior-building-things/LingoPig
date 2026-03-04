import type { SpeakingCard } from "@/lib/types";

export const currentDeck: SpeakingCard[] = [
  {
    id: "hello",
    hanzi: "你好",
    englishAnswer: "Hello",
    acceptedEnglishAnswers: ["hello", "hi"]
  },
  {
    id: "thank-you",
    hanzi: "谢谢",
    englishAnswer: "Thank you",
    acceptedEnglishAnswers: ["thank you", "thanks"]
  },
  {
    id: "sorry",
    hanzi: "对不起",
    englishAnswer: "I'm sorry",
    acceptedEnglishAnswers: ["im sorry", "i am sorry", "sorry"]
  },
  {
    id: "good-morning",
    hanzi: "早上好",
    englishAnswer: "Good morning",
    acceptedEnglishAnswers: ["good morning", "morning"]
  },
  {
    id: "dont-understand",
    hanzi: "我听不懂",
    englishAnswer: "I don't understand",
    acceptedEnglishAnswers: [
      "i dont understand",
      "i do not understand",
      "i dont get it"
    ]
  },
  {
    id: "repeat",
    hanzi: "请再说一遍",
    englishAnswer: "Please say that again",
    acceptedEnglishAnswers: [
      "please say that again",
      "say that again please",
      "please repeat that"
    ]
  }
];

