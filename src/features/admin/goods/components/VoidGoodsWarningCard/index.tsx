/**
 * VoidGoodsWarningCard - Warning card for void goods screen
 * SRP: Display void warning message
 */

import React from 'react';
import { Text } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './VoidGoodsWarningCard.styles';

export const VoidGoodsWarningCard: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>⚠️ Warning</Text>
      <Text style={styles.text}>
        Voiding goods will permanently mark them as cancelled. This action cannot be undone.
      </Text>
    </Card>
  );
};
