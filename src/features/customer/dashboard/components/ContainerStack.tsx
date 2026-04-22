import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerInfo {
  id: string;
  virtualContainerNumber: string;
  status: string;
  shippingMode?: string;
  shippingLine?: string;
  timeline?: { departedAt?: string; arrivedAt?: string; estimatedArrival?: string };
}

interface Props {
  containers: ContainerInfo[];
  onContainerPress?: (containerId: string) => void;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  LOADING: { label: 'Chargement', color: '#F59E0B', icon: 'cube-outline' },
  LOADED: { label: 'Chargé', color: '#0EA5E9', icon: 'cube' },
  IN_TRANSIT: { label: 'En Transit', color: '#8B5CF6', icon: 'airplane' },
  ARRIVED: { label: 'Arrivé', color: '#10B981', icon: 'flag' },
  READY_FOR_PICKUP: { label: 'Prêt', color: '#22C55E', icon: 'checkmark-circle' },
  DELIVERED: { label: 'Livré', color: '#059669', icon: 'home' },
};

const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : '');

export const ContainerStack: React.FC<Props> = ({ containers, onContainerPress }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginTop: 28, paddingHorizontal: 16 },
        header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
        title: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
        badge: {
          backgroundColor: `${colors.primary.main}12`,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 3,
        },
        badgeText: { fontSize: 11, fontWeight: '700', color: colors.primary.main },
        stack: { gap: 10 },
        card: {
          backgroundColor: colors.background.card,
          borderRadius: 20,
          flexDirection: 'row',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        },
        accent: { width: 4 },
        content: { flex: 1, padding: 16, gap: 10 },
        topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
        modeCircle: {
          width: 42,
          height: 42,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
        number: { fontSize: 15, fontWeight: '800', color: colors.text.primary },
        sub: { fontSize: 12, color: colors.text.disabled, marginTop: 1 },
        pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
        pillText: { fontSize: 11, fontWeight: '700' },
        timeline: { flexDirection: 'row', gap: 20, marginLeft: 54 },
        tlItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
        tlText: { fontSize: 11, color: colors.text.disabled },
      }),
    [colors, isDark]
  );

  const active = containers.filter((c) => c.status !== 'DELIVERED' && c.status !== 'COMPLETED');
  if (active.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Containers Actifs</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{active.length}</Text>
        </View>
      </View>

      <View style={styles.stack}>
        {active.slice(0, 3).map((c) => {
          const cfg = STATUS_MAP[c.status] || STATUS_MAP.LOADING;
          const isAir = c.shippingMode?.toLowerCase() === 'air' || c.shippingMode?.toLowerCase() === 'aerien';
          return (
            <Pressable key={c.id} style={styles.card} onPress={() => onContainerPress?.(c.id)}>
              <View style={[styles.accent, { backgroundColor: cfg.color }]} />
              <View style={styles.content}>
                <View style={styles.topRow}>
                  <View style={styles.left}>
                    <View style={[styles.modeCircle, { backgroundColor: `${cfg.color}10` }]}>
                      <Ionicons name={isAir ? 'airplane' : 'boat'} size={20} color={cfg.color} />
                    </View>
                    <View>
                      <Text style={styles.number}>{c.virtualContainerNumber || 'N/A'}</Text>
                      <Text style={styles.sub}>
                        {isAir ? 'Aérien' : 'Maritime'}
                        {c.shippingLine ? ` • ${c.shippingLine}` : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.pill, { backgroundColor: `${cfg.color}10` }]}>
                    <Ionicons name={cfg.icon as any} size={12} color={cfg.color} />
                    <Text style={[styles.pillText, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
                {(c.timeline?.departedAt || c.timeline?.arrivedAt) && (
                  <View style={styles.timeline}>
                    {c.timeline.departedAt && (
                      <View style={styles.tlItem}>
                        <Ionicons name="arrow-up-circle-outline" size={12} color={colors.text.disabled} />
                        <Text style={styles.tlText}>Départ {fmtDate(c.timeline.departedAt)}</Text>
                      </View>
                    )}
                    {c.timeline.arrivedAt && (
                      <View style={styles.tlItem}>
                        <Ionicons name="arrow-down-circle-outline" size={12} color={colors.text.disabled} />
                        <Text style={styles.tlText}>Arrivée {fmtDate(c.timeline.arrivedAt)}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ContainerStack;
