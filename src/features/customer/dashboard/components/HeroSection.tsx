import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { DashboardStats } from '../types';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

type DashboardUser = { firstName?: string } | null | undefined;
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface Props {
  user: DashboardUser;
  welcomeMessage: string;
  stats: DashboardStats;
  onViewGoods?: () => void;
  onViewContainers?: () => void;
  onNotifications?: () => void;
}

const fmtN = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

export const HeroSection: React.FC<Props> = ({
  user,
  welcomeMessage,
  stats,
  onViewGoods,
  onViewContainers,
  onNotifications,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: { paddingHorizontal: 16, paddingTop: 8 },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        },
        greeting: { fontSize: 13, fontWeight: '500', color: colors.text.secondary, marginBottom: 2 },
        name: { fontSize: 22, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5 },
        heroCard: {
          borderRadius: 24,
          padding: 20,
          overflow: 'hidden',
        },
        heroContent: { gap: 18 },
        statRow: { flexDirection: 'row', gap: 8 },
        statPill: {
          flex: 1,
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 12,
          alignItems: 'center',
          gap: 6,
        },
        statIcon: {
          width: 36,
          height: 36,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
        statValue: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
        statLabel: { fontSize: 11, fontWeight: '600', opacity: 0.7 },
      }),
    [colors]
  );

  const statItems = [
    { icon: 'cube' as IoniconName, value: fmtN(stats.totalGoods), label: 'Marchandises', tint: colors.primary.main, onPress: onViewGoods },
    { icon: 'boat' as IoniconName, value: fmtN(stats.activeContainers), label: 'En transit', tint: colors.status.info, onPress: onViewContainers },
    // { icon: 'cash', value: `${fmtC(stats.totalSpent)}F`, label: 'Dépensé', tint: colors.status.success, onPress: onViewSpent },
  ];

  const gradColors = isDark
    ? ([`${colors.primary.main}15`, `${colors.status.info}08`] as const)
    : ([`${colors.primary.main}08`, `${colors.status.info}04`] as const);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>{welcomeMessage.split(',')[0]},</Text>
          <Text style={styles.name}>{user?.firstName || 'Client'}</Text>
        </View>
        <Pressable onPress={onNotifications}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: RADIUS.control,
              backgroundColor: colors.background.card,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: HAIRLINE,
              borderColor: colors.border,
            }}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.text.primary} />
          </View>
        </Pressable>
      </View>

      <LinearGradient colors={gradColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
        <View style={styles.heroContent}>
          <View style={styles.statRow}>
            {statItems.map((s) => (
              <Pressable
                key={s.label}
                onPress={s.onPress}
                style={({ pressed }) => [
                  styles.statPill,
                  { backgroundColor: `${s.tint}12` },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <View style={[styles.statIcon, { backgroundColor: `${s.tint}18` }]}>
                  <Ionicons name={s.icon} size={18} color={s.tint} />
                </View>
                <Text style={[styles.statValue, { color: colors.text.primary }]}>{s.value}</Text>
                <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HeroSection;
