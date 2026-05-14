import React, { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { User } from "@src/shared/types";

interface DashboardHeaderProps {
  user: User | null;
}

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon apr├¿s-midi";
  return "Bonsoir";
};

const getFormattedDate = () =>
  new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors);

  const initials = useMemo(
    () =>
      `${user?.firstName?.[0] || "A"}${user?.lastName?.[0] || ""}`.toUpperCase(),
    [user?.firstName, user?.lastName]
  );

  const gradientColors = isDark
    ? (["#0F3D2E", "#166534", "#15803D"] as const)
    : Theme.gradients.primary;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.topRow}>
        <View style={styles.dateBadge}>
          <MaterialCommunityIcons name="calendar-today" size={12} color={colors.text.inverse} />
          <Text style={styles.dateText}>{getFormattedDate()}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => navigation.navigate("GlobalSearch")}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && styles.iconBtnPressed,
            ]}
            hitSlop={8}
            accessibilityLabel="Recherche"
          >
            <MaterialCommunityIcons name="magnify" size={20} color={colors.text.inverse} />
          </Pressable>
          <View style={styles.iconBtn}>
            <NotificationBell
              onPress={() => navigation.navigate("Notifications")}
              size={20}
              color={colors.text.inverse}
            />
          </View>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.name} numberOfLines={1}>
            {user?.firstName || "Admin"} ≡ƒæï
          </Text>
          <Text style={styles.subtitle}>Voici votre aper├ºu du jour</Text>
        </View>

        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={["rgba(255,255,255,0.35)", "rgba(255,255,255,0.15)"]}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    ...Theme.shadows.lg,
  },
  decorCircle1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  dateText: {
    color: colors.text.inverse,
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingBlock: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "rgba(255,255,255,0.85)",
  },
  name: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: "rgba(255,255,255,0.75)",
    marginTop: 6,
  },
  avatarWrap: {
    ...Theme.shadows.md,
  },
  avatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.35)",
  },
  avatarText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
});

export default DashboardHeader;
