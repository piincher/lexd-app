/**
 * CargoBagSection — the "Sacs" tab of the Airway Bill detail screen.
 *
 * Renders bag cards with a plain map (not a FlashList) so it composes safely
 * inside the screen's ScrollView — fixing the previous nested-virtualized-list
 * warning and the double pull-to-refresh. A short explainer makes the
 * AWB → Sacs → Marchandises relationship explicit.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { CargoBag } from '../../types';
import { CargoBagCard } from './CargoBagCard';

interface CargoBagSectionProps {
  cargoBags: CargoBag[];
  onBagPress: (id: string) => void;
  onCreatePress: () => void;
  loading?: boolean;
}

export const CargoBagSection: React.FC<CargoBagSectionProps> = ({
  cargoBags,
  onBagPress,
  onCreatePress,
  loading = false,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Sacs de cargo</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Regroupez vos marchandises en sacs pour le suivi et le dédouanement.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onCreatePress}
          style={[styles.createButton, { backgroundColor: colors.primary.main }]}
        >
          <Ionicons name="add" size={16} color={colors.text.inverse} />
          <Text style={[styles.createButtonText, { color: colors.text.inverse }]}>Sac</Text>
        </TouchableOpacity>
      </View>

      {loading && cargoBags.length === 0 ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      ) : cargoBags.length === 0 ? (
        <EmptyState
          icon="bag-personal-off-outline"
          title="Aucun sac de cargo"
          message="Ce AWB ne contient encore aucun sac. Créez-en un pour y regrouper des marchandises."
          actionLabel="Créer un sac"
          onAction={onCreatePress}
        />
      ) : (
        cargoBags.map((bag) => <CargoBagCard key={bag._id} item={bag} onPress={onBagPress} />)
      )}

      {cargoBags.length > 0 && (
        <View style={[styles.hint, { backgroundColor: colors.background.paper }]}>
          <MaterialCommunityIcons name="gesture-tap" size={14} color={colors.text.muted} />
          <Text style={[styles.hintText, { color: colors.text.muted }]}>
            Touchez un sac pour gérer ses marchandises et son statut.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  titleWrap: { flex: 1 },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 2, lineHeight: 16 },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },
  createButtonText: { fontSize: 13, fontWeight: '700' },
  loading: { paddingVertical: 32, alignItems: 'center' },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 10 },
  hintText: { fontSize: 11, fontWeight: '500', flex: 1 },
});

export default CargoBagSection;
