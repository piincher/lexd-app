import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../lib/constants";
import { styles } from "./StatusChart.styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ChartDataItem {
  value: number;
  label: string;
  frontColor: string;
}

interface StatusChartProps {
  data: ChartDataItem[];
  hasData: boolean;
}

export const StatusChart: React.FC<StatusChartProps> = ({ data, hasData }) => {
  if (!hasData) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-text" size={48} color={COLORS.muted} />
        <Text style={styles.emptyText}>Aucune donnée d'expédition</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Répartition des Statuts</Text>
      <BarChart
        data={data}
        width={SCREEN_WIDTH - 88}
        height={180}
        barWidth={30}
        barBorderRadius={8}
        yAxisLabelWidth={0}
        xAxisLabelTextStyle={{ color: COLORS.text, fontSize: 12, fontWeight: "600" }}
        noOfSections={4}
        showLine={false}
        showYAxisIndices={false}
        spacing={35}
        initialSpacing={20}
        maxValue={Math.max(...data.map(d => d.value), 1) + 1}
        hideRules
        hideYAxisText
      />
    </View>
  );
};
