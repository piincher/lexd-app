import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { hapticLight } from '@src/shared/lib/haptics';

interface StatItem {
  id: string;
  label: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  screen: string;
}

const STATS: StatItem[] = [
  {
    id: 'orders',
    label: 'Commandes',
    icon: 'clipboard-list-outline',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59,130,246,0.1)',
    screen: 'PastOrders',
  },
  {
    id: 'goods',
    label: 'Marchandises',
    icon: 'cube-outline',
    iconColor: '#22C55E',
    iconBg: 'rgba(34,197,94,0.1)',
    screen: 'MyGoods',
  },
  {
    id: 'containers',
    label: 'Conteneurs',
    icon: 'truck-outline',
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.1)',
    screen: 'MyContainers',
  },
  {
    id: 'support',
    label: 'Support',
    icon: 'headset',
    iconColor: '#3B82F6',
    iconBg: 'rgba(59,130,246,0.1)',
    screen: 'TicketList',
  },
];

interface Props {
  onNavigate: (screen: string) => void;
}

export const QuickStatsGrid: React.FC<Props> = ({ onNavigate }) => {
  const { colors, isDark } = useAppTheme();
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';

  return (
    <View style={styles.quickStatsRow}>
      {STATS.map((stat) => (
        <Pressable
          key={stat.id}
          style={[styles.quickStatCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
          onPress={() => {
            hapticLight();
            onNavigate(stat.screen);
          }}
        >
          <View style={[styles.quickStatIcon, { backgroundColor: stat.iconBg }]}>
            <MaterialCommunityIcons name={stat.icon as any} size={20} color={stat.iconColor} />
          </View>
          <Text style={[styles.quickStatLabel, { color: colors.text.secondary }]}>
            {stat.label}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color={colors.text.disabled} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 16,
  },
  quickStatCard: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: { elevation: 1 },
    }),
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickStatLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
});

export default QuickStatsGrid;
