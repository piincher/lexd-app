import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

const STEPS = [
  { icon: 'navigate-outline' as const, label: 'Choisir Air ou Mer' },
  { icon: 'share-social-outline' as const, label: 'Ouvrir le partage' },
  { icon: 'checkmark-circle-outline' as const, label: 'Envoyer au fournisseur' },
];

export const WarehouseAddressIntro: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.titleRow}>
        <View style={[styles.icon, { backgroundColor: `${colors.primary.main}14` }]}>
          <Ionicons name="business-outline" size={22} color={colors.primary.main} />
        </View>
        <View style={styles.titleCopy}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Envoyez la bonne adresse</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Une fiche image prête pour votre fournisseur en Chine.</Text>
        </View>
      </View>
      <View style={[styles.steps, { borderTopColor: colors.border }]}>
        {STEPS.map((step, index) => (
          <View key={step.label} style={styles.step}>
            <View style={[styles.stepNumber, { backgroundColor: colors.primary.main }]}>
              <Text style={[styles.stepNumberText, { color: colors.text.inverse }]}>{index + 1}</Text>
            </View>
            <Ionicons name={step.icon} size={16} color={colors.text.secondary} />
            <Text style={[styles.stepText, { color: colors.text.secondary }]}>{step.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: 18, overflow: 'hidden' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  icon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  titleCopy: { flex: 1, gap: 3 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: -0.25 },
  subtitle: { fontSize: 13, lineHeight: 18 },
  steps: { borderTopWidth: StyleSheet.hairlineWidth, padding: 12, gap: 8 },
  step: { minHeight: 32, flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepNumber: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontSize: 11, fontWeight: '900' },
  stepText: { flex: 1, fontSize: 13, fontWeight: '600' },
});
