import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { WhatsAppRequestStatus } from '@src/features/admin/whatsapp-requests/api/whatsappRequestApi';
import { STATUS_LABELS } from '@src/features/admin/whatsapp-requests/screens/WhatsAppRequestList/constants';

interface EmptyStateProps {
  selectedStatus: WhatsAppRequestStatus | 'all';
}

export const EmptyState: React.FC<EmptyStateProps> = ({ selectedStatus }) => {
  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={['#F3F0FF', '#EDE9FE']}
        style={styles.emptyIconContainer}
      >
        <Ionicons name="logo-whatsapp" size={64} color={Theme.primary[400]} />
      </LinearGradient>
      <Text style={styles.emptyTitle}>Aucune demande</Text>
      <Text style={styles.emptySubtitle}>
        {selectedStatus === 'PENDING'
          ? 'Aucune demande WhatsApp en attente'
          : selectedStatus !== 'all'
          ? `Aucune demande avec le statut "${STATUS_LABELS[selectedStatus as WhatsAppRequestStatus]}"`
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
