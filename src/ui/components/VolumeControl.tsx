import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { cfg, mutateCfg } from "../../config";
import { setPreviewVolume } from "../playback";

/** Always-visible master control for sample preview volume. */
export default function VolumeControl() {
  const [volume, setVolume] = useState(cfg().volume);

  function changeVolume(value: number) {
    const nextVolume = Math.max(0, Math.min(1, value));
    setVolume(nextVolume);
    setPreviewVolume(nextVolume);
    void mutateCfg({ volume: nextVolume }).catch(err => {
      console.error("Failed to save preview volume:", err);
    });
  }

  return (
    <div className="fixed bottom-5 right-6 z-40 flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 shadow-lg">
      {volume === 0
        ? <VolumeX className="size-4 shrink-0 text-muted" />
        : <Volume2 className="size-4 shrink-0 text-muted" />}
      <label className="sr-only" htmlFor="preview-volume">Preview volume</label>
      <input
        id="preview-volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={event => changeVolume(Number(event.target.value))}
        aria-label="Preview volume"
        title={`Preview volume: ${Math.round(volume * 100)}%`}
        className="w-28 accent-[var(--accent)] cursor-pointer"
      />
      <output className="w-9 text-right text-xs tabular-nums text-muted" htmlFor="preview-volume">
        {Math.round(volume * 100)}%
      </output>
    </div>
  );
}
