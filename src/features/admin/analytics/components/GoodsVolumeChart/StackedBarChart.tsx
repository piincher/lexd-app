import React from 'react';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SCREEN_WIDTH } from './goodsVolumeConstants';

interface StackedBarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  total: number;
  width?: number;
  height?: number;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  total,
  width = SCREEN_WIDTH - 80,
  height = 30,
}) => {
  const { colors } = useAppTheme();
  let currentX = 0;

  return (
    <Svg width={width} height={height}>
      {data.map((item, index) => {
        const barWidth = (item.value / total) * width;
        const x = currentX;
        currentX += barWidth;

        return (
          <G key={index}>
            <Rect
              x={x}
              y={0}
              width={barWidth}
              height={height}
              fill={item.color}
              rx={index === 0 ? 4 : 0}
              ry={index === 0 ? 4 : 0}
            />
            {barWidth > 40 && (
              <SvgText
                x={x + barWidth / 2}
                y={height / 2 + 4}
                fontSize={10}
                fill={colors.text.inverse}
                textAnchor="middle"
                fontWeight="600"
              >
                {item.value}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
};
