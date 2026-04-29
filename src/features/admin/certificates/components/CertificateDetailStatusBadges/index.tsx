import React from "react";
import { View, Text } from "react-native";
import { styles } from "./CertificateDetailStatusBadges.styles";

interface CertificateDetailStatusBadgesProps {
  isActive: boolean;
  type: "AUTO" | "MANUAL";
}

export const CertificateDetailStatusBadges: React.FC<
  CertificateDetailStatusBadgesProps
> = ({ isActive, type }) => {
  const isAuto = type === "AUTO";

  return (
    <View style={styles.badgeContainer}>
      <View
        style={[styles.badge, isActive ? styles.badgeActive : styles.badgeRevoked]}
      >
        <Text
          style={[
            styles.badgeText,
            isActive ? styles.badgeActiveText : styles.badgeRevokedText,
          ]}
        >
          {isActive ? "ACTIF" : "RÉVOQUÉ"}
        </Text>
      </View>
      <View
        style={[styles.badge, isAuto ? styles.badgeAuto : styles.badgeManual]}
      >
        <Text
          style={[
            styles.badgeText,
            isAuto ? styles.badgeAutoText : styles.badgeManualText,
          ]}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};
