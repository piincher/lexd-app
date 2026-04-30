import React from 'react';
import { View, Text } from 'react-native';

interface UtilizationBarProps {
  label: string;
  percentage: number;
  color: string;
  count?: number;
  labelColor: string;
  countColor: string;
  trackColor: string;
}

export const UtilizationBar: React.FC<UtilizationBarProps> = ({
  label,
  percentage,
  color,
  count,
  labelColor,
  countColor,
  trackColor,
}) => (
  <View style={{ gap: 6 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: 12, fontWeight: '600', color: labelColor }}>{label}</Text>
      {count !== undefined && <Text style={{ fontSize: 11, color: countColor }}>{count} conteneurs</Text>}
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ flex: 1, height: 8, borderRadius: 4, overflow: 'hidden', backgroundColor: trackColor }}>
        <View style={{ width: `${Math.min(percentage, 100)}%`, height: '100%', borderRadius: 4, backgroundColor: color }} />
      </View>
      <Text style={{ fontSize: 12, fontWeight: '600', minWidth: 45, textAlign: 'right', color }}>{percentage.toFixed(1)}%</Text>
    </View>
  </View>
);
