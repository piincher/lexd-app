import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { GOLD, WHITE_80, WHITE_60, createStyles } from "../screens/CertificateDetail.styles";

interface Props {
  verificationUrl: string;
  onCopyUrl: () => void;
}

export const CertificateVerificationCard: React.FC<Props> = ({
  verificationUrl,
  onCopyUrl,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors.text.inverse);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100, delay: 550 }}
      style={styles.verificationCard}
    >
      <View style={styles.verificationHeader}>
        <MaterialIcons name="qr-code-2" size={24} color={GOLD} />
        <Text style={styles.verificationTitle}>
          Scannez pour vérifier l'authenticité
        </Text>
      </View>

      <TouchableOpacity
        style={styles.urlContainer}
        onPress={onCopyUrl}
        activeOpacity={0.7}
      >
        <MaterialIcons name="link" size={18} color={WHITE_80} />
        <Text style={styles.urlText}>{verificationUrl}</Text>
        <MaterialIcons name="content-copy" size={16} color={WHITE_60} />
      </TouchableOpacity>

      <Text style={styles.urlHint}>
        Appuyez pour copier le lien de vérification
      </Text>
    </MotiView>
  );
};
