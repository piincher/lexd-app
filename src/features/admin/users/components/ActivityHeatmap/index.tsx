import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { productType } from "@src/shared/types/order";

interface ActivityHeatmapProps {
  orders: productType[];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  const { weeks, maxCount } = React.useMemo(() => {
    const dayMap = new Map<string, number>();
    orders.forEach((o) => {
      if (!o.createdAt) return;
      const key = new Date(o.createdAt).toISOString().split("T")[0];
      dayMap.set(key, (dayMap.get(key) || 0) + 1);
    });

    const today = new Date();
    const weeksData: { days: { date: string; count: number; intensity: number }[] }[] = [];
    let max = 1;

    for (let w = 0; w < 12; w++) {
      const weekDays: { date: string; count: number; intensity: number }[] = [];
      for (let d = 6; d >= 0; d--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + d));
        const key = date.toISOString().split("T")[0];
        const count = dayMap.get(key) || 0;
        if (count > max) max = count;
        weekDays.push({ date: key, count, intensity: count });
      }
      weeksData.push({ days: weekDays });
    }

    weeksData.forEach((w) => w.days.forEach((d) => {
      d.intensity = max > 0 ? d.count / max : 0;
    }));

    return { weeks: weeksData.reverse(), maxCount: max };
  }, [orders]);

  if (orders.length === 0) return null;

  const getColor = (intensity: number) => {
    if (intensity === 0) return colors.neutral[200];
    if (intensity < 0.3) return `${colors.primary.main}40`;
    if (intensity < 0.6) return `${colors.primary.main}80`;
    if (intensity < 0.9) return `${colors.primary.main}BF`;
    return colors.primary.main;
  };

  return (
    <Animated.View entering={FadeInUp.delay(650)} style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Activité (12 semaines)</Text>
      <View style={styles.grid}>
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.week}>
            {week.days.map((day, di) => (
              <View key={di} style={[styles.day, { backgroundColor: getColor(day.intensity) }]} />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: colors.text.secondary }]}>Moins</Text>
        {[0, 0.3, 0.6, 0.9, 1].map((i, idx) => (
          <View key={idx} style={[styles.legendDot, { backgroundColor: getColor(i) }]} />
        ))}
        <Text style={[styles.legendText, { color: colors.text.secondary }]}>Plus</Text>
      </View>
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
  grid: {
    flexDirection: "row" as const,
    gap: 4,
  },
  week: {
    gap: 4,
    flex: 1,
  },
  day: {
    aspectRatio: 1,
    borderRadius: 3,
  },
  legend: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-end" as const,
    gap: 4,
    marginTop: 12,
  },
  legendText: {
    fontSize: 11,
    fontWeight: "500" as const,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
};
