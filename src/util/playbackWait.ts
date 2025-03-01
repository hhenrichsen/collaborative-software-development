import { useScene, PlaybackState, waitFor } from "@motion-canvas/core";

export function* playbackWait(duration: number) {
  if (useScene().playback.state !== PlaybackState.Presenting) {
    yield* waitFor(duration);
  }
}