import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { hapticMedium } from '@src/shared/lib/haptics';

interface Props {
  onPress: () => void;
}

export const LogoutButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Se déconnecter"
      android_ripple={{ color: colors.action.selected }}
      style={({ pressed }) => [
        styles.logoutButton,
        { backgroundColor: colors.feedback.errorBg, borderColor: colors.status.error + '25' },
        pressed && styles.logoutPressed,
      ]}
      onPress={() => {
        hapticMedium();
        onPress();
      }}
    >
      <MaterialCommunityIcons name="logout" size={20} color={colors.status.error} />
      <Text style={[styles.logoutText, { color: colors.status.error }]}>Se déconnecter</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 22,
    minHeight: 54,
    paddingHorizontal: 18,
    borderRadius: RADIUS.control,
    borderWidth: HAIRLINE,
  },
  logoutPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    letterSpacing: 0,
  },
});

export default LogoutButton;
