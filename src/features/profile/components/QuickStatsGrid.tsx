import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AppTheme } from '@src/constants/Theme';
import { ProfileSectionHeader } from './ProfileSectionHeader';
import { ProfileQuickActionCard } from './ProfileQuickActionCard';

type ThemeColors = AppTheme['colors'];
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface StatItem {
  id: string;
  label: string;
  subtitle: string;
  icon: MaterialIconName;
  iconColor: string;
  iconBg: string;
  screen: string;
}

interface Props {
  onNavigate: (screen: string) => void;
}

export const QuickStatsGrid: React.FC<Props> = ({ onNavigate }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const STATS: StatItem[] = [
    // Orders, Marchandises and Expéditions were three tiles pointing at three
    // tabs that were three views of the same shipment. They are now one.
    {
      id: 'shipments',
      label: 'Envois',
      subtitle: 'Suivre mes colis',
      icon: 'routes',
      iconColor: colors.primary.main,
      iconBg: colors.primary.main + '15',
      screen: 'Shipments',
    },
    {
      id: 'payments',
      label: 'Paiements',
      subtitle: 'Soldes et reçus',
      icon: 'wallet-outline',
      iconColor: colors.accent.amber,
      iconBg: colors.accent.amber + '15',
      screen: 'Payments',
    },
    {
      id: 'points',
      label: 'Points',
      subtitle: 'Fidélité et récompenses',
      icon: 'star-circle-outline',
      iconColor: colors.primary.main,
      iconBg: colors.primary.main + '15',
      screen: 'MemberPoints',
    },
    {
      id: 'support',
      label: 'Support',
      subtitle: 'Tickets et aide',
      icon: 'headset',
      iconColor: colors.text.secondary,
      iconBg: colors.text.secondary + '15',
      screen: 'TicketList',
    },
  ];

  return (
    <View style={styles.section}>
      <ProfileSectionHeader
        icon="view-grid-plus-outline"
        title="Accès rapides"
        subtitle="Les raccourcis utiles de votre compte"
      />
      <View style={styles.quickStatsRow}>
        {STATS.map((stat) => (
          <ProfileQuickActionCard
            key={stat.id}
            label={stat.label}
            subtitle={stat.subtitle}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBg={stat.iconBg}
            onPress={() => {
              onNavigate(stat.screen);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const createStyles = (_colors: ThemeColors) => StyleSheet.create({
  section: {
    marginTop: 2,
  },
  quickStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
});

export default QuickStatsGrid;
