import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardSettings } from '../types';
import { createStyles } from './RewardEarningRules.styles';

interface RewardEarningRulesProps {
  settings: RewardSettings;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RewardEarningRules: React.FC<RewardEarningRulesProps> = ({ settings }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const rules = [
    {
      icon: 'ship',
      color: colors.accent.sky,
      title: 'Expédition maritime',
      description: `Gagnez ${settings.pointsPerCbmUnit} points pour chaque tranche de ${settings.cbmUnit} CBM livrée.`,
      example: `Ex: 2.5 CBM → ${Math.floor(2.5 / settings.cbmUnit) * settings.pointsPerCbmUnit} points`,
    },
    {
      icon: 'airplane',
      color: colors.accent.coral,
      title: 'Expédition aérienne',
      description: `Gagnez ${settings.pointsPerKgUnit} points pour chaque tranche de ${settings.kgUnit} kg livrée.`,
      example: `Ex: 50 kg → ${Math.floor(50 / settings.kgUnit) * settings.pointsPerKgUnit} points`,
    },
    {
      icon: 'ticket-percent-outline',
      color: colors.primary.main,
      title: 'Utilisation des points',
      description: `Valeur: ${formatFCFA(settings.pointValueFCFA)} par point. Réduction max: ${settings.maxInvoiceDiscountPercent}% du solde.`,
      example: `Min: ${settings.minRedemptionPoints} points par demande`,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Comment gagner des points</Text>
      {rules.map((rule, index) => (
        <View key={index} style={styles.ruleCard}>
          <View style={[styles.iconCircle, { backgroundColor: rule.color + '14' }]}>
            <MaterialCommunityIcons name={rule.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']} size={20} color={rule.color} />
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>{rule.title}</Text>
            <Text style={styles.ruleDescription}>{rule.description}</Text>
            <Text style={styles.ruleExample}>{rule.example}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
