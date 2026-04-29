import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

interface CampaignEmptyStateProps {
  onCreate: () => void;
}

export const CampaignEmptyState: React.FC<CampaignEmptyStateProps> = ({ onCreate }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="megaphone-outline" size={48} color={colors.text.disabled} />
      <Text style={[styles.text, { color: colors.text.disabled }]}>Aucune campagne</Text>
      <TouchableOpacity style={styles.button} onPress={onCreate}>
        <Text style={styles.buttonText}>Créer une campagne</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  text: { fontFamily: Fonts.medium, fontSize: 15 },
  button: {
    backgroundColor: "#8B5CF6",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: { fontFamily: Fonts.medium, fontSize: 14, color: "#fff" },
});
