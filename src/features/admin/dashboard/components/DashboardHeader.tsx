/* Hallmark · macrostructure: Workbench · component: utility-header · tone: utilitarian
 *
 * One-row utility header — date on the left, search + notification on the right.
 * The greeting card ("Bonjour X · Aperçu opérationnel du jour" + avatar) was
 * removed per audit M4: decorative chrome that consumed above-the-fold real
 * estate. Operators don't need to be told their name.
 *
 * The `user` prop is kept on the signature for backwards compatibility with the
 * existing AdminDashBoard call site — it's no longer read because there's no
 * greeting to personalise.
 */

import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "@src/app/navigation/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { DashboardHeaderTopRow } from "./DashboardHeaderTopRow";
import { createDashboardHeaderStyles } from "./DashboardHeader.styles";

interface DashboardHeaderProps {
  // Preserved for call-site compatibility; no longer used after greeting removal.
  user: {
    firstName?: string;
    lastName?: string;
  } | null;
}

const getFormattedDate = () =>
  new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  const navigation = useNavigation<navigationProps>();
  const { colors, isDark } = useAppTheme();
  const styles = createDashboardHeaderStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <DashboardHeaderTopRow
        styles={styles}
        dateText={getFormattedDate()}
        onSearchPress={() => navigation.navigate("GlobalSearch")}
        onNotificationPress={() => navigation.navigate("Notifications")}
        iconColor={colors.text.secondary}
      />
    </View>
  );
};

export default DashboardHeader;
