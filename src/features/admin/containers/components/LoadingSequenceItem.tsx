import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingListItem, LoadingGoodsStatus, LOADING_STATUS_COLORS, LOADING_STATUS_LABELS } from '../types/packingList';
import { createStyles } from './LoadingSequenceItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface LoadingSequenceItemProps {
  item: LoadingListItem;
  index: number;
  onToggleLoaded?: (goodsId: string, isLoaded: boolean) => void;
  disabled?: boolean;
  isNext?: boolean;
}

const LoadingSequenceItemComponent: React.FC<LoadingSequenceItemProps> = ({
  item,
  index,
  onToggleLoaded,
  disabled = false,
  isNext = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const { sequenceNumber, goods, clientName, clientColor, isLoaded } = item;
  const actualCBM = Number(goods.actualCBM || 0);
  const weight = Number(goods.weight || 0);
  const hasMissingInfo = !goods.goodsId || !goods.description || actualCBM <= 0 || weight <= 0;

  const handleToggle = () => {
    if (!disabled && onToggleLoaded) {
      onToggleLoaded(goods._id, !isLoaded);
    }
  };

  const status: LoadingGoodsStatus = isLoaded ? 'LOADED' : 'PENDING';
  const statusColor = LOADING_STATUS_COLORS[status];
  const enteringDelay = Math.min(index, 8) * 35;

  return (
    <Animated.View
      entering={FadeInRight.delay(enteringDelay)}
      layout={Layout.springify()}
      style={styles.container}
    >
      <View style={styles.sequenceBadge}>
        <LinearGradient
          colors={[colors.primary[500], colors.primary[700]]}
          style={styles.sequenceGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.sequenceNumber}>{sequenceNumber}</Text>
        </LinearGradient>
      </View>

      <View style={[styles.content, isLoaded && styles.contentLoaded, isNext && styles.contentNext]}>
        <View style={styles.header}>
          <View style={styles.goodsIdContainer}>
            <Text style={styles.goodsId}>{goods.goodsId || 'Sans ID'}</Text>
            <View style={[styles.clientBadge, { backgroundColor: `${clientColor}20` }]}>
              <View style={[styles.clientDot, { backgroundColor: clientColor }]} />
              <Text style={[styles.clientName, { color: clientColor }]} numberOfLines={1}>
                {clientName}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.statusButton,
              { backgroundColor: `${statusColor}20` },
              isLoaded && styles.statusButtonLoaded,
              disabled && styles.statusButtonDisabled,
            ]}
            onPress={handleToggle}
            disabled={disabled}
            activeOpacity={0.8}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Ionicons
              name={isLoaded ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={statusColor}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {LOADING_STATUS_LABELS[status]}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {goods.description || 'Pas de description'}
        </Text>

        {(isNext || hasMissingInfo) && (
          <View style={styles.stateRow}>
            {isNext && !isLoaded && (
              <View style={styles.nextBadge}>
                <Ionicons name="arrow-forward-circle" size={13} color={colors.status.warning} />
                <Text style={styles.nextBadgeText}>Prochain</Text>
              </View>
            )}
            {hasMissingInfo && (
              <View style={styles.missingBadge}>
                <Ionicons name="warning-outline" size={13} color={colors.status.error} />
                <Text style={styles.missingBadgeText}>Infos à vérifier</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.metric}>
            <Ionicons name="cube-outline" size={14} color={colors.neutral[500]} />
            <Text style={styles.metricText}>{actualCBM.toFixed(2)} m³</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="scale-outline" size={14} color={colors.neutral[500]} />
            <Text style={styles.metricText}>{weight.toFixed(0)} kg</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="layers-outline" size={14} color={colors.neutral[500]} />
            <Text style={styles.metricText}>Qté: {goods.quantity || 1}</Text>
          </View>
        </View>
      </View>

      {/* Progress Line */}
      <View style={styles.progressLineContainer}>
        <View
          style={[
            styles.progressLine,
            isLoaded ? styles.progressLineComplete : styles.progressLinePending,
          ]}
        />
      </View>
    </Animated.View>
  );
};

export const LoadingSequenceItem = React.memo(LoadingSequenceItemComponent);
export default LoadingSequenceItem;
