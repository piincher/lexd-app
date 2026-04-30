/**
 * SearchFiltersFooter - Footer with apply button
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

export const SearchFiltersFooter: React.FC = () => {
  return (
    <LinearGradient colors={['transparent', '#FFFFFF']} style={styles.footer}>
      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.applyButton}
        buttonColor={Theme.primary[500]}
      >
        Appliquer les filtres
      </Button>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  applyButton: {
    borderRadius: Theme.radius.lg,
  },
});
