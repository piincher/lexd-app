import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

export const SectionHeader: React.FC = () => {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        <Ionicons name="list-outline" size={18} color={Theme.neutral[600]} />
        <Text style={styles.sectionHeaderTitle}>Séquence de Chargement</Text>
      </View>
      <Text style={styles.sectionHeaderSubtitle}>Du plus lourd au plus léger</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  sectionHeaderSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
    fontStyle: 'italic',
  },
});
