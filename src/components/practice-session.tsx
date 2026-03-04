"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { currentDeck } from "@/lib/deck";
import type { AttemptEvaluation } from "@/lib/types";
import lingoPigIcon from "../../lingo-pig-icon.png";
import microphoneIcon from "../../microphone.png";

type SessionStatus = "idle" | "preparing" | "recording" | "submitting";

type ApiError = {
  error: string;
};

function getPreferredRecordingMimeType() {
  if (
    typeof MediaRecorder === "undefined" ||
    typeof MediaRecorder.isTypeSupported !== "function"
  ) {
    return "";
  }

  const supportedMimeType = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus"
  ].find((mimeType) => MediaRecorder.isTypeSupported(mimeType));

  return supportedMimeType || "";
}

function getAudioFileExtension(mimeType: string) {
  if (mimeType.includes("mp4")) {
    return "mp4";
  }

  if (mimeType.includes("ogg")) {
    return "ogg";
  }

  if (mimeType.includes("mpeg")) {
    return "mp3";
  }

  if (mimeType.includes("wav")) {
    return "wav";
  }

  return "webm";
}

function getStatusCopy(status: SessionStatus) {
  if (status === "preparing") {
    return "Press & hold to speak";
  }

  if (status === "recording") {
    return "Listening...";
  }

  if (status === "submitting") {
    return "Analyzing...";
  }

  return "Press & hold to speak";
}

function getFeedbackTitle(result: AttemptEvaluation) {
  if (result.outcome === "correct") {
    return "Great job";
  }

  if (result.outcome === "close") {
    return "Close";
  }

  return "Try again";
}

function getFeedbackCopy(result: AttemptEvaluation) {
  if (result.outcome === "correct") {
    return "That matched an accepted English answer. Move on when you are ready.";
  }

  if (result.outcome === "close") {
    return "You were close. Try it once more with clearer pronunciation or wording.";
  }

  return "That did not match yet. Take another shot and try again.";
}

