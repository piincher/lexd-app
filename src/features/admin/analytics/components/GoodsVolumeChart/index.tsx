import React from 'react';
import { Card } from 'react-native-paper';
import { VolumeByStatus, VolumeByShippingMode, DailyVolumePoint } from '../../types';
import { useGoodsVolumeChart } from './useGoodsVolumeChart';
import { ChartHeader } from './ChartHeader';
import { ViewModeTabs } from './ViewModeTabs';
import { StatusView } from './StatusView';
import { ShippingView } from './ShippingView';
import { TrendView } from './TrendView';
import { styles } from './GoodsVolumeChart.styles';

interface GoodsVolumeChartProps {
  byStatus: VolumeByStatus[];
  byShippingMode: VolumeByShippingMode[];
  dailyTrend: DailyVolumePoint[];
  summary: {
    totalGoods: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  };
}

export const GoodsVolumeChart: React.FC<GoodsVolumeChartProps> = ({
  byStatus,
  byShippingMode,
  dailyTrend,
  summary,
}) => {
  const { viewMode, setViewMode, formatNumber, formatCurrency, statusChartData } =
    useGoodsVolumeChart(byStatus);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <ChartHeader
          totalGoods={summary.totalGoods}
          totalCBM={summary.totalCBM}
          formatNumber={formatNumber}
        />

        <ViewModeTabs viewMode={viewMode} setViewMode={setViewMode} />

        {viewMode === 'status' && (
          <StatusView
            byStatus={byStatus}
            totalGoods={summary.totalGoods}
            statusChartData={statusChartData}
            formatCurrency={formatCurrency}
          />
        )}

        {viewMode === 'shipping' && (
          <ShippingView
            byShippingMode={byShippingMode}
            totalGoods={summary.totalGoods}
            formatCurrency={formatCurrency}
          />
        )}

        {viewMode === 'trend' && (
          <TrendView dailyTrend={dailyTrend} totalGoods={summary.totalGoods} />
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsVolumeChart;
