import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardSettingsSection.styles';

interface RewardSettingsSectionProps {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  children: React.ReactNode;
  color?: string;
}

export const RewardSettingsSection: React.FC<RewardSettingsSectionProps> = ({
  title,
  icon,
  children,
  color,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const sectionColor = color || colors.primary.main;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: sectionColor + '14' }]}>
          <MaterialCommunityIcons name={icon} size={18} color={sectionColor} />
        </View>
        <Text style={[styles.title, { color: sectionColor }]}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};
