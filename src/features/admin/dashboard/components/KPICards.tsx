import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createKPICardsStyles } from "./KPICards.styles";
import { HeroKpiCard } from "./HeroKpiCard";
import { SmallKpiCard } from "./SmallKpiCard";

export interface KPICardsProps {
  stats: {
    totalGoods: number;
    pendingContainers: number;
    smsBalance: number;
  };
}

export const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = createKPICardsStyles(colors, isDark);

  const smsPct = Math.min(
    100,
    Math.max(0, stats.smsBalance > 0 ? Math.min(100, stats.smsBalance / 10) : 0)
  );
  const smsColor =
    smsPct >= 50 ? colors.status.success : smsPct >= 20 ? colors.status.warning : colors.status.error;

  return (
    <View style={styles.container}>
      <HeroKpiCard
        value={formatNumber(stats.totalGoods)}
        label="Marchandises en entrepôt"
        icon="package-variant"
        trendLabel="En stock"
        onPress={() => navigation.navigate("UnassignedGoods")}
      />

      <View style={styles.row}>
        <SmallKpiCard
          value={formatNumber(stats.pendingContainers)}
          label="Conteneurs actifs"
          icon="ferry"
          iconColor={colors.status.warning}
          progressWidth={Math.min(100, stats.pendingContainers * 10)}
          progressColor={colors.status.warning}
          iconBgColor={isDark ? "rgba(245,158,11,0.15)" : colors.feedback.warningBg}
          onPress={() => navigation.navigate("ContainerList")}
        />
        <SmallKpiCard
          value={formatNumber(stats.smsBalance)}
          label="Crédits SMS"
          icon="message-badge"
          iconColor={colors.primary.main}
          progressWidth={smsPct}
          progressColor={smsColor}
          iconBgColor={isDark ? colors.primary.main + '26' : colors.primary[50]}
          onPress={() => navigation.navigate("SendSms")}
        />
      </View>
    </View>
  );
};

export default KPICards;
