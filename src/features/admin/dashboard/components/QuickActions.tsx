/* Hallmark · macrostructure: Workbench · component: action-strip · tone: utilitarian
 *
 * Two audit fixes:
 *   · M1: dropped the "Prioritaire" badge. The section sat at index 6 of 8 in
 *         the old layout; calling itself priority while sitting behind the
 *         actual priority surfaces was a label/placement contradiction.
 *   · C4: neutralized the per-tile accent palette. Four tiles previously
 *         carried four different colours (primary / info / warning / mint),
 *         which made the colour wheel itself a fingerprint. All four tiles
 *         now share the brand-green affordance accent — same visual weight,
 *         same affordance, distinguished by icon + label only.
 *
 * The titles are short enough to fit on one line at 320px (slop gate 59).
 */

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

const getQuickActions = (colors: AppThemeColors): QuickAction[] => {
  // Single shared affordance accent. Brand green only — no per-tile colour-
  // assignment. Icons + labels carry the meaning; colour does not.
  const accent = colors.primary.main;
  return [
    {
      id: "qa1",
      title: "Réception",
      subtitle: "Nouvelle marchandise",
      icon: "package-variant-closed",
      route: "ReceiveGoods",
      accent,
    },
    {
      id: "qa2",
      title: "Commande",
      subtitle: "Créer",
      icon: "plus-circle",
      route: "ChooseShippingMethod",
      accent,
    },
    {
      id: "qa3",
      title: "Conteneurs",
      subtitle: "Gérer",
      icon: "ferry",
      route: "ContainerList",
      accent,
    },
    {
      id: "qa4",
      title: "Scanner",
      subtitle: "QR code",
      icon: "qrcode-scan",
      route: "ScanQRCode",
      accent,
    },
  ];
};

export const QuickActions: React.FC = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors } = useAppTheme();
  const styles = getQuickActionsStyles(colors);
  const quickActions = React.useMemo(() => getQuickActions(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        {/* "Prioritaire" badge removed — see header comment, audit M1. */}
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
