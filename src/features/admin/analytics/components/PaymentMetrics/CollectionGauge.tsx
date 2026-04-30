import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface CollectionGaugeProps {
  rate: number;
  size?: number;
}

export const CollectionGauge: React.FC<CollectionGaugeProps> = ({ rate, size = 120 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(rate / 100, 1);
  const strokeDashoffset = circumference * (1 - progress);

  let color = '#EF4444';
  if (rate >= 90) color = '#10B981';
  else if (rate >= 70) color = '#F59E0B';
  else if (rate >= 50) color = '#F97316';

  return (
    <View style={[styles.gaugeContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {/* Center text */}
        <SvgText
          x={center}
          y={center - 5}
          fontSize={24}
          fontWeight="bold"
          fill="#1F2937"
          textAnchor="middle"
        >
          {rate.toFixed(0)}%
        </SvgText>
        <SvgText
          x={center}
          y={center + 15}
          fontSize={10}
          fill="#6B7280"
          textAnchor="middle"
        >
          Collecté
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  gaugeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
