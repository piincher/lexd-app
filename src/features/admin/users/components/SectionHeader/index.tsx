import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface SectionHeaderProps {
  letter: string;
  count: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ letter, count }) => {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.letter, { color: colors.primary.main }]}>{letter}</Text>
      <View style={[styles.line, { backgroundColor: colors.neutral[200] }]} />
      <Text style={[styles.count, { color: colors.text.disabled }]}>{count}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  letter: {
    fontSize: 16,
    fontWeight: "800" as const,
    width: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  count: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
};
