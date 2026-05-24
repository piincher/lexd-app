import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useAgingChartData } from "./hooks/useAgingChartData";
import { AgingChartHeader } from "./components/AgingChartHeader";
import { AgingChartEmpty } from "./components/AgingChartEmpty";
import { AgingChartBars } from "./components/AgingChartBars";
import { AgingChartLegend } from "./components/AgingChartLegend";

interface AgingChartProps {
  aging: {
    "0-30": number;
    "31-60": number;
    "60+": number;
  };
}

export const AgingChart: React.FC<AgingChartProps> = ({ aging }) => {
  const { colors } = useAppTheme();
  const { data, total, maxValue, hasCritical } = useAgingChartData(aging);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.card,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 14,
          ...Theme.shadows.sm,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <AgingChartHeader hasCritical={hasCritical} />
      {total === 0 ? (
        <AgingChartEmpty />
      ) : (
        <>
          <AgingChartBars data={data} maxValue={maxValue} />
          <AgingChartLegend data={data} />
        </>
      )}
    </View>
  );
};

export default AgingChart;
