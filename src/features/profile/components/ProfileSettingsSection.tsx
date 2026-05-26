import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ThemeToggle } from '@src/components/ThemeToggle';
import { SettingsMenu } from './SettingsMenu';
import { ProfileSectionHeader } from './ProfileSectionHeader';

interface Props {
  onNavigate: (screen: string) => void;
}

export const ProfileSettingsSection: React.FC<Props> = ({ onNavigate }) => {
  const { colors } = useAppTheme();

  return (
    <>
      <ProfileSectionHeader
        icon="cog-outline"
        title="Paramètres"
        subtitle="Compte, notifications et assistance"
      />
      <View style={[styles.menuCard, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <ThemeToggle variant="menu" />
      </View>
      <SettingsMenu onNavigate={onNavigate} />
    </>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default ProfileSettingsSection;
