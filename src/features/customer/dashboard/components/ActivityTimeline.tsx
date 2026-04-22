import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ActivityItem, ActivityType, ACTIVITY_TYPE_COLORS, ACTIVITY_TYPE_ICONS } from '../types';

interface Props {
  activities: ActivityItem[];
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxItems?: number;
}

const formatTimeAgo = (ts: string): string => {
  const now = new Date();
  const d = new Date(ts);
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days} jours`;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

export const ActivityTimeline: React.FC<Props> = ({
  activities,
  showViewAll = false,
  onViewAll,
  maxItems = 5,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginTop: 28, paddingHorizontal: 16, paddingBottom: 40 },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        },
        title: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
        viewAll: { fontSize: 13, fontWeight: '700', color: colors.primary.main },
        empty: { alignItems: 'center', paddingVertical: 40, gap: 10 },
        emptyText: { fontSize: 14, fontWeight: '500', color: colors.text.secondary },
        item: { flexDirection: 'row', gap: 14 },
        lineCol: { width: 36, alignItems: 'center' },
        dot: {
          width: 36,
          height: 36,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        },
        vLine: {
          width: 2,
          flex: 1,
          marginTop: -4,
          marginBottom: -4,
        },
        content: { flex: 1, paddingBottom: 20 },
        row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        itemTitle: { fontSize: 14, fontWeight: '700', color: colors.text.primary, flex: 1 },
        time: { fontSize: 12, fontWeight: '600', color: colors.text.disabled },
        desc: { fontSize: 13, lineHeight: 18, color: colors.text.secondary, marginTop: 2 },
      }),
    [colors]
  );

  const display = activities.slice(0, maxItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activité Récente</Text>
        {showViewAll && activities.length > 0 && (
          <Text style={styles.viewAll} onPress={onViewAll}>
            Voir tout
          </Text>
        )}
      </View>

      {display.length === 0 ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="bell-off-outline" size={40} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucune activité récente</Text>
        </View>
      ) : (
        display.map((item, index) => {
          const color = ACTIVITY_TYPE_COLORS[item.type as ActivityType] || colors.primary.main;
          const icon = ACTIVITY_TYPE_ICONS[item.type as ActivityType] || 'bell';
          const isLast = index === display.length - 1;

          return (
            <View key={item.id} style={styles.item}>
              <View style={styles.lineCol}>
                <View style={[styles.dot, { backgroundColor: `${color}12` }]}>
                  <MaterialCommunityIcons name={icon as any} size={18} color={color} />
                </View>
                {!isLast && (
                  <View style={[styles.vLine, { backgroundColor: colors.border }]} />
                )}
              </View>
              <View style={[styles.content, isLast && { paddingBottom: 0 }]}>
                <View style={styles.row}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.time}>{formatTimeAgo(item.timestamp)}</Text>
                </View>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
};

export default ActivityTimeline;
