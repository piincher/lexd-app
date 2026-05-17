import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  onPress: () => void;
}

export const LogoutButton: React.FC<Props> = ({ onPress }) => {
  const { colors } = useAppTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.logoutButton,
        { backgroundColor: colors.feedback.errorBg, borderColor: colors.status.error + '25' },
        pressed && styles.logoutPressed,
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
    >
      <MaterialCommunityIcons name="logout" size={20} color={colors.status.error} />
      <Text style={[styles.logoutText, { color: colors.status.error }]}>Se deconnecter</Text>
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
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
  },
  logoutPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 15,
  },
});

export default LogoutButton;
