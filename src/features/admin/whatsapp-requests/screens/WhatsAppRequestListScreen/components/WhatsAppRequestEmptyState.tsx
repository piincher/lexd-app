/**
 * WhatsAppRequestEmptyState - Empty state component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { STATUS_LABELS } from '../constants';

interface WhatsAppRequestEmptyStateProps {
  selectedStatus: string;
}

export const WhatsAppRequestEmptyState: React.FC<WhatsAppRequestEmptyStateProps> = ({ selectedStatus }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient colors={[colors.feedback.infoBg, colors.background.paper]} style={styles.emptyIconContainer}>
        <Ionicons name="logo-whatsapp" size={64} color={Theme.primary[400]} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Aucune demande</Text>
      <Text style={styles.emptySubtitle}>
        {selectedStatus === 'PENDING'
          ? 'Aucune demande WhatsApp en attente'
          : selectedStatus !== 'all'
          ? `Aucune demande avec le statut "${STATUS_LABELS[selectedStatus as keyof typeof STATUS_LABELS]}"`
          : 'Les demandes WhatsApp apparaîtront ici'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['4xl'],
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: Theme.radius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    paddingHorizontal: Theme.spacing['2xl'],
  },
});

export default WhatsAppRequestEmptyState;
