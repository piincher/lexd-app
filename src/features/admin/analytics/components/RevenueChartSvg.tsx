import React from "react";
import Svg, { Path, Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";
import { RevenueTrendPoint } from "../types";
import { ChartGridLines } from "./ChartGridLines";
import { ChartDataPoints } from "./ChartDataPoints";

interface RevenueChartSvgProps {
  data: RevenueTrendPoint[];
  comparisonData?: RevenueTrendPoint[];
  showComparison: boolean;
  width: number;
  height: number;
  tooltipIndex: number | null;
  setTooltipIndex: (index: number | null) => void;
  formatCurrency: (value: number) => string;
  formatDate: (dateStr: string) => string;
}

const CHART_PADDING = { top: 40, right: 20, bottom: 40, left: 60 };

export const RevenueChartSvg: React.FC<RevenueChartSvgProps> = ({
  data, comparisonData, showComparison, width, height, tooltipIndex, setTooltipIndex, formatCurrency, formatDate,
}) => {
  const chartWidth = width - CHART_PADDING.left - CHART_PADDING.right;
  const chartHeight = height - CHART_PADDING.top - CHART_PADDING.bottom;
  const allValues = showComparison && comparisonData
    ? [...data.map((d) => d.revenueFCFA), ...comparisonData.map((d) => d.revenueFCFA)]
    : data.map((d) => d.revenueFCFA);
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = 0;

  const getX = (index: number) => CHART_PADDING.left + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) => CHART_PADDING.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  const currentPath = data.map((point, index) => `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(point.revenueFCFA)}`).join(" ");
  const comparisonPath = comparisonData?.map((point, index) => `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(point.revenueFCFA)}`).join(" ") ?? "";
  const areaPath = `${currentPath} L ${getX(data.length - 1)} ${CHART_PADDING.top + chartHeight} L ${CHART_PADDING.left} ${CHART_PADDING.top + chartHeight} Z`;

  const yLabels = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];
  const xLabelStep = Math.max(1, Math.floor(data.length / 6));
  const xLabelIndices = data.map((_, i) => i).filter((i) => i % xLabelStep === 0 || i === data.length - 1);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#10B981" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#10B981" stopOpacity="0" />
        </LinearGradient>
      </Defs>

      <ChartGridLines yLabels={yLabels} getX={getX} getY={getY} width={width} chartPaddingLeft={CHART_PADDING.left} chartPaddingRight={CHART_PADDING.right} formatCurrency={formatCurrency} />

      {showComparison && comparisonData && (
        <Path d={comparisonPath} fill="none" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5,5" />
      )}

      <Path d={areaPath} fill="url(#areaGradient)" />
      <Path d={currentPath} fill="none" stroke="#10B981" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

      <ChartDataPoints data={data} getX={getX} getY={getY} tooltipIndex={tooltipIndex} setTooltipIndex={setTooltipIndex} chartPaddingTop={CHART_PADDING.top} chartHeight={chartHeight} height={height} formatCurrency={formatCurrency} formatDate={formatDate} />

      {xLabelIndices.map((index) => (
        <SvgText key={`xlabel-${index}`} x={getX(index)} y={height - 10} fontSize={10} fill="#6B7280" textAnchor="middle">
          {formatDate(data[index].period)}
        </SvgText>
      ))}
    </Svg>
  );
};
