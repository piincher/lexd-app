import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CheckRouteCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CheckRouteCard: React.FC<CheckRouteCardProps> = ({ children, style }) => {
  const { isDark } = useAppTheme();

  const backgroundColor = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <View style={[styles.card, { backgroundColor, borderColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
});
