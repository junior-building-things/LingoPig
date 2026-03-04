# LingoPig

LingoPig is a mobile-first web app for spoken English recall from Chinese prompts.

## Current MVP

- Show a Chinese phrase or sentence.
- Let the learner press and hold to record the English translation.
- Send the audio to OpenAI transcription (`gpt-4o-transcribe`).
- Compare the transcript against accepted English answers.
- Return simple feedback and let the learner move to the next phrase.

## Local Setup

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`.
3. Start the app:
   `npm run dev`

The microphone flow requires `https://` in production. `localhost` works for development.

## Notes

- This scaffold uses a conservative Next.js 15 dependency range and React 19 to stay aligned with the rest of the workspace.
- The starter deck is static and lives in `src/lib/deck.ts`.
- Matching is deterministic and tolerant, but it is still transcript-based, not true pronunciation scoring.

