import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  goodsByStatus: Record<string, number>;
  totalGoods: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStages = (colors: any) => [
  { key: 'received', label: 'Reçu', icon: 'archive-outline', color: colors.status.info },
  { key: 'inContainer', label: 'Chargé', icon: 'cube-outline', color: colors.accent.mint },
  { key: 'inTransit', label: 'Transit', icon: 'airplane-outline', color: colors.status.warning },
  { key: 'arrived', label: 'Arrivé', icon: 'flag-outline', color: colors.status.success },
  { key: 'ready', label: 'Prêt', icon: 'checkmark-circle-outline', color: colors.primary.main },
  { key: 'delivered', label: 'Livré', icon: 'home-outline', color: colors.primary.dark },
];

export const JourneyMap: React.FC<Props> = ({ goodsByStatus, totalGoods }) => {
  const { colors } = useAppTheme();
  const STAGES = getStages(colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginTop: 28, paddingHorizontal: 16 },
        header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
        title: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
        totalBadge: {
          backgroundColor: `${colors.primary.main}12`,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 4,
        },
        totalText: { fontSize: 12, fontWeight: '700', color: colors.primary.main },
        scroll: { marginHorizontal: -16, paddingHorizontal: 16 },
        track: { flexDirection: 'row', alignItems: 'flex-start' },
        stage: { alignItems: 'center', width: 72 },
        dotWrapper: {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2.5,
        },
        pulse: {
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: 20,
        },
        line: {
          width: 32,
          height: 3,
          borderRadius: 2,
          marginTop: 18,
        },
        label: { fontSize: 10, fontWeight: '700', marginTop: 8, textAlign: 'center' },
        count: { fontSize: 12, fontWeight: '800', marginTop: 2 },
        emptyState: {
          alignItems: 'center',
          paddingVertical: 32,
          borderRadius: 16,
          marginHorizontal: 16,
          gap: 8,
        },
        emptyTitle: { fontSize: 14, fontWeight: '700', marginTop: 4 },
        emptyText: { fontSize: 12, textAlign: 'center', paddingHorizontal: 24 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Parcours d'Expédition</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>{totalGoods} total</Text>
        </View>
      </View>

      {totalGoods === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.background.card }]}>
          <Ionicons name="cube-outline" size={40} color={colors.text.disabled} />
          <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
            Aucune marchandise
          </Text>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Vos marchandises apparaîtront ici une fois enregistrées.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.track}>
            {STAGES.map((stage, index) => {
              const count = goodsByStatus[stage.key] || 0;
              const isActive = count > 0;
              const isLast = index === STAGES.length - 1;

              return (
                <React.Fragment key={stage.key}>
                  <View style={styles.stage}>
                    <View
                      style={[
                        styles.dotWrapper,
                        {
                          borderColor: isActive ? stage.color : colors.neutral[300],
                          backgroundColor: isActive ? `${stage.color}15` : colors.background.card,
                        },
                      ]}
                    >
                      {isActive && (
                        <View style={[styles.pulse, { backgroundColor: `${stage.color}25` }]} />
                      )}
                      <Ionicons
                        name={stage.icon as any}
                        size={isActive ? 18 : 16}
                        color={isActive ? stage.color : colors.text.disabled}
                      />
                    </View>
                    <Text
                      style={[
                        styles.label,
                        { color: isActive ? colors.text.secondary : colors.text.disabled },
                      ]}
                    >
                      {stage.label}
                    </Text>
                    <Text style={[styles.count, { color: isActive ? stage.color : colors.text.disabled }]}>
                      {count}
                    </Text>
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor: isActive ? stage.color : colors.neutral[200],
                        },
                      ]}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default JourneyMap;
