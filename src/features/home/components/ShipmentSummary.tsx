import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StatCard } from './StatCard';
import { createStyles } from './ShipmentSummary.styles';

interface SummaryStats {
  total: number;
  warehouse: number;
  transit: number;
  delivered: number;
}

interface ShipmentSummaryProps {
  stats: SummaryStats;
  onViewAll?: () => void;
}

export const ShipmentSummary: React.FC<ShipmentSummaryProps> = ({ stats, onViewAll }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const STAT_CARDS = [
    { key: 'total' as const, label: 'Total', icon: 'package-variant', lib: 'mci' as const, color: colors.primary.dark },
    { key: 'warehouse' as const, label: 'Entrepôt', icon: 'home', lib: 'feather' as const, color: colors.status.warning },
    { key: 'transit' as const, label: 'Transit', icon: 'airplane', lib: 'mci' as const, color: colors.status.info },
    { key: 'delivered' as const, label: 'Livrés', icon: 'check-circle', lib: 'feather' as const, color: colors.status.success },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Résumé</Text>
        {onViewAll && (
          <Pressable onPress={onViewAll} style={styles.viewAllBtn}>
            <Text style={[styles.viewAllText, { color: colors.text.secondary }]}>Voir tout</Text>
            <Feather name="chevron-right" size={16} color={colors.text.secondary} />
          </Pressable>
        )}
      </View>

      <View style={styles.cardsRow}>
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={stats[card.key]}
            icon={card.icon}
            lib={card.lib}
            color={card.color}
          />
        ))}
      </View>
    </View>
  );
};

export default ShipmentSummary;
