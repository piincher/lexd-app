import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";

const SCREEN_W = Dimensions.get("window").width;

interface MonthlyTrendChartProps {
  orders: productType[];
}

export const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  const data = React.useMemo(() => {
    const months = new Map<string, number>();
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

    orders.forEach((o) => {
      if (!o.createdAt) return;
      const d = new Date(o.createdAt);
      const key = monthNames[d.getMonth()];
      months.set(key, (months.get(key) || 0) + 1);
    });

    const last6 = monthNames.slice(-6);
    return last6.map((m) => ({
      value: months.get(m) || 0,
      label: m,
      dataPointText: String(months.get(m) || 0),
    }));
  }, [orders]);

  if (data.length === 0 || data.every((d) => d.value === 0)) {
    return (
      <Animated.View entering={FadeInUp.delay(550)} style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Tendance Mensuelle</Text>
        <Text style={[styles.empty, { color: colors.text.secondary }]}>Aucune donnée disponible</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInUp.delay(550).duration(500)} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Tendance Mensuelle</Text>
      <LineChart
        data={data}
        width={SCREEN_W - 72}
        height={160}
        spacing={40}
        initialSpacing={10}
        color={colors.primary.main}
        thickness={3}
        dataPointsColor={colors.primary.main}
        dataPointsRadius={4}
        textColor={colors.text.secondary}
        textFontSize={10}
        hideRules
        hideYAxisText
        yAxisLabelWidth={0}
        showValuesAsDataPointsText
        xAxisLabelTextStyle={{ color: colors.text.secondary, fontSize: 10, fontWeight: "600" }}
        areaChart
        startFillColor={colors.primary.main}
        endFillColor={colors.background.card}
        startOpacity={0.3}
        endOpacity={0.01}
      />
    </Animated.View>
  );
};

const styles = {
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700" as const,
    marginBottom: 16,
  },
  empty: {
    fontSize: 15,
    textAlign: "center" as const,
    paddingVertical: 40,
  },
};
