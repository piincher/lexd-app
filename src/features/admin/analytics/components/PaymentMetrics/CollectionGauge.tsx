import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CollectionGaugeProps {
  rate: number;
  size?: number;
}

export const CollectionGauge: React.FC<CollectionGaugeProps> = ({ rate, size = 120 }) => {
  const { colors } = useAppTheme();
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(rate / 100, 1);
  const strokeDashoffset = circumference * (1 - progress);

  let color = colors.status.error;
  if (rate >= 90) color = colors.status.success;
  else if (rate >= 70) color = colors.status.warning;
  else if (rate >= 50) color = colors.status.warning;

  return (
    <View style={[styles.gaugeContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={colors.border}
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
          fill={colors.text.primary}
          textAnchor="middle"
        >
          {rate.toFixed(0)}%
        </SvgText>
        <SvgText
          x={center}
          y={center + 15}
          fontSize={10}
          fill={colors.text.muted}
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
