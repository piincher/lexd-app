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
    {
      id: 'orders',
      label: 'Commandes',
      subtitle: 'Suivre les demandes',
      icon: 'clipboard-list-outline',
      iconColor: colors.status.info,
      iconBg: colors.status.info + '15',
      screen: 'Orders',
    },
    {
      id: 'goods',
      label: 'Marchandises',
      subtitle: 'Voir les colis',
      icon: 'cube-outline',
      iconColor: colors.status.success,
      iconBg: colors.status.success + '15',
      screen: 'MyGoods',
    },
    {
      id: 'containers',
      label: 'Expéditions',
      subtitle: 'Containers actifs',
      icon: 'truck-outline',
      iconColor: colors.status.warning,
      iconBg: colors.status.warning + '15',
      screen: 'MyContainers',
    },
    {
      id: 'support',
      label: 'Support',
      subtitle: 'Tickets et aide',
      icon: 'headset',
      iconColor: colors.status.info,
      iconBg: colors.status.info + '15',
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
