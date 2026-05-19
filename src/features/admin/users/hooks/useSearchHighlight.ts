import { useMemo } from "react";

/**
 * Split text into matching and non-matching segments for search highlighting.
 */
export const useSearchHighlight = (text: string, query: string) => {
  return useMemo(() => {
    if (!query.trim()) return [{ text, isMatch: false }];
    const lowerQuery = query.toLowerCase().trim();
    const lowerText = text.toLowerCase();
    const segments: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery);

    while (index !== -1) {
      if (index > lastIndex) {
        segments.push({ text: text.slice(lastIndex, index), isMatch: false });
      }
      segments.push({ text: text.slice(index, index + lowerQuery.length), isMatch: true });
      lastIndex = index + lowerQuery.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }

    if (lastIndex < text.length) {
      segments.push({ text: text.slice(lastIndex), isMatch: false });
    }

    return segments;
  }, [text, query]);
};
