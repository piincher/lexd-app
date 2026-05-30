/**
 * ContainerKeyInfoCard — surfaces the container's key milestone date/times
 * (loading, departure, arrival…) and reference info (booking ref, actual
 * number, shipping line, route) on the detail screen at a glance. Only rows
 * with a value render, so the card stays tight early in the lifecycle.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { Container } from '../../types';

interface ContainerKeyInfoCardProps {
  container: Container;
}

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const fmtDateTime = (iso?: string): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const fmtDate = (iso?: string): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const ContainerKeyInfoCard: React.FC<ContainerKeyInfoCardProps> = ({ container }) => {
  const { colors } = useAppTheme();
  const t = container.timeline ?? ({} as Container['timeline']);

  // Lifecycle milestones — only the ones that have actually happened show.
  const milestones: { label: string; icon: IconName; value: string | null; tone?: string }[] = [
    { label: 'Réservé', icon: 'bookmark-outline', value: fmtDateTime(t.bookedAt) },
    { label: 'Vide vers entrepôt', icon: 'cube-outline', value: fmtDateTime(t.emptyDispatchedAt) },
    { label: 'Chargement débuté', icon: 'hammer-outline', value: fmtDateTime(t.loadingStartedAt), tone: colors.status.warning },
    { label: 'Chargement terminé', icon: 'checkmark-done-outline', value: fmtDateTime(t.loadingCompletedAt), tone: colors.status.warning },
    { label: 'Entré au port', icon: 'enter-outline', value: fmtDateTime(t.gateInFullAt) },
    { label: 'Chargé à bord', icon: 'boat-outline', value: fmtDateTime(t.loadedOnVesselAt) },
    { label: 'Départ', icon: 'airplane-outline', value: fmtDateTime(t.departedAt), tone: colors.accent.rose },
    { label: 'Arrivée', icon: 'flag-outline', value: fmtDateTime(t.arrivedAt), tone: colors.status.success },
    { label: 'Déchargé', icon: 'archive-outline', value: fmtDateTime(t.dischargedAt) },
    { label: 'Prêt pour retrait', icon: 'cube-outline', value: fmtDateTime(t.readyForPickupAt) },
    { label: 'Livré', icon: 'checkmark-circle-outline', value: fmtDateTime(t.deliveredAt), tone: colors.status.success },
  ];
  const visibleMilestones = milestones.filter((m) => m.value);

  // Estimates shown as a hint even before the actual events land.
  const estDeparture = fmtDate(t.estimatedDeparture);
  const estArrival = fmtDate(t.estimatedArrival);

  const route = container.route;
  const info: { label: string; value: string }[] = [];
  if (container.bookingReference) info.push({ label: 'Réf. booking', value: container.bookingReference });
  if (container.actualContainerNumber) info.push({ label: 'N° container réel', value: container.actualContainerNumber });
  if (container.shippingLine) info.push({ label: 'Ligne', value: String(container.shippingLine) });
  if (route?.origin || route?.destination) {
    info.push({ label: 'Route', value: `${route?.origin ?? '?'} → ${route?.destination ?? '?'}` });
  }
  if (typeof route?.estimatedTransitDays === 'number') {
    info.push({ label: 'Transit estimé', value: `${route.estimatedTransitDays} j` });
  }

  const hasAnything = visibleMilestones.length > 0 || estDeparture || estArrival || info.length > 0;
  if (!hasAnything) return null;

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={18} color={colors.primary[600]} />
        <Text style={[styles.title, { color: colors.text.primary }]}>Dates clés & infos</Text>
      </View>

      {visibleMilestones.length > 0 ? (
        <View style={styles.timeline}>
          {visibleMilestones.map((m, i) => (
            <View key={m.label} style={styles.row}>
              <View style={styles.railCol}>
                <View style={[styles.dot, { backgroundColor: m.tone ?? colors.primary[600] }]}>
                  <Ionicons name={m.icon} size={11} color={colors.text.inverse} />
                </View>
                {i < visibleMilestones.length - 1 && (
                  <View style={[styles.rail, { backgroundColor: colors.border }]} />
                )}
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowLabel, { color: colors.text.primary }]}>{m.label}</Text>
                <Text style={[styles.rowValue, { color: colors.text.secondary }]}>{m.value}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={[styles.empty, { color: colors.text.secondary }]}>
          Aucune étape datée pour le moment.
        </Text>
      )}

      {(estDeparture || estArrival) && (
        <View style={[styles.estimateRow, { borderTopColor: colors.border }]}>
          {estDeparture && (
            <View style={styles.estimate}>
              <Text style={[styles.estLabel, { color: colors.text.secondary }]}>Départ prévu</Text>
              <Text style={[styles.estValue, { color: colors.text.primary }]}>{estDeparture}</Text>
            </View>
          )}
          {estArrival && (
            <View style={styles.estimate}>
              <Text style={[styles.estLabel, { color: colors.text.secondary }]}>Arrivée prévue</Text>
              <Text style={[styles.estValue, { color: colors.text.primary }]}>{estArrival}</Text>
            </View>
          )}
        </View>
      )}

      {info.length > 0 && (
        <View style={[styles.infoGrid, { borderTopColor: colors.border }]}>
          {info.map((row) => (
            <View key={row.label} style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>{row.label}</Text>
              <Text style={[styles.infoValue, { color: colors.text.primary }]} numberOfLines={1}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginBottom: 14, padding: 14, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '800' },
  timeline: { gap: 0 },
  row: { flexDirection: 'row', gap: 11 },
  railCol: { alignItems: 'center', width: 22 },
  dot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  rail: { width: 2, flex: 1, marginVertical: 2, minHeight: 14 },
  rowText: { flex: 1, paddingBottom: 14 },
  rowLabel: { fontSize: 13.5, fontWeight: '700' },
  rowValue: { fontSize: 12.5, fontWeight: '600', marginTop: 1 },
  empty: { fontSize: 13, fontWeight: '600' },
  estimateRow: { flexDirection: 'row', gap: 12, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 12, marginTop: 2 },
  estimate: { flex: 1 },
  estLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  estValue: { fontSize: 13.5, fontWeight: '800', marginTop: 3 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 12, marginTop: 12 },
  infoItem: { width: '47%' },
  infoLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  infoValue: { fontSize: 13.5, fontWeight: '700', marginTop: 3 },
});

export default ContainerKeyInfoCard;
