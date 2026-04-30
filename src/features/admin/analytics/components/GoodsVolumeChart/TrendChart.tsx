import React from 'react';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import { DailyVolumePoint } from '../../types';
import { SCREEN_WIDTH } from './goodsVolumeConstants';

interface TrendChartProps {
  data: DailyVolumePoint[];
  width?: number;
  height?: number;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  width = SCREEN_WIDTH - 80,
  height = 150,
}) => {
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.count), 1);

  const getX = (index: number) =>
    padding.left + (index / (data.length - 1)) * chartWidth;

  const getY = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const labelStep = Math.max(1, Math.floor(data.length / 5));

  return (
    <Svg width={width} height={height}>
      {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((value, index) => {
        const y = getY(value);
        return (
          <G key={`grid-${index}`}>
            <Rect
              x={padding.left}
              y={y}
              width={chartWidth}
              height={1}
              fill="#E5E7EB"
            />
            <SvgText
              x={padding.left - 5}
              y={y + 4}
              fontSize={9}
              fill="#6B7280"
              textAnchor="end"
            >
              {Math.round(value)}
            </SvgText>
          </G>
        );
      })}

      {data.map((point, index) => {
        const barWidth = (chartWidth / data.length) * 0.7;
        const x = getX(index) - barWidth / 2;
        const barHeight = chartHeight - getY(point.count) + padding.top;
        const y = getY(point.count);

        return (
          <G key={`bar-${index}`}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#3B82F6"
              rx={2}
            />
            {(index % labelStep === 0 || index === data.length - 1) && (
              <SvgText
                x={getX(index)}
                y={height - 5}
                fontSize={9}
                fill="#6B7280"
                textAnchor="middle"
              >
                {new Date(point.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
};
