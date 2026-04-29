import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface Props {
  onPress: () => void;
  isDark?: boolean;
}

export const LogoutButton: React.FC<Props> = ({ onPress, isDark }) => (
  <Pressable
    style={({ pressed }) => [
      styles.logoutButton,
      { backgroundColor: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)' },
      pressed && styles.logoutPressed,
    ]}
    onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }}
  >
    <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
    <Text style={styles.logoutText}>Se deconnecter</Text>
  </Pressable>
);

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
    borderColor: 'rgba(239,68,68,0.15)',
  },
  logoutPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 15,
    color: '#EF4444',
  },
});

export default LogoutButton;
