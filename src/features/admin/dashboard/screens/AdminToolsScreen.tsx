/**
 * AdminToolsScreen — dedicated screen for the admin directory.
 *
 * What lives here: the same `MenuCategories` directory that used to sit at the
 * bottom of `AdminDashBoard` — the full 25-item nav surface (Marchandises,
 * Commandes, Logistique, Clients, Outils). Moving it to its own tab gives the
 * dashboard back its focus (act-now first) without stranding the operator
 * from those routes.
 *
 * The component itself owns its scrolling, search bar, and tab strip, so the
 * screen is intentionally thin — just a scroll container + the directory.
 */

import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import { MenuCategories } from "../components/MenuCategories";

export const AdminToolsScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Admin</Text>
          <Text style={styles.title}>Outils</Text>
          <Text style={styles.subtitle}>
            Tous les accès — recherchez ou parcourez par catégorie.
          </Text>
        </View>
        <MenuCategories />
      </ScrollView>
    </SafeAreaView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.md,
      paddingBottom: Theme.spacing.xl,
    },
    header: {
      marginBottom: Theme.spacing.md,
    },
    eyebrow: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 1.4,
      marginBottom: 4,
    },
    title: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
  });

export default AdminToolsScreen;
