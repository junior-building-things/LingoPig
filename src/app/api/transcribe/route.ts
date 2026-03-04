import { NextResponse } from "next/server";
import { currentDeck } from "@/lib/deck";
import { gradeEnglishAttempt } from "@/lib/grading";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not set. Add it in .env.local before using speech checks."
      },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const audio = formData.get("audio");
  const cardId = formData.get("cardId");

  if (!(audio instanceof File) || typeof cardId !== "string") {
    return NextResponse.json(
      { error: "The request must include an audio file and a cardId." },
      { status: 400 }
    );
  }

  const card = currentDeck.find((entry) => entry.id === cardId);

  if (!card) {
    return NextResponse.json(
      { error: "The selected practice card was not found." },
      { status: 404 }
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append("file", audio, audio.name || "attempt.webm");
  upstreamFormData.append("model", "gpt-4o-transcribe");
  upstreamFormData.append("language", "en");
  upstreamFormData.append("response_format", "json");

  const transcriptionResponse = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      body: upstreamFormData,
      cache: "no-store"
    }
  );

  const payload = (await transcriptionResponse.json().catch(() => null)) as
    | { text?: string; error?: { message?: string } }
    | null;

  if (!transcriptionResponse.ok) {
    return NextResponse.json(
      {
        error:
          payload?.error?.message ||
          "The transcription provider returned an error."
      },
      { status: 502 }
    );
  }

  const transcript = (payload?.text || "").trim();

  if (!transcript) {
    return NextResponse.json(
      {
        error: "No speech was detected. Try recording again.",
        code: "NO_SPEECH_DETECTED"
      },
      { status: 422 }
    );
  }

  const result = gradeEnglishAttempt(transcript, card.acceptedEnglishAnswers);

  return NextResponse.json(result);
}
