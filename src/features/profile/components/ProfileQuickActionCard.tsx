import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import type { AppTheme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticLight } from '@src/shared/lib/haptics';

type ThemeColors = AppTheme['colors'];
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ProfileQuickActionCardProps {
  label: string;
  subtitle: string;
  icon: MaterialIconName;
  iconColor: string;
  iconBg: string;
  onPress: () => void;
}

export const ProfileQuickActionCard: React.FC<ProfileQuickActionCardProps> = ({
  label,
  subtitle,
  icon,
  iconColor,
  iconBg,
  onPress,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      android_ripple={{ color: colors.action.selected }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.background.card, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
      onPress={() => {
        hapticLight();
        onPress();
      }}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons name={icon} size={21} color={iconColor} />
        </View>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.text.disabled} />
      </View>
      <Text style={[styles.label, { color: colors.text.primary }]} numberOfLines={1}>
        {label}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={2}>
        {subtitle}
      </Text>
    </Pressable>
  );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    width: '47.8%',
    minHeight: 112,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  pressed: {
    opacity: 0.76,
    transform: [{ scale: 0.98 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: Fonts.medium,
    lineHeight: 16,
    letterSpacing: 0,
  },
});

export default ProfileQuickActionCard;
