import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./CertificateDetailIdentity.styles";

interface CertificateDetailIdentityProps {
  certificateId: string;
  onCopyCode: () => void;
}

export const CertificateDetailIdentity: React.FC<
  CertificateDetailIdentityProps
> = ({ certificateId, onCopyCode }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.idContainer}>
      <MaterialIcons name="verified" size={28} color={colors.primary.main} />
      <Text style={styles.certificateIdText}>{certificateId}</Text>
      <TouchableOpacity onPress={onCopyCode} style={styles.copyButton}>
        <Ionicons
          name="copy-outline"
          size={20}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};
