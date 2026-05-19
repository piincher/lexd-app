import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetIndexProps {
  activeLetter: string | null;
  onSelect: (letter: string) => void;
}

export const AlphabetIndex: React.FC<AlphabetIndexProps> = ({ activeLetter, onSelect }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  const handlePress = useCallback(
    (letter: string) => {
      trigger("light");
      onSelect(letter);
    },
    [onSelect, trigger]
  );

  return (
    <View style={styles.container}>
      {ALPHABET.map((letter) => {
        const isActive = activeLetter === letter;
        return (
          <TouchableOpacity
            key={letter}
            onPress={() => handlePress(letter)}
            style={styles.letterButton}
            accessibilityRole="button"
            accessibilityLabel={`Aller à ${letter}`}
          >
            <Text
              style={[
                styles.letterText,
                { color: isActive ? colors.primary.main : colors.text.disabled },
                isActive && styles.letterTextActive,
              ]}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 4,
    top: 120,
    bottom: 120,
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  letterButton: {
    width: 22,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontSize: 10,
    fontWeight: "600",
  },
  letterTextActive: {
    fontWeight: "800",
    transform: [{ scale: 1.2 }],
  },
});
