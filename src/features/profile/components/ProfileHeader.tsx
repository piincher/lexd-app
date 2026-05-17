import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createProfileHeaderStyles } from './ProfileHeader.styles';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileBalanceStrip } from './ProfileBalanceStrip';

interface Props {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUri?: string;
  balanceFormatted: string;
}

export const ProfileHeader: React.FC<Props> = ({
  firstName,
  lastName,
  phoneNumber,
  avatarUri,
  balanceFormatted,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createProfileHeaderStyles(colors);
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <LinearGradient
      colors={isDark ? [colors.primary.dark, colors.primary.main, colors.primary.dark] : [colors.status.success, colors.primary.main, colors.primary.dark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.headerContent}>
        <ProfileAvatar avatarUri={avatarUri} initials={initials} />
        <View style={styles.userInfo}>
          <Text style={styles.username} numberOfLines={1}>
            {firstName} {lastName}
          </Text>
          <View style={styles.phoneRow}>
            <MaterialCommunityIcons name="phone-outline" size={13} color={colors.text.inverse} />
            <Text style={styles.phoneNumber}>+{phoneNumber}</Text>
          </View>
        </View>
      </View>

      <ProfileBalanceStrip balanceFormatted={balanceFormatted} />
    </LinearGradient>
  );
};

export default ProfileHeader;
