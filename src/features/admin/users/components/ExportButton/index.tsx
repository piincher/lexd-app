import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useHaptics } from "../../hooks/useHaptics";
import { exportClients } from "../../lib/exportClients";
import { userData } from "@src/shared/types/user";

interface ExportButtonProps {
  clients: userData[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ clients }) => {
  const { colors } = useAppTheme();
  const { trigger } = useHaptics();

  const handleExport = async () => {
    trigger("medium");
    await exportClients(clients);
  };

  return (
    <Animated.View entering={FadeIn}>
      <TouchableOpacity
        onPress={handleExport}
        style={[styles.btn, { backgroundColor: colors.text.inverse + "33" }]}
        accessibilityRole="button"
        accessibilityLabel="Exporter la liste"
      >
        <Ionicons name="share-outline" size={22} color={colors.text.inverse} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
};
