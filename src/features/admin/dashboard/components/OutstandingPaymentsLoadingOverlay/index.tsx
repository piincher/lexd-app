import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './OutstandingPaymentsLoadingOverlay.styles';

interface OutstandingPaymentsLoadingOverlayProps {
  isDark: boolean;
}

export const OutstandingPaymentsLoadingOverlay: React.FC<OutstandingPaymentsLoadingOverlayProps> = ({
  isDark,
}) => {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.loadingOverlay,
        isDark ? styles.loadingOverlayDark : styles.loadingOverlayLight,
      ]}
    >
      <ActivityIndicator size="large" color={colors.status.error} />
    </View>
  );
};
