import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { WHITE_60, createStyles } from "../screens/CertificateDetail.styles";

interface Props {
  text?: string;
}

export const CertificateDetailFooter: React.FC<Props> = ({
  text = "Ce certificat atteste de votre statut d'expéditeur certifié ChinaLink Express",
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors.text.inverse);

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 600, delay: 900 }}
      style={styles.footer}
    >
      <MaterialIcons name="security" size={16} color={WHITE_60} />
      <Text style={styles.footerText}>{text}</Text>
    </MotiView>
  );
};
