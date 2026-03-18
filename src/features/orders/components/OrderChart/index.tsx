import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface ChartDataPoint {
  label: string;
  manual: number;
  auto: number;
}

interface OrderChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export const OrderChart: React.FC<OrderChartProps> = ({
  data,
  height = 200,
}) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.manual + d.auto), 1);

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((point, index) => {
          const total = point.manual + point.auto;
          const manualHeight = (point.manual / maxValue) * (height - 40);
          const autoHeight = (point.auto / maxValue) * (height - 40);

          return (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                {/* Manual bar */}
                <View
                  style={[
                    styles.bar,
                    styles.manualBar,
                    { height: manualHeight },
                  ]}
                />
                {/* Auto bar */}
                <View
                  style={[
                    styles.bar,
                    styles.autoBar,
                    { height: autoHeight },
                  ]}
                />
              </View>
              <Text style={styles.label}>{point.label}</Text>
              {total > 0 && (
                <Text style={styles.value}>{total}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.manualLegend]} />
          <Text style={styles.legendText}>Manuelles</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.autoLegend]} />
          <Text style={styles.legendText}>Auto</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  scrollContent: {
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 40,
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
  },
  bar: {
    width: 16,
    borderRadius: 4,
  },
  manualBar: {
    backgroundColor: COLORS.blue,
  },
  autoBar: {
    backgroundColor: COLORS.grey,
  },
  label: {
    fontSize: 10,
    color: COLORS.grey,
    marginTop: 4,
  },
  value: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.black,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  manualLegend: {
    backgroundColor: COLORS.blue,
  },
  autoLegend: {
    backgroundColor: COLORS.grey,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.darkGrey,
  },
});
