import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PointsBalanceHeader.styles';

interface PointsBalanceHeaderProps {
  points: number;
  pointValueFCFA: number;
}

const formatFCFA = (value: number) =>
  `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const PointsBalanceHeader: React.FC<PointsBalanceHeaderProps> = ({
  points,
  pointValueFCFA,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const value = points * pointValueFCFA;

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name="wallet-giftcard"
          size={24}
          color={colors.primary.main}
        />
      </View>
      <Text style={styles.label}>Points disponibles</Text>
      <Text style={styles.value}>{points.toLocaleString('fr-FR')}</Text>
      <Text style={styles.subValue}>≈ {formatFCFA(value)}</Text>
    </View>
  );
};
