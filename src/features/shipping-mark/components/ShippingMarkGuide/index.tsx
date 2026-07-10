import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

const STEPS = [
  "Téléchargez la marque d'expédition ci-dessous.",
  "Envoyez-la à votre fournisseur.",
  "Demandez à votre fournisseur de l'imprimer et de la coller sur chaque colis.",
];

export const ShippingMarkGuide: React.FC = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Comment l&apos;utiliser ?
      </Text>
      {STEPS.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={[styles.badge, { backgroundColor: colors.primary.main }]}>
            <Text style={[styles.badgeText, { color: colors.text.inverse }]}>{index + 1}</Text>
          </View>
          <Text style={[styles.stepText, { color: colors.text.secondary }]}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
