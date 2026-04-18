import React, { useMemo } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";

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
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: 20,
        },
        sectionHeader: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          paddingHorizontal: 4,
        },
        sectionTitle: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          letterSpacing: -0.3,
        },
        sectionBadge: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        grid: {
          flexDirection: "row",
          gap: 10,
        },
        item: {
          flex: 1,
          borderRadius: 18,
          overflow: "hidden",
          ...Theme.shadows.sm,
        },
        gradient: {
          padding: 12,
          minHeight: 110,
          justifyContent: "space-between",
        },
        iconWrap: {
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: "rgba(255,255,255,0.25)",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
        },
        title: {
          fontSize: 13,
          fontFamily: Fonts.bold,
          color: "#FFF",
          letterSpacing: -0.2,
        },
        subtitle: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: "rgba(255,255,255,0.82)",
          marginTop: 1,
        },
      }),
    [colors, isDark]
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <Text style={styles.sectionBadge}>4 raccourcis</Text>
      </View>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => navigation.navigate(action.route as never)}
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
                  color="#FFF"
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
        ))}
      </View>
    </View>
  );
};

export default QuickActions;
