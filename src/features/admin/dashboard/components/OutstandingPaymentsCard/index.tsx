import React, { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { CardHero } from "./components/CardHero";
import { StatusRow } from "./components/StatusRow";
import { CardFooter } from "./components/CardFooter";

interface OutstandingPaymentsCardProps {
  totalOutstanding: number;
  counts: { UNPAID: number; PARTIAL: number; PAID: number };
  onPress: () => void;
}

export const OutstandingPaymentsCard: React.FC<OutstandingPaymentsCardProps> = ({
  totalOutstanding,
  counts,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginBottom: 16,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: colors.border,
          ...Theme.shadows.md,
        },
        pressed: {
          opacity: 0.92,
        },
      }),
    [colors, isDark]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <CardHero totalOutstanding={totalOutstanding} />
      <StatusRow counts={counts} />
      <CardFooter />
    </Pressable>
  );
};

export default OutstandingPaymentsCard;
