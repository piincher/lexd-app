import { useCallback } from "react";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

export const useSearchHighlight = (query: string) => {
  const { colors } = useAppTheme();
  const highlightStyle = {
    backgroundColor: colors.primary[200],
    color: colors.primary[800],
    fontWeight: "700" as const,
  };

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
