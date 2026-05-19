/**
 * WhatsAppRequestLoadingState - Loading state component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const WhatsAppRequestLoadingState: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary[600]} />
      <Text style={styles.loadingText}>Chargement des demandes...</Text>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.neutral[500],
  },
});

export default WhatsAppRequestLoadingState;
