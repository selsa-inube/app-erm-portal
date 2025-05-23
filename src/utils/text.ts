export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function capitalizeWords(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
