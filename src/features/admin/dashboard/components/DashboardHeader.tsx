import React, { useMemo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { DashboardHeaderTopRow } from "./DashboardHeaderTopRow";
import { DashboardHeaderGreeting } from "./DashboardHeaderGreeting";
import { createDashboardHeaderStyles } from "./DashboardHeader.styles";

interface DashboardHeaderProps {
  user: {
    firstName?: string;
    lastName?: string;
  } | null;
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
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createDashboardHeaderStyles(colors, isDark), [colors, isDark]);

  const initials = useMemo(
    () =>
      `${user?.firstName?.[0] || "A"}${user?.lastName?.[0] || ""}`.toUpperCase(),
    [user?.firstName, user?.lastName]
  );

  return (
    <View style={styles.container}>
      <DashboardHeaderTopRow
        styles={styles}
        dateText={getFormattedDate()}
        onSearchPress={() => navigation.navigate("GlobalSearch")}
        onNotificationPress={() => navigation.navigate("Notifications")}
        iconColor={colors.text.secondary}
      />

      <DashboardHeaderGreeting
        styles={styles}
        greeting={getGreeting()}
        name={user?.firstName || "Admin"}
        subtitle="Aperçu opérationnel du jour"
        initials={initials}
      />
    </View>
  );
};

export default DashboardHeader;
