import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { getInitials, getAvatarColor } from "../../lib/clientUtils";
import { createStyles } from './ProfileCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ProfileCardProps {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  firstName,
  lastName,
  phoneNumber,
  role,
}) => {
  const avatarColors = getAvatarColor(`${firstName} ${lastName}`);
  const initials = getInitials(firstName, lastName);

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={avatarColors}
          style={styles.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </LinearGradient>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{firstName || "—"} {lastName}</Text>
        <Text style={styles.phone}>{phoneNumber || "No phone"}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{role || "User"}</Text>
        </View>
      </View>
    </View>
  );
};
