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
    smsPct >= 50 ? "#22C55E" : smsPct >= 20 ? "#F59E0B" : "#EF4444";

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
          iconColor="#F97316"
          progressWidth={Math.min(100, stats.pendingContainers * 10)}
          progressColor="#F97316"
          iconBgColor={isDark ? "rgba(249,115,22,0.15)" : "#FFF7ED"}
          onPress={() => navigation.navigate("ContainerList")}
        />
        <SmallKpiCard
          value={formatNumber(stats.smsBalance)}
          label="Crédits SMS"
          icon="message-badge"
          iconColor="#A855F7"
          progressWidth={smsPct}
          progressColor={smsColor}
          iconBgColor={isDark ? "rgba(168,85,247,0.15)" : "#FAF5FF"}
          onPress={() => navigation.navigate("SendSms")}
        />
      </View>
    </View>
  );
};

export default KPICards;
