/**
 * LoadingSequenceItem - Single loading item with controls
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { LoadingListItem, LoadingGoodsStatus, LOADING_STATUS_COLORS, LOADING_STATUS_LABELS } from '../types/packingList';

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
          colors={[Theme.primary[500], Theme.primary[700]]}
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
            <Ionicons name="cube-outline" size={14} color={Theme.neutral[500]} />
            <Text style={styles.metricText}>{goods.actualCBM.toFixed(2)} m³</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="scale-outline" size={14} color={Theme.neutral[500]} />
            <Text style={styles.metricText}>{goods.weight.toFixed(0)} kg</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="layers-outline" size={14} color={Theme.neutral[500]} />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  sequenceBadge: {
    width: 40,
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  sequenceGradient: {
    width: 32,
    height: 32,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  sequenceNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFF',
  },
  progressLineContainer: {
    position: 'absolute',
    left: 16,
    top: 36,
    bottom: -16,
    width: 4,
    alignItems: 'center',
  },
  progressLine: {
    width: 2,
    height: '100%',
    borderRadius: 1,
  },
  progressLineComplete: {
    backgroundColor: Theme.status.success,
  },
  progressLinePending: {
    backgroundColor: Theme.neutral[200],
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Theme.neutral[300],
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
    borderLeftWidth: 4,
    borderLeftColor: Theme.neutral[200],
  },
  contentLoaded: {
    borderLeftColor: Theme.status.success,
    backgroundColor: '#F0FDF4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  goodsIdContainer: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  goodsId: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.neutral[800],
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 4,
  },
  clientBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    gap: 4,
  },
  clientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  clientName: {
    fontSize: 11,
    fontWeight: '600',
    maxWidth: 120,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: Theme.radius.full,
    gap: 4,
    minWidth: 90,
    justifyContent: 'center',
  },
  statusButtonLoaded: {
    backgroundColor: '#D1FAE5',
  },
  statusButtonDisabled: {
    opacity: 0.6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[600],
    marginBottom: Theme.spacing.md,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
});

export default LoadingSequenceItem;
