import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getQuickActionsStyles } from "./QuickActions.styles";

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route: string;
  gradient: readonly [string, string];
}

interface QuickActionCardProps {
  action: QuickAction;
  colors: any;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ action, colors, onPress }) => {
  const styles = getQuickActionsStyles(colors);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.9, transform: [{ scale: 0.96 }] },
      ]}
    >
      <LinearGradient
        colors={action.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name={action.icon as any}
            size={20}
            color={colors.text.inverse}
          />
        </View>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {action.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {action.subtitle}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
