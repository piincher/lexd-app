import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ActiveWorkSummary, ShippingSummary } from '@src/shared/types/dashboard';

interface Props {
  welcomeMessage: string;
  summary: ShippingSummary;
  activeWork: ActiveWorkSummary;
  onNotifications: () => void;
}

const formatMoney = (value: number) =>
  `${Math.round(value || 0).toLocaleString('fr-FR')} FCFA`;

export const DashboardHero: React.FC<Props> = ({
  welcomeMessage,
  summary,
  activeWork,
  onNotifications,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => StyleSheet.create({
    wrapper: { paddingHorizontal: 16, paddingTop: 8 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    eyebrow: { color: colors.text.secondary, fontSize: 12, fontWeight: '700' },
    title: { color: colors.text.primary, fontSize: 24, fontWeight: '900', marginTop: 4 },
    bell: {
      width: 48,
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    card: {
      marginTop: 16,
      borderRadius: 18,
      padding: 16,
      backgroundColor: colors.primary.main,
    },
    cardTitle: { color: colors.text.inverse, fontSize: 14, fontWeight: '700' },
    cardValue: { color: colors.text.inverse, fontSize: 28, fontWeight: '900', marginTop: 4 },
    cardSub: { color: `${colors.text.inverse}CC`, fontSize: 12, fontWeight: '600', marginTop: 4 },
    metrics: { flexDirection: 'row', gap: 8, marginTop: 12 },
    metric: { flex: 1, borderRadius: 12, padding: 10, backgroundColor: `${colors.neutral.white}20` },
    metricValue: { color: colors.text.inverse, fontSize: 16, fontWeight: '900' },
    metricLabel: { color: `${colors.text.inverse}D9`, fontSize: 11, fontWeight: '600', marginTop: 2 },
  }), [colors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Tableau de bord marchand</Text>
          <Text style={styles.title}>{welcomeMessage}</Text>
        </View>
        <Pressable style={styles.bell} onPress={onNotifications}>
          <Ionicons name="notifications-outline" size={22} color={colors.text.primary} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Situation actuelle</Text>
        <Text style={styles.cardValue}>{activeWork.inTransitGoods} colis en transit</Text>
        <Text style={styles.cardSub}>
          {activeWork.readyForPickupGoods} prêts pour retrait • {formatMoney(activeWork.pendingPayments)} à régler
        </Text>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{summary.shipmentCount}</Text>
            <Text style={styles.metricLabel}>Envois</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{activeWork.pendingActions}</Text>
            <Text style={styles.metricLabel}>Actions</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{summary.deliveredCBM.toLocaleString('fr-FR')}</Text>
            <Text style={styles.metricLabel}>CBM livrés</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardHero;
