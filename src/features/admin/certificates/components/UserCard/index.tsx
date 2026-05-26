import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CertificateUser } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from './UserCard.styles';

interface UserCardProps {
  user: CertificateUser;
  isSelected: boolean;
  onSelect: (user: CertificateUser) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onSelect }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <TouchableOpacity
    style={[styles.card, isSelected && styles.cardSelected]}
    onPress={() => onSelect(user)}
    activeOpacity={0.7}
  >
    <View style={styles.info}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        {user.hasCertificate && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {user.certificateType === "AUTO" ? "AUTO" : "MANUAL"}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.phone}>{user.phoneNumber}</Text>
      <Text style={styles.cbm}>{user.totalDeliveredCBM} CBM livrés</Text>
    </View>
    <View style={styles.indicator}>
      <Ionicons
        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={isSelected ? colors.primary.main : colors.text.disabled}
      />
    </View>
  </TouchableOpacity>
  );
};
