import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@src/components/ui/Badge/Badge';
import { Theme } from '@src/constants/Theme';
import { Goods } from '../../../../goods/types';
import { createStyles } from './GoodsListItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListItemInfoProps {
  goods: Goods;
  clientName: string;
}

export const GoodsListItemInfo: React.FC<GoodsListItemInfoProps> = ({ goods, clientName }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <View style={styles.goodsInfo}>
    <View style={styles.goodsHeader}>
      <Text style={styles.goodsId}>{goods.goodsId}</Text>
      <Badge
        label={goods.shippingMode === 'AIR' ? `${(parseFloat(String(goods.weight)) || 0).toFixed(2)} kg` : `${(goods.actualCBM || 0).toFixed(3)} m³`}
        variant="primary"
        size="small"
      />
    </View>
    <Text style={styles.description} numberOfLines={1}>{goods.description || 'Sans description'}</Text>
    <View style={styles.goodsMeta}>
      <View style={styles.metaItem}>
        <Ionicons name="person-outline" size={12} color={colors.neutral[400]} />
        <Text style={styles.metaText} numberOfLines={1}>{clientName}</Text>
      </View>
      <View style={styles.metaItem}>
        <Ionicons name="scale-outline" size={12} color={colors.neutral[400]} />
        <Text style={styles.metaText}>{goods.weight} kg</Text>
      </View>
    </View>
  </View>
  );
};
