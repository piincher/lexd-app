import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ThemeToggle } from '@src/components/ThemeToggle';
import { SettingsMenu } from './SettingsMenu';

interface Props {
  onNavigate: (screen: string) => void;
}

export const ProfileSettingsSection: React.FC<Props> = ({ onNavigate }) => {
  const { colors, isDark } = useAppTheme();
  const cardBorder = colors.border;

  return (
    <>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="cog-outline" size={18} color={colors.primary.main} />
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Paramètres</Text>
      </View>
      <View style={[styles.menuCard, { backgroundColor: colors.background.card, borderColor: cardBorder }]}>
        <ThemeToggle variant="menu" />
      </View>
      <SettingsMenu onNavigate={onNavigate} />
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default ProfileSettingsSection;
