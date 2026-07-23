import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ActiveWorkSummary } from '@src/shared/types/dashboard';

interface Props {
  activeWork: ActiveWorkSummary;
  onViewShipments: () => void;
  onViewPayments: () => void;
}

const formatMoney = (value: number) =>
  `${Math.round(value || 0).toLocaleString('fr-FR')} FCFA`;

export const PendingActionsRail: React.FC<Props> = ({
  activeWork,
  onViewShipments,
  onViewPayments,
}) => {
  const { colors } = useAppTheme();
  const styles = StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 16 },
    title: { color: colors.text.primary, fontSize: 17, fontWeight: '900', marginBottom: 10 },
    row: { flexDirection: 'row', gap: 8 },
    card: {
      flex: 1,
      minHeight: 96,
      borderRadius: 14,
      padding: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'space-between',
    },
    iconRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    count: { color: colors.text.primary, fontSize: 20, fontWeight: '900' },
    label: { color: colors.text.secondary, fontSize: 11, lineHeight: 16, fontWeight: '700' },
  });

  const cards = [
    {
      id: 'ready',
      icon: 'checkmark-circle-outline' as const,
      value: activeWork.readyForPickupGoods,
      label: 'Prêt pour retrait',
      color: colors.accent.amber,
      action: onViewShipments,
    },
    {
      id: 'payments',
      icon: 'card-outline' as const,
      value: formatMoney(activeWork.pendingPayments),
      label: `${activeWork.unpaidGoods} colis impayés`,
      color: colors.status.warning,
      action: onViewPayments,
    },
    {
      id: 'transit',
      icon: 'airplane-outline' as const,
      value: activeWork.inTransitGoods,
      label: 'En transit',
      color: colors.primary.main,
      action: onViewShipments,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>À traiter</Text>
      <View style={styles.row}>
        {cards.map((card) => (
          <Pressable key={card.id} style={styles.card} onPress={card.action}>
            <View style={styles.iconRow}>
              <Ionicons name={card.icon} size={18} color={card.color} />
              <Ionicons name="chevron-forward" size={16} color={colors.text.disabled} />
            </View>
            <View>
              <Text style={styles.count} numberOfLines={1}>{card.value}</Text>
              <Text style={styles.label}>{card.label}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default PendingActionsRail;
