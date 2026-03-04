import type { AttemptEvaluation, AttemptOutcome } from "@/lib/types";

export function normalizeEnglishAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(value: string) {
  return value.replace(/\s+/g, "");
}

function levenshteinDistance(left: string, right: string) {
  if (left === right) {
    return 0;
  }

  if (!left.length) {
    return right.length;
  }

  if (!right.length) {
    return left.length;
  }

  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const substitutionCost = left[row - 1] === right[col - 1] ? 0 : 1;

      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + substitutionCost
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function chooseOutcome(distance: number, targetLength: number): AttemptOutcome {
  const closeThreshold = Math.max(1, Math.floor(targetLength * 0.18));

  if (distance <= closeThreshold) {
    return "close";
  }

  return "incorrect";
}

export function gradeEnglishAttempt(
  transcript: string,
  acceptedAnswers: string[]
): AttemptEvaluation {
  const normalizedTranscript = normalizeEnglishAnswer(transcript);
  const transcriptCompact = compact(normalizedTranscript);

  const normalizedAnswers = acceptedAnswers
    .map((answer) => normalizeEnglishAnswer(answer))
    .filter(Boolean);

  const exactMatch = normalizedAnswers.find(
    (answer) => answer === normalizedTranscript
  );

  if (exactMatch) {
    return {
      transcript,
      normalizedTranscript,
      outcome: "correct",
      matchedAnswer: exactMatch
    };
  }

  let bestAnswer: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const answer of normalizedAnswers) {
    const candidateDistance = levenshteinDistance(transcriptCompact, compact(answer));

    if (candidateDistance < bestDistance) {
      bestDistance = candidateDistance;
      bestAnswer = answer;
    }
  }

  if (!bestAnswer) {
    return {
      transcript,
      normalizedTranscript,
      outcome: "incorrect",
      matchedAnswer: null
    };
  }

  return {
    transcript,
    normalizedTranscript,
    outcome: chooseOutcome(bestDistance, compact(bestAnswer).length),
    matchedAnswer: bestAnswer
  };
}

