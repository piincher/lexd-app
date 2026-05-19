import React from "react";
import { Text, TextStyle } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";

interface HighlightTextProps {
  text: string;
  query: string;
  style?: TextStyle;
  highlightStyle?: TextStyle;
  numberOfLines?: number;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text, query, style, highlightStyle, numberOfLines,
}) => {
  const { colors } = useAppTheme();
  const segments = useSearchHighlight(text, query);

  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {segments.map((seg, i) => (
        <Text
          key={i}
          style={seg.isMatch
            ? [style, { backgroundColor: `${colors.primary.main}30`, color: colors.primary.dark }, highlightStyle]
            : style
          }
        >
          {seg.text}
        </Text>
      ))}
    </Text>
  );
};
