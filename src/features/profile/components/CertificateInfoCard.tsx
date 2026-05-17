import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import {
  GOLD_DARK,
  createStyles,
} from "../screens/CertificateDetail.styles";

interface Props {
  certificateId: string;
  verificationCode: string;
  formattedDate: string;
  onCopyCode: () => void;
}

export const CertificateInfoCard: React.FC<Props> = ({
  certificateId,
  verificationCode,
  formattedDate,
  onCopyCode,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors.text.inverse);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100, delay: 400 }}
      style={styles.infoCard}
    >
      <View style={styles.infoRow}>
        <View style={styles.infoIconWrapper}>
          <MaterialIcons
            name="confirmation-number"
            size={20}
            color={GOLD_DARK}
          />
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoLabel}>Numéro de certificat</Text>
          <Text style={styles.infoValue}>{certificateId}</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.infoRow}>
        <View style={styles.infoIconWrapper}>
          <MaterialIcons name="verified" size={20} color={GOLD_DARK} />
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoLabel}>Code de vérification</Text>
          <View style={styles.codeRow}>
            <Text style={styles.verificationCode}>{verificationCode}</Text>
            <TouchableOpacity
              onPress={onCopyCode}
              activeOpacity={0.7}
              style={styles.copyButton}
            >
              <MaterialIcons
                name="content-copy"
                size={18}
                color={GOLD_DARK}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.infoRow}>
        <View style={styles.infoIconWrapper}>
          <MaterialIcons
            name="calendar-today"
            size={20}
            color={GOLD_DARK}
          />
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoLabel}>Date de délivrance</Text>
          <Text style={styles.infoValue}>{formattedDate}</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.infoRow}>
        <View style={styles.infoIconWrapper}>
          <MaterialIcons name="check-circle" size={20} color={colors.status.success} />
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoLabel}>Statut</Text>
          <View style={styles.badgeContainer}>
            <LinearGradient
              colors={[colors.status.successDark || colors.status.success, colors.status.success]}
              style={styles.statusBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons
                name="check"
                size={14}
                color={colors.text.inverse}
              />
              <Text style={styles.statusText}>ACTIF</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </MotiView>
  );
};
