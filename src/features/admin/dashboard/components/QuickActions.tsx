import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { getQuickActionsStyles } from "./QuickActions.styles";
import { QuickActionCard } from "./QuickActionCard";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  gradient: readonly string[];
}

const getQuickActions = (colors: any): QuickAction[] => [
  {
    id: "qa1",
    title: "Réception",
    subtitle: "Nouvelle marchandise",
    icon: "package-variant-closed",
    route: "ReceiveGoods",
    gradient: Theme.gradients.primary,
  },
  {
    id: "qa2",
    title: "Commande",
    subtitle: "Créer une commande",
    icon: "plus-circle",
    route: "ChooseShippingMethod",
    gradient: Theme.gradients.ocean,
  },
  {
    id: "qa3",
    title: "Conteneurs",
    subtitle: "Gérer",
    icon: "ferry",
    route: "ContainerList",
    gradient: Theme.gradients.sunset,
  },
  {
    id: "qa4",
    title: "Scanner",
    subtitle: "QR code",
    icon: "qrcode-scan",
    route: "ScanQRCode",
    gradient: [colors.status.info, colors.accent.mint] as const,
  },
];

export const QuickActions: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = getQuickActionsStyles(colors);
  const quickActions = React.useMemo(() => getQuickActions(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <Text style={styles.sectionBadge}>4 raccourcis</Text>
      </View>
      <View style={styles.grid}>
        {quickActions.map((action) => (
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
