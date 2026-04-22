import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Badge } from '@src/shared/ui/Badge';
import { Card } from '@src/shared/ui/Card';
import { AirwayBill, AirwayBillStatus } from '../../types';

interface Props {
  airwayBill: AirwayBill;
  flightLabel: string;
  routeLabel: string;
  consignee: { name: string; phone: string } | null;
}

export const AirwayBillInfoCard: React.FC<Props> = ({ airwayBill, flightLabel, routeLabel, consignee }) => {
  const { colors } = useAppTheme();

  const statusConfig = useMemo(() => {
    const config: Record<AirwayBillStatus, { label: string; color: string }> = {
      CREATED: { label: 'Créé', color: colors.neutral[500] },
      PACKING: { label: 'Préparation', color: colors.primary[500] },
      READY_FOR_DEPARTURE: { label: 'Prêt au départ', color: colors.accent.gold },
      IN_TRANSIT: { label: 'En transit', color: colors.status.info },
      ARRIVED: { label: 'Arrivé', color: colors.status.success },
      READY_FOR_PICKUP: { label: 'Prêt pour retrait', color: colors.accent.mint },
      DELIVERED: { label: 'Livré', color: colors.neutral[400] },
    };
    return config[airwayBill.status];
  }, [airwayBill.status, colors]);

  return (
    <Card style={styles.card} padding="large">
      <View style={styles.headerRow}>
        <Text style={[styles.awbNumber, { color: colors.text.primary }]}>{airwayBill.awbNumber}</Text>
        <Badge
          label={statusConfig.label}
          variant="custom"
          backgroundColor={`${statusConfig.color}20`}
          textColor={statusConfig.color}
        />
      </View>
      <Text style={[styles.flightInfo, { color: colors.text.secondary }]}>{flightLabel}</Text>
      <View style={styles.row}>
        <Ionicons name="airplane" size={16} color={colors.primary.main} />
        <Text style={[styles.rowText, { color: colors.text.primary }]}>{routeLabel}</Text>
      </View>
      {consignee && (
        <View style={styles.row}>
          <Ionicons name="business" size={16} color={colors.primary.main} />
          <Text style={[styles.rowText, { color: colors.text.primary }]}>
            {consignee.name} · {consignee.phone}
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  awbNumber: {
    fontSize: 20,
    fontWeight: '800',
  },
  flightInfo: {
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
