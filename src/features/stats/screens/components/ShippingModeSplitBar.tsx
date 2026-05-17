import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ShippingModeSplitBarProps {
  airPercent: number;
  seaPercent: number;
  airColor: string;
  seaColor: string;
}

export const ShippingModeSplitBar: React.FC<ShippingModeSplitBarProps> = ({
  airPercent,
  seaPercent,
  airColor,
  seaColor,
}) => (
  <View style={styles.splitBar}>
    <View
      style={[
        styles.splitSegment,
        { flex: airPercent || 1, backgroundColor: airColor },
      ]}
    />
    <View style={styles.splitGap} />
    <View
      style={[
        styles.splitSegment,
        { flex: seaPercent || 1, backgroundColor: seaColor },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  splitBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 18,
  },
  splitSegment: {
    borderRadius: 3,
  },
  splitGap: {
    width: 3,
  },
});
