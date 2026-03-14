import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Goods } from '../../../goods/types';
import { Theme } from '../../../../../shared/ui';
import { styles } from '../ContainerDetailScreen.styles';

interface ContainerGoodsListProps {
  goodsList: Goods[];
  onRemoveGoods: (goodsId: string) => void;
  onMarkDelivered: (goodsId: string) => void;
}

export const ContainerGoodsList: React.FC<ContainerGoodsListProps> = ({
  goodsList,
  onRemoveGoods,
  onMarkDelivered,
}) => {
  if (goodsList.length === 0) {
    return (
      <Animated.View entering={FadeInUp} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Ionicons name="cube" size={20} color={Theme.primary[600]} />
            <Text style={styles.cardTitle}>Marchandises Assignées</Text>
          </View>
        </View>
        <View style={styles.emptyGoods}>
          <LinearGradient
            colors={['#F3F0FF', '#EDE9FE']}
            style={styles.emptyIconBg}
          >
            <Ionicons name="cube-outline" size={48} color={Theme.primary[400]} />
          </LinearGradient>
          <Text style={styles.emptyTitle}>Aucune marchandise</Text>
          <Text style={styles.emptySubtitle}>
            Ce container est vide. Assignez des marchandises pour commencer.
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInUp} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Ionicons name="cube" size={20} color={Theme.primary[600]} />
          <Text style={styles.cardTitle}>Marchandises Assignées</Text>
        </View>
        <View style={styles.goodsCountBadge}>
          <Text style={styles.goodsCountText}>{goodsList.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.goodsList} showsVerticalScrollIndicator={false}>
        {goodsList.map((goods, index) => (
          <Animated.View
            key={goods._id}
            entering={FadeInUp.delay(index * 50)}
            style={styles.goodsItem}
          >
            <View style={styles.goodsIcon}>
              <Ionicons name="cube" size={20} color={Theme.primary[500]} />
            </View>
            <View style={styles.goodsInfo}>
              <View style={styles.goodsIdRow}>
                <Text style={styles.goodsId}>{goods.goodsId}</Text>
                {goods.status === 'READY_FOR_PICKUP' && (
                  <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[styles.statusBadgeText, { color: '#D97706' }]}>
                      Prêt
                    </Text>
                  </View>
                )}
                {goods.status === 'DELIVERED' && (
                  <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
                    <Ionicons name="checkmark" size={10} color="#059669" />
                    <Text style={[styles.statusBadgeText, { color: '#059669' }]}>
                      Livré
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.goodsDescription} numberOfLines={1}>
                {goods.description}
              </Text>
              <View style={styles.goodsMeta}>
                <Text style={styles.goodsMetaText}>
                  {(goods.actualCBM || 0).toFixed(2)} m³
                </Text>
                <Text style={styles.goodsMetaDot}>•</Text>
                <Text style={styles.goodsMetaText}>{goods.weight} kg</Text>
              </View>
            </View>
            <View style={styles.goodsActions}>
              {goods.status === 'READY_FOR_PICKUP' && (
                <TouchableOpacity
                  style={styles.deliverButton}
                  onPress={() => onMarkDelivered(goods._id)}
                >
                  <Ionicons name="checkmark-done" size={20} color={Theme.status.success} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemoveGoods(goods._id)}
              >
                <Ionicons name="close-circle" size={24} color={Theme.status.error} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default ContainerGoodsList;
