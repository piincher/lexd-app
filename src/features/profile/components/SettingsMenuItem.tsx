import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticLight } from '@src/shared/lib/haptics';
import { createStyles } from './SettingsMenu.styles';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SettingsMenuItemProps {
  title: string;
  subtitle: string;
  icon: MaterialIconName;
  iconBg: string;
  iconColor: string;
  screen: string;
  onNavigate: (screen: string) => void;
  showDivider: boolean;
  highlight?: boolean;
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
  highlight = false,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <React.Fragment>
      {showDivider && (
        <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        android_ripple={{ color: colors.action.selected }}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
          pressed && { backgroundColor: colors.action.selected },
        ]}
        onPress={() => {
          hapticLight();
          onNavigate(screen);
        }}
      >
        <View style={[styles.menuIconCircle, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.menuTextCol}>
          <View style={styles.titleRow}>
            <Text style={[styles.menuItemTitle, { color: colors.text.primary }]}>
              {title}
            </Text>
            {highlight && (
              <View style={[styles.highlightDot, { backgroundColor: colors.status.error }]} />
            )}
          </View>
          <Text
            style={[styles.menuItemSubtitle, { color: colors.text.secondary }]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text.disabled} />
      </Pressable>
    </React.Fragment>
  );
};
