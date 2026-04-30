import React from "react";
import { Circle, G, Text as SvgText, Rect } from "react-native-svg";
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
}) => (
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
          <Circle cx={x} cy={y} r={isActive ? 6 : 4} fill="#10B981" stroke="#FFFFFF" strokeWidth={isActive ? 3 : 2} />
          {isActive && (
            <G>
              <Rect x={x - 50} y={y - 50} width={100} height={40} fill="#1F2937" rx={8} />
              <SvgText x={x} y={y - 30} fontSize={10} fill="#FFFFFF" textAnchor="middle">
                {formatDate(point.period)}
              </SvgText>
              <SvgText x={x} y={y - 18} fontSize={12} fill="#10B981" fontWeight="bold" textAnchor="middle">
                {formatCurrency(point.revenueFCFA)} FCFA
              </SvgText>
            </G>
          )}
        </G>
      );
    })}
  </>
);
