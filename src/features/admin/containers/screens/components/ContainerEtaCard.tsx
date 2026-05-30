import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  DELAY_RISK_LABELS,
  ETA_CONFIDENCE_LABELS,
  type ContainerEta,
  type DelayRisk,
} from '../hooks/containerEta';

interface ContainerEtaCardProps {
  eta: ContainerEta;
}

const formatDate = (iso: string | null): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatCountdown = (eta: ContainerEta): string => {
  if (eta.isArrived) return 'Arrivé';
  if (eta.daysRemaining === null) return 'Non estimé';
  if (eta.daysRemaining < 0) return `En retard de ${Math.abs(eta.daysRemaining)} j`;
  if (eta.daysRemaining === 0) return "Arrivée aujourd'hui";
  return `Dans ${eta.daysRemaining} j`;
};

export const ContainerEtaCard: React.FC<ContainerEtaCardProps> = ({ eta }) => {
  const { colors } = useAppTheme();

  const riskColor: Record<DelayRisk, string> = {
    NONE: colors.status.success,
    LOW: colors.status.info,
    MEDIUM: colors.status.warning,
    HIGH: colors.status.error,
  };
  const accent = eta.isArrived ? colors.status.success : riskColor[eta.risk];

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="time-outline" size={18} color={colors.primary[600]} />
          <Text style={[styles.title, { color: colors.text.primary }]}>Arrivée prévue</Text>
        </View>
        <View style={[styles.riskPill, { backgroundColor: `${accent}22` }]}>
          <View style={[styles.riskDot, { backgroundColor: accent }]} />
          <Text style={[styles.riskText, { color: accent }]}>
            {eta.isArrived ? 'À temps' : DELAY_RISK_LABELS[eta.risk]}
          </Text>
        </View>
      </View>

      <View style={styles.bigRow}>
        <Text style={[styles.bigDate, { color: colors.text.primary }]}>{formatDate(eta.predictedArrival)}</Text>
        <Text style={[styles.countdown, { color: accent }]}>{formatCountdown(eta)}</Text>
      </View>

      {eta.projectedDelayDays > 0 && !eta.isArrived && (
        <View style={[styles.delayBanner, { backgroundColor: colors.feedback.warningBg }]}>
          <Ionicons name="alert-circle" size={15} color={colors.feedback.warningDark} />
          <Text style={[styles.delayText, { color: colors.feedback.warningDark }]}>
            Retard projeté de {eta.projectedDelayDays} j — prévenir le client
          </Text>
        </View>
      )}

      <Text style={[styles.confidence, { color: colors.text.secondary }]}>
        {ETA_CONFIDENCE_LABELS[eta.confidence]}
      </Text>
      {eta.factors.map((factor) => (
        <View key={factor} style={styles.factorRow}>
          <Ionicons name="ellipse" size={5} color={colors.text.secondary} />
          <Text style={[styles.factorText, { color: colors.text.secondary }]}>{factor}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginBottom: 14, padding: 14, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  title: { fontSize: 16, fontWeight: '800' },
  riskPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14 },
  riskDot: { width: 8, height: 8, borderRadius: 4 },
  riskText: { fontSize: 12, fontWeight: '800' },
  bigRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 12, marginBottom: 4 },
  bigDate: { fontSize: 22, fontWeight: '900' },
  countdown: { fontSize: 14, fontWeight: '800' },
  delayBanner: { flexDirection: 'row', alignItems: 'center', gap: 7, padding: 9, borderRadius: 8, marginTop: 8, marginBottom: 4 },
  delayText: { flex: 1, fontSize: 12, fontWeight: '700' },
  confidence: { marginTop: 8, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  factorRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 5 },
  factorText: { flex: 1, fontSize: 12, fontWeight: '600' },
});

export default ContainerEtaCard;
