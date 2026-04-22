import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Card } from '@src/shared/ui/Card';
import { Button } from '@src/shared/ui/Button';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { CargoBag } from '../../types';

interface Props {
  goodsList: any[];
  cargoBags?: CargoBag[];
  airwayBillId: string;
  onAssignPress: () => void;
}

export const AirwayBillGoodsList: React.FC<Props> = ({ goodsList, cargoBags = [], onAssignPress }) => {
  const { colors } = useAppTheme();
  const hasGoods = goodsList.length > 0;

  const bagMap = useMemo(() => {
    const map = new Map<string, CargoBag>();
    for (const bag of cargoBags) {
      for (const goods of bag.goodsIds || []) {
        const goodsId = typeof goods === 'string' ? goods : (goods as any)._id;
        if (goodsId) map.set(goodsId, bag);
      }
    }
    return map;
  }, [cargoBags]);

  const getBagInfo = (goods: any) => {
    const goodsId = typeof goods === 'string' ? goods : (goods as any)._id;
    const bag = goodsId ? bagMap.get(goodsId) : undefined;
    if (bag) {
      return { label: bag.bagNumber, color: colors.primary[600] };
    }
    return { label: 'Non assigné à un sac', color: colors.text.disabled };
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Marchandises ({goodsList.length})
      </Text>
      {!hasGoods ? (
        <EmptyState
          icon="cube-outline"
          title="Aucune marchandise assignée"
          actionLabel="Assigner des marchandises"
          onAction={onAssignPress}
        />
      ) : (
        <>
          {goodsList.map((goods) => {
            const bagInfo = getBagInfo(goods);
            return (
              <Card key={goods._id || goods} style={styles.goodsCard} padding="medium">
                <Text style={[styles.goodsId, { color: colors.text.primary }]}>
                  {typeof goods === 'string' ? goods : goods.goodsId}
                </Text>
                {goods.description && (
                  <Text style={[styles.goodsDesc, { color: colors.text.secondary }]}>{goods.description}</Text>
                )}
                {goods.status && (
                  <Text style={[styles.goodsStatus, { color: colors.text.disabled }]}>Statut: {goods.status}</Text>
                )}
                <Text style={[styles.bagInfo, { color: bagInfo.color }]}>
                  Sac: {bagInfo.label}
                </Text>
              </Card>
            );
          })}
          <Button
            title="+ Assigner plus de marchandises"
            onPress={onAssignPress}
            variant="outline"
            fullWidth
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  goodsCard: {
    marginBottom: 8,
  },
  goodsId: {
    fontSize: 14,
    fontWeight: '700',
  },
  goodsDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  goodsStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  bagInfo: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
