import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

const MAX_CONTAINER_CBM = 67;

interface CapacityIndicatorProps {
  currentCBM: number;
  selectedCBM: number;
  maxCBM?: number;
  isAir?: boolean;
}

export const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({
  currentCBM,
  selectedCBM,
  maxCBM = MAX_CONTAINER_CBM,
  isAir = false,
}) => {
  const unit = isAir ? 'kg' : 'm³';
  const totalCBM = (currentCBM || 0) + (selectedCBM || 0);
  const fillPercentage = Math.min((totalCBM / maxCBM) * 100, 100);
  const isFull = fillPercentage >= 90;
  const isNearFull = fillPercentage >= 70 && fillPercentage < 90;

  const getFillColor = () => {
    if (isFull) return Theme.status.error;
    if (isNearFull) return Theme.status.warning;
    return Theme.status.success;
  };

  return (
    <View style={styles.capacityContainer}>
      <View style={styles.capacityHeader}>
        <Text style={styles.capacityLabel}>Capacité du container</Text>
        <Text style={[styles.capacityValue, { color: getFillColor() }]}>
          {(totalCBM || 0).toFixed(2)} / {maxCBM} {unit}
        </Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarCurrent, { width: `${Math.min((currentCBM / maxCBM) * 100, 100)}%` }]} />
        {selectedCBM > 0 && (
          <LinearGradient
            colors={[Theme.primary[400], Theme.primary[600]]}
            style={[styles.progressBarSelected, { width: `${Math.min((selectedCBM / maxCBM) * 100, 100)}%`, left: `${Math.min((currentCBM / maxCBM) * 100, 100)}%` }]}
          />
        )}
      </View>
      <View style={styles.capacityLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Theme.neutral[400] }]} />
          <Text style={styles.legendText}>Actuel: {(currentCBM || 0).toFixed(2)} {unit}</Text>
        </View>
        {selectedCBM > 0 && (
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Theme.primary[500] }]} />
            <Text style={styles.legendText}>Sélection: {(selectedCBM || 0).toFixed(2)} {unit}</Text>
          </View>
        )}
      </View>
      {isFull && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={16} color={Theme.status.error} />
          <Text style={styles.warningText}>Capacité maximale atteinte!</Text>
        </View>
      )}
      {isNearFull && !isFull && (
        <View style={[styles.warningBanner, styles.warningBannerOrange]}>
          <Ionicons name="alert-circle" size={16} color={Theme.status.warning} />
          <Text style={[styles.warningText, styles.warningTextOrange]}>Container presque plein</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  capacityContainer: {
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  capacityValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: Theme.neutral[200],
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarCurrent: {
    height: '100%',
    backgroundColor: Theme.neutral[400],
    borderRadius: 6,
    position: 'absolute',
    left: 0,
  },
  progressBarSelected: {
    height: '100%',
    borderRadius: 6,
    position: 'absolute',
  },
  capacityLegend: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    gap: 8,
  },
  warningBannerOrange: {
    backgroundColor: '#fef3c7',
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.status.error,
  },
  warningTextOrange: {
    color: Theme.status.warning,
  },
});
