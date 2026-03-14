/**
 * WhatsAppRequestLoadingState - Loading state component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

export const WhatsAppRequestLoadingState: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Theme.primary[600]} />
    <Text style={styles.loadingText}>Chargement des demandes...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Theme.spacing.lg,
    fontSize: 16,
    color: Theme.neutral[500],
  },
});

export default WhatsAppRequestLoadingState;
