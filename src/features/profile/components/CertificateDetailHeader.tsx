import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { GOLD, CARD_BORDER } from "../screens/CertificateDetail.styles";
import { createStyles } from "../screens/CertificateDetail.styles";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface Props {
  title?: string;
  subtitle?: string;
}

export const CertificateDetailHeader: React.FC<Props> = ({
  title = "Expéditeur Certifié",
  subtitle = "ChinaLink Express",
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors.text.inverse);

  return (
    <>
      <MotiView
        from={{ scale: 0, opacity: 0, translateY: -30 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100, delay: 100 }}
        style={styles.trophyContainer}
      >
        <LinearGradient
          colors={[colors.accent.goldLight + '40', colors.accent.gold + '1A']}
          style={styles.trophyGlow}
        >
          <MaterialIcons name="emoji-events" size={72} color={GOLD} />
        </LinearGradient>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 120, delay: 250 }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </MotiView>
    </>
  );
};
