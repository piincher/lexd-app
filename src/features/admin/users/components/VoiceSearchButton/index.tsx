import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";

interface VoiceSearchButtonProps {
  onPress: () => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onPress }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  return (
    <TouchableOpacity
      onPress={() => { trigger("light"); onPress(); }}
      style={[styles.btn, { backgroundColor: `${colors.primary.main}15` }]}
      accessibilityRole="button"
      accessibilityLabel="Recherche vocale"
    >
      <Ionicons name="mic" size={20} color={colors.primary.main} />
    </TouchableOpacity>
  );
};

const styles = {
  btn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginLeft: 8,
  },
};
