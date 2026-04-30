import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { PaymentMethodMetric } from '../../types';

interface PaymentMethodChartProps {
  methods: PaymentMethodMetric[];
  size?: number;
}

const COLORS: Record<string, string> = {
  ORANGE_MONEY: '#FF6600',
  WAVE: '#1E90FF',
  CARD: '#10B981',
  CASH: '#8B5CF6',
};

export const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ methods, size = 140 }) => {
  const radius = size / 2 - 20;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;
  const total = methods.reduce((sum, m) => sum + m.total, 0);

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size}>
        {methods.map((method) => {
          const percentage = total > 0 ? method.total / total : 0;
          const strokeDasharray = `${circumference * percentage} ${circumference}`;
          const rotation = cumulativePercentage * 360;
          cumulativePercentage += percentage;

          return (
            <Circle
              key={method.method}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={COLORS[method.method] || '#6B7280'}
              strokeWidth={20}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotation - 90} ${center} ${center})`}
            />
          );
        })}
        <SvgText
          x={center}
          y={center - 5}
          fontSize={14}
          fontWeight="bold"
          fill="#1F2937"
          textAnchor="middle"
        >
          {methods.length}
        </SvgText>
        <SvgText
          x={center}
          y={center + 10}
          fontSize={9}
          fill="#6B7280"
          textAnchor="middle"
        >
          Méthodes
        </SvgText>
      </Svg>
    </View>
  );
};
