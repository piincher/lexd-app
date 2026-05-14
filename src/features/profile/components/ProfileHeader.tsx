import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

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
  const { isDark } = useAppTheme();
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <LinearGradient
      colors={isDark ? ['#15803D', '#166534', '#14532D'] : ['#22C55E', '#16A34A', '#15803D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.headerContent}>
        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image style={styles.avatar} source={{ uri: avatarUri }} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitials}>{initials || '?'}</Text>
            </View>
          )}
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username} numberOfLines={1}>
            {firstName} {lastName}
          </Text>
          <View style={styles.phoneRow}>
            <MaterialCommunityIcons name="phone-outline" size={13} color="rgba(255,255,255,0.7)" />
            <Text style={styles.phoneNumber}>+{phoneNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.balanceStrip}>
        <View style={styles.balanceLeft}>
          <MaterialCommunityIcons name="wallet-outline" size={20} color="rgba(255,255,255,0.85)" />
          <Text style={styles.balanceLabel}>Solde disponible</Text>
        </View>
        <Text style={styles.balanceValue}>{balanceFormatted} FCFA</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  avatarFallback: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: 'Theme.colors.text.inverse',
    fontFamily: Fonts.bold,
    fontSize: 22,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4ADE80',
    borderWidth: 2.5,
    borderColor: '#15803D',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: 'Theme.colors.text.inverse',
    letterSpacing: -0.3,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  phoneNumber: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: 'rgba(255,255,255,0.7)',
  },
  balanceStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 18,
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: 'rgba(255,255,255,0.75)',
  },
  balanceValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: 'Theme.colors.text.inverse',
    letterSpacing: -0.3,
  },
});

export default ProfileHeader;
