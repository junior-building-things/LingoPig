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
- The current homepage flow does not expose the English answer as a reveal helper; the learner works from recall plus retry feedback

## Initial Scaffold
- Frontend/runtime scaffold: Next.js app-router project with React 19 and TypeScript
- Main MVP screen is implemented as a mobile-first single-screen practice flow in `src/components/practice-session.tsx`
- Phrase content now comes from `phrases.csv` (currently 100 rows), and `src/lib/deck.ts` is generated from that source
- Speech checking is wired through a server route at `src/app/api/transcribe/route.ts`
- The server route calls OpenAI transcription with `gpt-4o-transcribe`, locked to English transcription (`language=en`)
- Answer grading is deterministic and local via normalization plus tolerant edit-distance matching in `src/lib/grading.ts`
- MVP helpers currently include next phrase navigation
- `npm run sync:phrases` regenerates `src/lib/deck.ts`, but the sync is manual now; `dev`, `build`, and `typecheck` no longer run it automatically
- The app uses `lingo-pig-icon.png` for Next.js app icons and in the top-left header beside the product name
- The `LingoPig` wordmark now matches DictateAI's title styling: `SF Pro Display` with `font-weight: 700`
- The subtitle under the product name uses `SF Pro Display`, currently reads `Word and pronunciation practice`, and the two-line brand lockup is vertically centered against the `64x64` app logo
- The top-left LingoPig icon is larger than the initial version, is currently rendered at `64x64`, and now uses shadow only with no outline ring
- The homepage now uses two primary stacked cards: a `Chinese:` prompt card and an `English:` action card that contains a large circular microphone button using `microphone.png`
- The microphone glyph inside the circular button now fills the button with no intentional inset gap, and long-press recording adds a blue pulsing glow around the button
- The header no longer shows a top-right phrase counter
- The mic button disables iOS image callout/drag behavior on the mic asset so long-press is reserved for recording instead of image-save previews
- The recorder now preserves the browser's actual audio MIME type and file extension when uploading to the transcription endpoint, to avoid Safari/iPhone `unsupported or corrupted audio` errors from mismatched `.webm` uploads

## Deployment Notes
- A preview deployment was created via the Vercel deploy skill fallback flow
- The fallback deploy script can exceed the upload limit if `.next` is present locally; package a tarball that excludes `.next` before using the claim-based deploy endpoint
- Going forward, the intended deployment workflow is GitHub-driven: push changes to `main` on `origin`, and let Vercel auto-deploy from the connected repo once Git integration is configured
- Added a repo-level `vercel.json` to force the `nextjs` framework preset and clear a bad Output Directory override after Vercel reported `No Output Directory named "public" found`
- To reduce Vercel build risk, the automatic CSV sync step was removed from `npm run build`; deploys now use the checked-in generated deck unless `npm run sync:phrases` has been run and committed beforehand

## Git Notes
- The project now has its own local git repository initialized on `main`
- Initial commit: `6e6c138` (`Initial LingoPig MVP scaffold`)
- GitHub remote: `https://github.com/junior-building-things/LingoPig`
- `main` is pushed and tracking `origin/main`
