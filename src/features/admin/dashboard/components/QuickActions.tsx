import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { ThemeContextType } from "@src/constants/Theme";
import { getQuickActionsStyles } from "./QuickActions.styles";
import { QuickActionCard } from "./QuickActionCard";

type AppThemeColors = ThemeContextType["colors"];
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];
type QuickActionRoute = "ReceiveGoods" | "ChooseShippingMethod" | "ContainerList" | "ScanQRCode";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: MaterialCommunityIconName;
  route: QuickActionRoute;
  accent: string;
}

const getQuickActions = (colors: AppThemeColors): QuickAction[] => [
  {
    id: "qa1",
    title: "Réception",
    subtitle: "Nouvelle marchandise",
    icon: "package-variant-closed",
    route: "ReceiveGoods",
    accent: colors.primary.main,
  },
  {
    id: "qa2",
    title: "Commande",
    subtitle: "Créer une commande",
    icon: "plus-circle",
    route: "ChooseShippingMethod",
    accent: colors.status.info,
  },
  {
    id: "qa3",
    title: "Conteneurs",
    subtitle: "Gérer",
    icon: "ferry",
    route: "ContainerList",
    accent: colors.status.warning,
  },
  {
    id: "qa4",
    title: "Scanner",
    subtitle: "QR code",
    icon: "qrcode-scan",
    route: "ScanQRCode",
    accent: colors.accent.mint,
  },
];

export const QuickActions: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors } = useAppTheme();
  const styles = getQuickActionsStyles(colors);
  const quickActions = React.useMemo(() => getQuickActions(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <Text style={styles.sectionBadge}>Prioritaire</Text>
      </View>
      <View style={styles.grid}>
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.id}
            action={action}
            colors={colors}
            onPress={() => navigation.navigate(action.route)}
          />
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
