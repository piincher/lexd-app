import React from "react";
import { TouchableOpacity, Text, Share, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { RADIUS } from "@src/shared/ui/designLanguage";

interface Props {
  onShare: () => void;
  isLoading: boolean;
  colors: any;
}

export const ShareButton: React.FC<Props> = ({ onShare, isLoading, colors }) => (
  <TouchableOpacity
    onPress={onShare}
    disabled={isLoading}
    activeOpacity={0.8}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary.main,
      paddingVertical: 14,
      marginHorizontal: 16,
      marginVertical: 12,
      borderRadius: RADIUS.control,
      gap: 8,
      opacity: isLoading ? 0.6 : 1,
    }}
  >
    <MaterialIcons name="share" size={20} color={colors.text.inverse} />
    <Text style={{ color: colors.text.inverse, fontWeight: "700", fontSize: 15 }}>
      {isLoading ? "Génération..." : "Partager mon profil"}
    </Text>
  </TouchableOpacity>
);
