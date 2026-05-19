import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Goods } from '../../../../goods/types';
import { normalizePhotos } from '@src/shared/lib';
import { GoodsListItemCheckbox } from './GoodsListItemCheckbox';
import { GoodsListItemImage } from './GoodsListItemImage';
import { GoodsListItemInfo } from './GoodsListItemInfo';
import { createStyles } from './GoodsListItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListItemProps {
  goods: Goods;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

export const GoodsListItem: React.FC<GoodsListItemProps> = ({
  goods,
  isSelected,
  onToggle,
  index,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const clientName = (() => {
    if (typeof goods.clientId === 'object' && goods.clientId) {
      return `${goods.clientId.firstName} ${goods.clientId.lastName}`;
    }
    return 'Client inconnu';
  })();

  const photoUrls = normalizePhotos(goods);

  return (
    <Animated.View entering={FadeInUp.delay(index * 50).springify()} layout={Layout.springify()}>
      <TouchableOpacity style={[styles.goodsCard, isSelected && styles.goodsCardSelected]} onPress={onToggle}>
        <GoodsListItemCheckbox isSelected={isSelected} />
        <GoodsListItemImage photoUrls={photoUrls} />
        <GoodsListItemInfo goods={goods} clientName={clientName} />
      </TouchableOpacity>
    </Animated.View>
  );
};
