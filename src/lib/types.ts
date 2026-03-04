export type AttemptOutcome = "correct" | "close" | "incorrect";

export type SpeakingCard = {
  id: string;
  hanzi: string;
  englishAnswer: string;
  acceptedEnglishAnswers: string[];
};

export type AttemptEvaluation = {
  transcript: string;
  normalizedTranscript: string;
  outcome: AttemptOutcome;
  matchedAnswer: string | null;
};

