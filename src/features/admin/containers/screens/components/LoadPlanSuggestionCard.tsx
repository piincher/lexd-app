import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { LoadPlan } from '../hooks/containerLoadPlan';

interface LoadPlanSuggestionCardProps {
  plan: LoadPlan;
  isApplying: boolean;
  onApply: () => void;
}

const fmt = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(2));

export const LoadPlanSuggestionCard: React.FC<LoadPlanSuggestionCardProps> = ({
  plan,
  isApplying,
  onApply,
}) => {
  const { colors } = useAppTheme();

  if (plan.capacity <= 0) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <View style={styles.header}>
          <Ionicons name="sparkles-outline" size={18} color={colors.primary[600]} />
          <Text style={[styles.title, { color: colors.text.primary }]}>Chargement intelligent</Text>
        </View>
        <Text style={[styles.empty, { color: colors.text.secondary }]}>
          Définissez la capacité du container pour activer les suggestions de chargement.
        </Text>
      </View>
    );
  }

  const hasSuggestion = plan.suggested.length > 0;
  const fillColor =
    plan.projectedFillPercentage >= 90
      ? colors.status.success
      : plan.projectedFillPercentage >= 70
        ? colors.status.warning
        : colors.primary[600];

  return (
    <View style={[styles.card, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Ionicons name="sparkles-outline" size={18} color={colors.primary[600]} />
        <Text style={[styles.title, { color: colors.text.primary }]}>Chargement intelligent</Text>
      </View>

      {hasSuggestion ? (
        <>
          <Text style={[styles.lead, { color: colors.text.secondary }]}>
            {plan.suggested.length} marchandise{plan.suggested.length > 1 ? 's' : ''} recommandée
            {plan.suggested.length > 1 ? 's' : ''} pour optimiser le remplissage
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: fillColor }]}>
                {plan.projectedFillPercentage.toFixed(0)}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Remplissage projeté</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>
                +{fmt(plan.addedSize)} {plan.unit}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Ajout suggéré</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>
                {fmt(Math.max(plan.remainingBefore - plan.addedSize, 0))} {plan.unit}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Espace restant</Text>
            </View>
          </View>

          {plan.skipped.length > 0 && (
            <Text style={[styles.skipped, { color: colors.text.secondary }]}>
              {plan.skipped.length} marchandise{plan.skipped.length > 1 ? 's' : ''} ne rentre
              {plan.skipped.length > 1 ? 'nt' : ''} pas dans l’espace restant.
            </Text>
          )}

          <Button
            mode="contained"
            icon="cube-send"
            loading={isApplying}
            disabled={isApplying}
            onPress={onApply}
            style={styles.button}
          >
            Charger {plan.suggested.length} marchandise{plan.suggested.length > 1 ? 's' : ''}
          </Button>
        </>
      ) : (
        <Text style={[styles.empty, { color: colors.text.secondary }]}>
          Aucune marchandise non assignée ne rentre dans l’espace restant
          ({fmt(plan.remainingBefore)} {plan.unit}).
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginBottom: 14, padding: 14, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '800' },
  lead: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1 },
  statValue: { fontSize: 17, fontWeight: '900' },
  statLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  skipped: { fontSize: 12, fontWeight: '600', marginTop: 10 },
  empty: { fontSize: 13, fontWeight: '600' },
  button: { marginTop: 14, borderRadius: 8 },
});

export default LoadPlanSuggestionCard;
