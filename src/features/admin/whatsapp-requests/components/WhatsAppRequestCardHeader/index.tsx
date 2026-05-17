import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { WhatsAppRequestStatus } from '../../api/whatsappRequestApi';
import { STATUS_LABELS } from '../../screens/WhatsAppRequestListScreen/constants';

interface WhatsAppRequestCardHeaderProps {
  requestId: string;
  status: WhatsAppRequestStatus;
  requestedAt: string;
}

const getStatusColor = (status: WhatsAppRequestStatus, colors: any): string => {
  switch (status) {
    case 'PENDING':
      return colors.status.warning;
    case 'PROCESSING':
      return colors.status.info;
    case 'COMPLETED':
      return colors.status.success;
    case 'FAILED':
      return colors.status.error;
    default:
      return colors.neutral[400];
  }
};

export const WhatsAppRequestCardHeader: React.FC<WhatsAppRequestCardHeaderProps> = ({
  requestId,
  status,
  requestedAt,
}) => {
  const { colors } = useAppTheme();
  const statusColor = getStatusColor(status, colors);

  return (
    <View style={styles.cardHeader}>
      <View style={styles.requestIdContainer}>
        <Text style={styles.requestId}>{requestId}</Text>
        <Chip
          style={[styles.statusChip, { backgroundColor: `${statusColor}20` }]}
          textStyle={{ color: statusColor, fontSize: 11, fontWeight: '700' }}
        >
          {STATUS_LABELS[status]}
        </Chip>
      </View>
      <Text style={styles.timestamp}>
        {new Date(requestedAt).toLocaleString('fr-FR', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  requestIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statusChip: {
    height: 24,
  },
  timestamp: {
    fontSize: 12,
    color: Theme.neutral[400],
  },
});
