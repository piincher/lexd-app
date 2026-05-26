import { useAppTheme } from '@src/providers/ThemeProvider';
// GoodsDetailReception - Reception information (date received, received by)

import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface ReceivedBy {
  firstName?: string;
  lastName?: string;
}

interface GoodsDetailReceptionProps {
  receivedAt?: string;
  receivedByName?: string;
  receivedBy?: ReceivedBy | string;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const GoodsDetailReception: React.FC<GoodsDetailReceptionProps> = ({
  receivedAt,
  receivedByName,
  receivedBy,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const getReceivedByText = (): string => {
    if (receivedByName) return receivedByName;
    if (typeof receivedBy === 'object' && receivedBy) {
      return `${receivedBy.firstName} ${receivedBy.lastName}`;
    }
    return 'N/A';
  };

  return (
    <Card style={styles.sectionCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="calendar-check" size={20} color={colors.primary[600]} />
          <Text style={styles.sectionTitle}>Réception</Text>
        </View>
        <View style={styles.receptionGrid}>
          <View style={styles.receptionItem}>
            <Text style={styles.receptionLabel}>Date de réception</Text>
            <Text style={styles.receptionValue}>{formatDate(receivedAt || '')}</Text>
          </View>
          <View style={styles.receptionItem}>
            <Text style={styles.receptionLabel}>Reçu par</Text>
            <Text style={styles.receptionValue}>{getReceivedByText()}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const createStyles = (colors: any) => ({
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.neutral[800],
    marginLeft: 10,
  },
  receptionGrid: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  receptionItem: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    padding: 14,
    borderRadius: 12,
  },
  receptionLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  receptionValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.neutral[800],
  },
});
