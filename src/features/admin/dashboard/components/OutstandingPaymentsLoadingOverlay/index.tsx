import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './OutstandingPaymentsLoadingOverlay.styles';

interface OutstandingPaymentsLoadingOverlayProps {
  isDark: boolean;
}

export const OutstandingPaymentsLoadingOverlay: React.FC<OutstandingPaymentsLoadingOverlayProps> = ({
  isDark,
}) => {
  return (
    <View
      style={[
        styles.loadingOverlay,
        isDark ? styles.loadingOverlayDark : styles.loadingOverlayLight,
      ]}
    >
      <ActivityIndicator size="large" color="#EF4444" />
    </View>
  );
};
