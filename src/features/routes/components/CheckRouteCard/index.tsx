import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CheckRouteCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CheckRouteCard: React.FC<CheckRouteCardProps> = ({ children, style }) => {
  const { colors } = useAppTheme();

  const backgroundColor = colors.background.paper;
  const borderColor = colors.border;

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
