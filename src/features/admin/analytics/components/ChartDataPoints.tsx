import React from "react";
import { Circle, G, Text as SvgText, Rect } from "react-native-svg";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RevenueTrendPoint } from "../types";

interface ChartDataPointsProps {
  data: RevenueTrendPoint[];
  getX: (index: number) => number;
  getY: (value: number) => number;
  tooltipIndex: number | null;
  setTooltipIndex: (index: number | null) => void;
  chartPaddingTop: number;
  chartHeight: number;
  height: number;
  formatCurrency: (value: number) => string;
  formatDate: (dateStr: string) => string;
}

export const ChartDataPoints: React.FC<ChartDataPointsProps> = ({
  data, getX, getY, tooltipIndex, setTooltipIndex, chartPaddingTop, chartHeight, height, formatCurrency, formatDate,
}) => {
  const { colors } = useAppTheme();
  return (
    <>
      {data.map((point, index) => {
        const x = getX(index);
        const y = getY(point.revenueFCFA);
        const isActive = tooltipIndex === index;
        return (
          <G key={`point-${index}`}>
            <Rect
              x={x - 15}
              y={chartPaddingTop}
              width={30}
              height={chartHeight}
              fill="transparent"
              onPressIn={() => setTooltipIndex(index)}
              onPressOut={() => setTooltipIndex(null)}
            />
            <Circle cx={x} cy={y} r={isActive ? 6 : 4} fill={colors.status.success} stroke={colors.text.inverse} strokeWidth={isActive ? 3 : 2} />
            {isActive && (
              <G>
                <Rect x={x - 50} y={y - 50} width={100} height={40} fill={colors.text.primary} rx={8} />
                <SvgText x={x} y={y - 30} fontSize={10} fill={colors.text.inverse} textAnchor="middle">
                  {formatDate(point.period)}
                </SvgText>
                <SvgText x={x} y={y - 18} fontSize={12} fill={colors.status.success} fontWeight="bold" textAnchor="middle">
                  {formatCurrency(point.revenueFCFA)} FCFA
                </SvgText>
              </G>
            )}
          </G>
        );
      })}
    </>
  );
};
