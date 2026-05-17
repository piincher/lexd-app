import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './SettingsMenu.styles';

interface SettingsMenuItemProps {
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  screen: string;
  onNavigate: (screen: string) => void;
  showDivider: boolean;
}

export const SettingsMenuItem: React.FC<SettingsMenuItemProps> = ({
  title,
  subtitle,
  icon,
  iconBg,
  iconColor,
  screen,
  onNavigate,
  showDivider,
}) => {
  const { colors } = useAppTheme();

  return (
    <React.Fragment>
      {showDivider && (
        <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
      )}
      <Pressable
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
          pressed && { backgroundColor: colors.background.overlay },
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onNavigate(screen);
        }}
      >
        <View style={[styles.menuIconCircle, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons name={icon as any} size={20} color={iconColor} />
        </View>
        <View style={styles.menuTextCol}>
          <Text style={[styles.menuItemTitle, { color: colors.text.primary }]}>
            {title}
          </Text>
          <Text style={[styles.menuItemSubtitle, { color: colors.text.secondary }]}>
            {subtitle}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.disabled} />
      </Pressable>
    </React.Fragment>
  );
};
