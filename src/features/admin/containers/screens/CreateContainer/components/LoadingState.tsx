import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface LoadingStateProps {
  visible: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ visible }) => {
  const { colors, isDark } = useAppTheme();
  if (!visible) return null;

  const styles = useMemo(() => StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.background.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
  }), [isDark]);

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={Theme.primary[500]} />
    </View>
  );
};
