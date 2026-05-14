import { useMemo } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ChartDataItem {
  value: number;
  label: string;
  frontColor: string;
  gradientColor: string;
  percentage: number;
}

export const useAgingChartData = (aging: {
  "0-30": number;
  "31-60": number;
  "60+": number;
}) => {
  const { colors } = useAppTheme();
  const total = aging["0-30"] + aging["31-60"] + aging["60+"];

  const data: ChartDataItem[] = useMemo(
    () => [
      {
        value: aging["0-30"],
        label: "0-30j",
        frontColor: colors.status.success,
        gradientColor: colors.primary.light,
        percentage: total > 0 ? Math.round((aging["0-30"] / total) * 100) : 0,
      },
      {
        value: aging["31-60"],
        label: "31-60j",
        frontColor: colors.status.warning,
        gradientColor: colors.accent.goldLight,
        percentage: total > 0 ? Math.round((aging["31-60"] / total) * 100) : 0,
      },
      {
        value: aging["60+"],
        label: "60+j",
        frontColor: colors.status.error,
        gradientColor: colors.accent.redLight,
        percentage: total > 0 ? Math.round((aging["60+"] / total) * 100) : 0,
      },
    ],
    [aging, total]
  );

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const hasCritical = aging["60+"] > 0;

  return { data, total, maxValue, hasCritical };
};
