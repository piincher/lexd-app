import { useCallback } from "react";
import { Text } from "react-native-paper";
import { Theme } from "@src/constants/Theme";

export const useSearchHighlight = (query: string) => {
  const highlightText = useCallback(
    (text: string) => {
      if (!query || !text) return text;

      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Text key={index} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          part
        )
      );
    },
    [query]
  );

  return highlightText;
};

const highlightStyle = {
  backgroundColor: Theme.primary[200],
  color: Theme.primary[800],
  fontWeight: "700" as const,
};
