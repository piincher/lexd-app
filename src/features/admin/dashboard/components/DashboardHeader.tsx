import React, { useMemo } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { User } from "@src/shared/types";
import { DashboardHeaderTopRow } from "./DashboardHeaderTopRow";
import { DashboardHeaderGreeting } from "./DashboardHeaderGreeting";
import { createDashboardHeaderStyles } from "./DashboardHeader.styles";

interface DashboardHeaderProps {
  user: User | null;
}

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
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
  const styles = React.useMemo(() => createDashboardHeaderStyles(colors, isDark), [colors, isDark]);

  const initials = useMemo(
    () =>
      `${user?.firstName?.[0] || "A"}${user?.lastName?.[0] || ""}`.toUpperCase(),
    [user?.firstName, user?.lastName]
  );

  return (
    <LinearGradient
      colors={Theme.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <DashboardHeaderTopRow
        styles={styles}
        dateText={getFormattedDate()}
        onSearchPress={() => navigation.navigate("GlobalSearch")}
        onNotificationPress={() => navigation.navigate("Notifications")}
        iconColor={colors.text.inverse}
      />

      <DashboardHeaderGreeting
        styles={styles}
        greeting={getGreeting()}
        name={user?.firstName || "Admin"}
        subtitle="Voici votre aperçu du jour"
        initials={initials}
      />
    </LinearGradient>
  );
};

export default DashboardHeader;