export function PracticeSession() {
  const [cardIndex, setCardIndex] = useState(0);
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [feedback, setFeedback] = useState<AttemptEvaluation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const cancelOnStartRef = useRef(false);

  const currentCard = currentDeck[cardIndex];
  const hasAccessToMedia =
    typeof navigator !== "undefined" &&
    typeof window !== "undefined" &&
    "mediaDevices" in navigator &&
    typeof window.MediaRecorder !== "undefined";

  async function submitAttempt(blob: Blob, cardId: string, mimeType: string) {
    try {
      const normalizedMimeType = mimeType || blob.type || "audio/webm";
      const fileExtension = getAudioFileExtension(normalizedMimeType);
      const audioFile = new File([blob], `attempt.${fileExtension}`, {
        type: normalizedMimeType
      });
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append("cardId", cardId);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json().catch(() => null)) as
        | AttemptEvaluation
        | ApiError
        | null;

      if (!response.ok) {
        throw new Error(
          payload && "error" in payload
            ? payload.error
            : "We could not check that attempt."
        );
      }

      setFeedback(payload as AttemptEvaluation);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not check that attempt."
      );
    } finally {
      setStatus("idle");
    }
  }

  async function startRecording() {
    if (status !== "idle" || !hasAccessToMedia) {
      if (!hasAccessToMedia) {
        setErrorMessage(
          "This browser does not support microphone recording for the current MVP."
        );
      }

      return;
    }

    setErrorMessage(null);
    setFeedback(null);
    setStatus("preparing");
    cancelOnStartRef.current = false;

    try {
      const cardAtStart = currentCard;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredMimeType = getPreferredRecordingMimeType();
      const recorder = preferredMimeType
        ? new MediaRecorder(stream, { mimeType: preferredMimeType })
        : new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorderRef.current = recorder;
      streamRef.current = stream;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onerror = () => {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        setErrorMessage("Recording failed. Try again.");
        setStatus("idle");
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        const actualMimeType =
          recorder.mimeType ||
          chunks.find((chunk) => chunk.type)?.type ||
          preferredMimeType ||
          "audio/webm";

        const blob = new Blob(chunks, {
          type: actualMimeType
        });

        if (cancelOnStartRef.current && !blob.size) {
          cancelOnStartRef.current = false;
          setStatus("idle");
          return;
        }

        if (!blob.size) {
          setErrorMessage("No audio was captured. Try again.");
          setStatus("idle");
          return;
        }

        await submitAttempt(blob, cardAtStart.id, actualMimeType);
      };

      recorder.start();

      if (cancelOnStartRef.current) {
        setStatus("submitting");
        recorder.stop();
        return;
      }

      setStatus("recording");
    } catch (error) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      recorderRef.current = null;
      setStatus("idle");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Microphone access failed. Check permissions and try again."
      );
    }
  }

  function stopRecording() {
    if (status === "preparing") {
      cancelOnStartRef.current = true;
      return;
    }

    if (status !== "recording") {
      return;
    }

    const recorder = recorderRef.current;

    if (!recorder || recorder.state !== "recording") {
      return;
    }

    setStatus("submitting");
    recorder.stop();
  }

  function goToNextCard() {
    if (status !== "idle") {
      return;
    }

    setCardIndex((currentIndex) => (currentIndex + 1) % currentDeck.length);
    setFeedback(null);
    setErrorMessage(null);
  }

  const micButtonClassNames = [
    "mic-button",
    status === "recording" ? "mic-button--recording" : "",
    status === "submitting" || status === "preparing" ? "mic-button--busy" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const feedbackClassNames = [
    "feedback",
    feedback ? `feedback--${feedback.outcome}` : ""
  ]
    .filter(Boolean)
    .join(" ");

  const feedbackTitleClassNames = [
    "feedback-title",
    feedback ? `feedback-title--${feedback.outcome}` : ""
  ]
    .filter(Boolean)
    .join(" ");

  const nextButtonClassNames = [
    "next-button",
    feedback?.outcome === "correct" ? "next-button--earned" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="session">
      <header className="app-bar">
        <div className="brand">
          <Image
            src={lingoPigIcon}
            alt="LingoPig icon"
            className="brand-icon"
            width={64}
            height={64}
            priority
          />
          <div className="brand-lockup">
            <span className="brand-mark">LingoPig</span>
            <span className="brand-copy">Word and pronunciation practice</span>
          </div>
        </div>
      </header>

      <article className="prompt-card">
        <p className="card-title">Chinese</p>
        <p className="prompt-text">{currentCard.hanzi}</p>
      </article>

      <section className="helper-card">
        <div className="answer-card-head">
          <p className="card-title">English</p>
        </div>

        <p className="helper-text">{getStatusCopy(status)}</p>

        <button
          type="button"
          className={micButtonClassNames}
          aria-label="Press and hold to speak"
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            void startRecording();
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }

            stopRecording();
          }}
          onPointerCancel={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }

            stopRecording();
          }}
          onContextMenu={(event) => event.preventDefault()}
          disabled={!hasAccessToMedia || status === "submitting"}
        >
          <Image
            src={microphoneIcon}
            alt=""
            className="mic-icon"
            width={84}
            height={84}
            aria-hidden="true"
            draggable={false}
          />
        </button>
      </section>

      {feedback ? (
        <section className={feedbackClassNames}>
          <p className={feedbackTitleClassNames}>{getFeedbackTitle(feedback)}</p>
          <p className="feedback-copy">{getFeedbackCopy(feedback)}</p>
          <p className="transcript-label">We heard</p>
          <p className="transcript-text">{feedback.transcript}</p>
        </section>
      ) : null}

      {errorMessage ? (
        <section className="error-banner">
          <p className="label">Issue</p>
          <p className="error-copy">{errorMessage}</p>
        </section>
      ) : null}

      <div className="footer-actions">
        <button
          type="button"
          className={nextButtonClassNames}
          onClick={goToNextCard}
          disabled={status !== "idle"}
        >
          Next Phrase
        </button>
      </div>
    </section>
  );
}
