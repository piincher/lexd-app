/**
 * LoadingSequenceItem - Single loading item with controls
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { LoadingListItem, LoadingGoodsStatus, LOADING_STATUS_COLORS, LOADING_STATUS_LABELS } from '../types/packingList';
import { createStyles } from './LoadingSequenceItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface LoadingSequenceItemProps {
  item: LoadingListItem;
  index: number;
  onToggleLoaded?: (goodsId: string, isLoaded: boolean) => void;
  disabled?: boolean;
}

export const LoadingSequenceItem: React.FC<LoadingSequenceItemProps> = ({
  item,
  index,
  onToggleLoaded,
  disabled = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { sequenceNumber, goods, clientName, clientColor, isLoaded } = item;

  const handleToggle = () => {
    if (!disabled && onToggleLoaded) {
      onToggleLoaded(goods._id, !isLoaded);
    }
  };

  const status: LoadingGoodsStatus = isLoaded ? 'LOADED' : 'PENDING';
  const statusColor = LOADING_STATUS_COLORS[status];

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 50)}
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

      <View style={[styles.content, isLoaded && styles.contentLoaded]}>
        <View style={styles.header}>
          <View style={styles.goodsIdContainer}>
            <Text style={styles.goodsId}>{goods.goodsId}</Text>
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

        <View style={styles.footer}>
          <View style={styles.metric}>
            <Ionicons name="cube-outline" size={14} color={colors.neutral[500]} />
            <Text style={styles.metricText}>{goods.actualCBM.toFixed(2)} m³</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="scale-outline" size={14} color={colors.neutral[500]} />
            <Text style={styles.metricText}>{goods.weight.toFixed(0)} kg</Text>
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

export default LoadingSequenceItem;
