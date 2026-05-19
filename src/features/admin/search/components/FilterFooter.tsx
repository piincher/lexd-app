import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './FilterSectionContainer.styles';

export const FilterFooter: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <LinearGradient colors={['transparent', colors.background.card]} style={styles.footer}>
      <Button mode="contained" onPress={() => {}} style={styles.applyButton} buttonColor={colors.primary[500]}>
        Appliquer les filtres
      </Button>
    </LinearGradient>
  );
};
