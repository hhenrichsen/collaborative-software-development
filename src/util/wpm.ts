export function wpmDuration(text: string, wpm: number = 128): [string, number] {
  const cpm = wpm * 5;
  return [text, (text.length / cpm) * 60];
}
