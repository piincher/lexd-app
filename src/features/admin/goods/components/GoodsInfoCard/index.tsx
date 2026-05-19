/**
 * GoodsInfoCard - Display basic goods information
 * SRP: Show goods ID, description, created date, and last updated
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Card } from '@src/shared/ui/Card';
import { Goods } from '@src/shared/types/goods';
import { createStyles } from './GoodsInfoCard.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsInfoCardProps {
  goods: Goods;
}

export const GoodsInfoCard: React.FC<GoodsInfoCardProps> = ({ goods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const formattedCreatedAt = format(new Date(goods.createdAt), 'dd MMM yyyy', { locale: fr });
  const formattedUpdatedAt = format(new Date(goods.updatedAt), 'dd MMM yyyy', { locale: fr });

  return (
    <Card variant="elevated" style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="package-variant" size={20} color={colors.primary[600]} />
        <Text style={styles.title}>Marchandise</Text>
      </View>

      <View style={styles.idBadge}>
        <Text style={styles.idText}>{goods.goodsId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Créée le:</Text>
        <Text style={styles.value}>{formattedCreatedAt}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Mise à jour:</Text>
        <Text style={styles.value}>{formattedUpdatedAt}</Text>
      </View>

      {goods.description && (
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{goods.description}</Text>
        </View>
      )}
    </Card>
  );
};
