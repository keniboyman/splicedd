import React from "react";

/**
 * Represents a shared audio context.
 */
export interface SamplePlaybackContext {
  cancellation: SamplePlaybackCancellation | null;
  setCancellation: React.Dispatch<React.SetStateAction<SamplePlaybackCancellation | null>>;
}

/**
 * Represents a function that can signal to the current owner of a given context to
 * give up control over said context.
 */
export type SamplePlaybackCancellation = () => void;

let previewVolume = 1;
const previewAudioElements = new Set<HTMLAudioElement>();

/** Set the master volume and apply it immediately to existing sample previews. */
export function setPreviewVolume(volume: number) {
  previewVolume = Math.max(0, Math.min(1, Number.isFinite(volume) ? volume : 1));
  for (const audio of previewAudioElements) {
    audio.volume = previewVolume;
  }
}

/** Register a sample preview audio element for master-volume updates. */
export function registerPreviewAudio(audio: HTMLAudioElement) {
  previewAudioElements.add(audio);
  audio.volume = previewVolume;
  return () => previewAudioElements.delete(audio);
}
