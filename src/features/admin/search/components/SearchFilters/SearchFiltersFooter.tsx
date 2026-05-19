/**
 * SearchFiltersFooter - Footer with apply button
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const SearchFiltersFooter: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <LinearGradient colors={['transparent', colors.background.card]} style={styles.footer}>
      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.applyButton}
        buttonColor={colors.primary[500]}
      >
        Appliquer les filtres
      </Button>
    </LinearGradient>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  footer: {
    padding: 16,
    paddingTop: 24,
  },
  applyButton: {
    borderRadius: 8,
  },
});
