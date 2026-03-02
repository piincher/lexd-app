import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Expense } from '../types';
import { EXPENSE_TYPE_CONFIG, EXPENSE_STATUS_CONFIG } from '../types';
import { ExpenseTypeIcon } from './ExpenseTypeIcon';
import { formatCurrency } from '@src/shared/lib/currency';

interface ExpenseCardProps {
  expense: Expense;
  onPress?: (expense: Expense) => void;
  onApprove?: (expense: Expense) => void;
  showActions?: boolean;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onPress,
  onApprove,
  showActions = true,
}) => {
  const theme = useTheme();
  const typeConfig = EXPENSE_TYPE_CONFIG[expense.type];
  const statusConfig = EXPENSE_STATUS_CONFIG[expense.status];

  return (
    <TouchableOpacity onPress={() => onPress?.(expense)} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <ExpenseTypeIcon type={expense.type} size={28} />
            <View style={styles.headerText}>
              <Text variant="titleMedium" numberOfLines={1} style={styles.description}>
                {expense.description}
              </Text>
              <View style={styles.metaRow}>
                <Chip
                  compact
                  style={[styles.typeChip, { backgroundColor: `${typeConfig.color}20` }]}
                  textStyle={{ color: typeConfig.color, fontSize: 10 }}
                >
                  {typeConfig.label}
                </Chip>
                <Text variant="bodySmall" style={styles.date}>
                  {format(new Date(expense.date), 'dd MMM yyyy', { locale: fr })}
                </Text>
              </View>
            </View>
            <View style={styles.amountContainer}>
              <Text variant="titleMedium" style={[styles.amount, { color: theme.colors.error }]}>
                -{formatCurrency(expense.amount)}
              </Text>
              <Chip
                compact
                style={[styles.statusChip, { backgroundColor: `${statusConfig.color}20` }]}
                textStyle={{ color: statusConfig.color, fontSize: 10 }}
              >
                {statusConfig.label}
              </Chip>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="store" size={14} color="#6B7280" />
              <Text variant="bodySmall" style={styles.detailText}>
                {expense.vendor}
              </Text>
            </View>

            {expense.container && (
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="cube" size={14} color="#6B7280" />
                <Text variant="bodySmall" style={styles.detailText}>
                  {expense.container.virtualContainerNumber}
                </Text>
              </View>
            )}

            {expense.receiptUrl && (
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="paperclip" size={14} color="#10B981" />
                <Text variant="bodySmall" style={[styles.detailText, { color: '#10B981' }]}>
                  Reçu joint
                </Text>
              </View>
            )}
          </View>

          {showActions && expense.status === 'PENDING' && onApprove && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#10B98120' }]}
                onPress={() => onApprove(expense)}
              >
                <MaterialCommunityIcons name="check" size={18} color="#10B981" />
                <Text variant="bodySmall" style={{ color: '#10B981' }}>
                  Approuver
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
  },
  content: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  description: {
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeChip: {
    height: 22,
  },
  date: {
    color: '#6B7280',
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontWeight: '700',
  },
  statusChip: {
    height: 22,
  },
  details: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: '#6B7280',
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
