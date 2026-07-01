export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180)); // kb. 180 szó/perc magyar szövegre
  return minutes;
}
