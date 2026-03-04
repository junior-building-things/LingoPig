# LingoPig

## Project Identity
- App name: LingoPig
- Workspace path: `/Users/bytedance/Documents/Personal/Coding/lingo-pig`
- Product type: mobile-first web app

## Current MVP
- Show a Chinese phrase or sentence as the prompt
- Let the user press and hold a microphone button, speak the English translation aloud, and release to stop recording
- Send the captured audio through a speech-to-text model (for example `gpt-4o-transcribe`) to check what was spoken
- Compare the spoken result against the target English translation and return simple feedback such as success (`Great job`) or retry (`Try again`)
- Provide a clear way to move to the next phrase in the practice deck
- Keep the UX optimized for mobile web before expanding scope

## Working Assumptions
- The core loop is spoken translation recall: the user reads Chinese and must produce the English equivalent out loud
- Speech recognition quality and tolerant English answer matching matter more than passive flashcard behavior
- The user is assumed to already be native or highly fluent in Chinese, so Chinese audio playback is not a useful helper for the MVP
- The main helper should be revealing the English translation text; the learner can still use that revealed answer to practice speaking it out loud

## Initial Scaffold
- Frontend/runtime scaffold: Next.js app-router project with React 19 and TypeScript
- Main MVP screen is implemented as a mobile-first single-screen practice flow in `src/components/practice-session.tsx`
- Starter content is a static deck in `src/lib/deck.ts`
- Speech checking is wired through a server route at `src/app/api/transcribe/route.ts`
- The server route calls OpenAI transcription with `gpt-4o-transcribe`, locked to English transcription (`language=en`)
- Answer grading is deterministic and local via normalization plus tolerant edit-distance matching in `src/lib/grading.ts`
- MVP helpers currently include English reveal, reset card, and next phrase navigation

## Deployment Notes
- A preview deployment was created via the Vercel deploy skill fallback flow
- The fallback deploy script can exceed the upload limit if `.next` is present locally; package a tarball that excludes `.next` before using the claim-based deploy endpoint
- Going forward, the intended deployment workflow is GitHub-driven: push changes to `main` on `origin`, and let Vercel auto-deploy from the connected repo once Git integration is configured
- Added a repo-level `vercel.json` to force the `nextjs` framework preset and clear a bad Output Directory override after Vercel reported `No Output Directory named "public" found`

## Git Notes
- The project now has its own local git repository initialized on `main`
- Initial commit: `6e6c138` (`Initial LingoPig MVP scaffold`)
- GitHub remote: `https://github.com/junior-building-things/LingoPig`
- `main` is pushed and tracking `origin/main`
