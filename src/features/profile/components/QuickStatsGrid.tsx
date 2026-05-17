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

interface Props {
  onNavigate: (screen: string) => void;
}

export const QuickStatsGrid: React.FC<Props> = ({ onNavigate }) => {
  const { colors } = useAppTheme();
  const cardBg = colors.background.card;
  const cardBorder = colors.border;

  const STATS: StatItem[] = [
    {
      id: 'orders',
      label: 'Commandes',
      icon: 'clipboard-list-outline',
      iconColor: colors.status.info,
      iconBg: colors.status.info + '15',
      screen: 'PastOrders',
    },
    {
      id: 'goods',
      label: 'Marchandises',
      icon: 'cube-outline',
      iconColor: colors.status.success,
      iconBg: colors.status.success + '15',
      screen: 'MyGoods',
    },
    {
      id: 'containers',
      label: 'Conteneurs',
      icon: 'truck-outline',
      iconColor: colors.status.warning,
      iconBg: colors.status.warning + '15',
      screen: 'MyContainers',
    },
    {
      id: 'support',
      label: 'Support',
      icon: 'headset',
      iconColor: colors.status.info,
      iconBg: colors.status.info + '15',
      screen: 'TicketList',
    },
  ];

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
