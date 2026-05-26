import React from 'react';
import { View, Text } from 'react-native';
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
  const { colors } = useAppTheme();
  const styles = createProfileHeaderStyles(colors);
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Compte ChinaLink';
  const phoneLabel = phoneNumber ? `+${phoneNumber}` : 'Téléphone non renseigné';

  return (
    <View style={styles.headerPanel}>
      <View style={styles.headerTop}>
        <View style={styles.identityRow}>
          <ProfileAvatar avatarUri={avatarUri} initials={initials} />
          <View style={styles.userInfo}>
            <Text style={styles.eyebrow}>Espace client</Text>
            <Text style={styles.username} numberOfLines={1}>
              {displayName}
            </Text>
            <View style={styles.phoneRow}>
              <MaterialCommunityIcons name="phone-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.phoneNumber} numberOfLines={1}>
                {phoneLabel}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.statusPill}>
          <MaterialCommunityIcons name="shield-check-outline" size={15} color={colors.status.success} />
          <Text style={styles.statusText}>Profil connecté</Text>
        </View>
      </View>

      <ProfileBalanceStrip balanceFormatted={balanceFormatted} />
    </View>
  );
};

export default ProfileHeader;
