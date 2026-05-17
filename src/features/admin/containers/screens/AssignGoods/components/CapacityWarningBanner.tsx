import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface CapacityWarningBannerProps {
  isFull: boolean;
  isNearFull: boolean;
}

export const CapacityWarningBanner: React.FC<CapacityWarningBannerProps> = ({
  isFull,
  isNearFull,
}) => {
  if (isFull) {
    return (
      <View style={styles.warningBanner}>
        <Ionicons name="warning" size={16} color={Theme.status.error} />
        <Text style={styles.warningText}>Capacité maximale atteinte!</Text>
      </View>
    );
  }
  if (isNearFull) {
    return (
      <View style={[styles.warningBanner, styles.warningBannerOrange]}>
        <Ionicons name="alert-circle" size={16} color={Theme.status.warning} />
        <Text style={[styles.warningText, styles.warningTextOrange]}>
          Container presque plein
        </Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: Theme.colors.status.error + '15',
    borderRadius: 8,
    gap: 8,
  },
  warningBannerOrange: {
    backgroundColor: Theme.colors.status.warning + '15',
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
