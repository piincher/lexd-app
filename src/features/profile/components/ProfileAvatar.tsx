import React from 'react';
import { View, Image, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createProfileHeaderStyles } from './ProfileHeader.styles';

interface ProfileAvatarProps {
  avatarUri?: string;
  initials: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatarUri, initials }) => {
  const { colors } = useAppTheme();
  const styles = createProfileHeaderStyles(colors);

  return (
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
  );
};
