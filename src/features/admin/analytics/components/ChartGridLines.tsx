import React from "react";
import { Line, G, Text as SvgText } from "react-native-svg";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ChartGridLinesProps {
  yLabels: number[];
  getX: (index: number) => number;
  getY: (value: number) => number;
  width: number;
  chartPaddingLeft: number;
  chartPaddingRight: number;
  formatCurrency: (value: number) => string;
}

export const ChartGridLines: React.FC<ChartGridLinesProps> = ({
  yLabels, getY, width, chartPaddingLeft, chartPaddingRight, formatCurrency,
}) => {
  const { colors } = useAppTheme();
  return (
    <>
      {yLabels.map((label, index) => {
        const y = getY(label);
        return (
          <G key={`grid-${index}`}>
            <Line
              x1={chartPaddingLeft}
              y1={y}
              x2={width - chartPaddingRight}
              y2={y}
              stroke={colors.border}
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <SvgText x={chartPaddingLeft - 8} y={y + 4} fontSize={10} fill={colors.text.muted} textAnchor="end">
              {formatCurrency(label)}
            </SvgText>
          </G>
        );
      })}
    </>
  );
};
