import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getQuickActionsStyles } from "./QuickActions.styles";
import { QuickActionCard } from "./QuickActionCard";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  gradient: readonly [string, string];
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "qa1",
    title: "Réception",
    subtitle: "Nouvelle marchandise",
    icon: "package-variant-closed",
    route: "ReceiveGoods",
    gradient: ["#10B981", "#059669"] as const,
  },
  {
    id: "qa2",
    title: "Commande",
    subtitle: "Créer une commande",
    icon: "plus-circle",
    route: "ChooseShippingMethod",
    gradient: ["#3B82F6", "#2563EB"] as const,
  },
  {
    id: "qa3",
    title: "Conteneurs",
    subtitle: "Gérer",
    icon: "ferry",
    route: "ContainerList",
    gradient: ["#F97316", "#EA580C"] as const,
  },
  {
    id: "qa4",
    title: "Scanner",
    subtitle: "QR code",
    icon: "qrcode-scan",
    route: "ScanQRCode",
    gradient: ["#A855F7", "#9333EA"] as const,
  },
];

export const QuickActions: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = getQuickActionsStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <Text style={styles.sectionBadge}>4 raccourcis</Text>
      </View>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard
            key={action.id}
            action={action}
            colors={colors}
            onPress={() => navigation.navigate(action.route as never)}
          />
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
