import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  textPrimaryColor: string;
  textSecondaryColor: string;
  trackColor: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 150,
  strokeWidth = 20,
  textPrimaryColor,
  textSecondaryColor,
  trackColor,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeValue = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        {data.map((item, index) => {
          const percentage = item.value / total;
          const strokeDasharray = `${circumference * percentage} ${circumference}`;
          const rotation = (cumulativeValue / total) * 360;
          cumulativeValue += item.value;
          return (
            <Circle
              key={index}
              cx={center} cy={center} r={radius}
              fill="none" stroke={item.color} strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotation - 90} ${center} ${center})`}
              strokeLinecap="round"
            />
          );
        })}
        <SvgText x={center} y={center - 5} fontSize={14} fontWeight="bold" fill={textPrimaryColor} textAnchor="middle">
          {data.length}
        </SvgText>
        <SvgText x={center} y={center + 12} fontSize={10} fill={textSecondaryColor} textAnchor="middle">
          Conteneurs
        </SvgText>
      </Svg>
    </View>
  );
};
