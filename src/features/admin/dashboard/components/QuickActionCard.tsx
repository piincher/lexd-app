import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ThemeContextType } from "@src/constants/Theme";
import { getQuickActionsStyles } from "./QuickActions.styles";

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

interface QuickActionCardProps {
  action: QuickAction;
  colors: AppThemeColors;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ action, colors, onPress }) => {
  const styles = getQuickActionsStyles(colors);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
    >
      <View style={styles.actionContent}>
        <View style={[styles.iconWrap, { backgroundColor: action.accent + "18" }]}>
          <MaterialCommunityIcons
            name={action.icon}
            size={20}
            color={action.accent}
          />
        </View>
        <View style={styles.actionText}>
          <Text style={styles.title} numberOfLines={1}>
            {action.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {action.subtitle}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.text.disabled} />
      </View>
    </Pressable>
  );
};
