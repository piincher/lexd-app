/**
 * VoidGoodsInfoCard - Info card showing goods details
 * SRP: Display tracking code and CBM
 */

import React from 'react';
import { Text } from 'react-native';
import { Card } from '@src/shared/ui/Card';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './VoidGoodsInfoCard.styles';

interface VoidGoodsInfoCardProps {
  trackingCode: string;
  cbm: number;
}

export const VoidGoodsInfoCard: React.FC<VoidGoodsInfoCardProps> = ({
  trackingCode,
  cbm,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.label}>Tracking Code</Text>
      <Text style={styles.value}>{trackingCode}</Text>
      <Text style={styles.label}>CBM</Text>
      <Text style={styles.value}>{cbm} m³</Text>
    </Card>
  );
};
