import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ShippingMode, FILTER_OPTIONS } from "../../hooks/pastOrdersConstants";
import { createStyles } from "./PastOrdersEmptyState.styles";

interface PastOrdersEmptyStateProps {
  shippingMode: ShippingMode;
  hasSearch?: boolean;
}

export const PastOrdersEmptyState: React.FC<PastOrdersEmptyStateProps> = ({
  shippingMode,
  hasSearch = false,
}) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const emptyMessage = hasSearch
    ? "Aucune expédition ne correspond à cette recherche. Essayez un code, une destination ou un nom client différent."
    : shippingMode !== "all"
      ? `Vous n'avez pas de commandes ${
          FILTER_OPTIONS.find((f) => f.value === shippingMode)?.label.toLowerCase()
        } terminées.`
      : "Vous n'avez pas encore de commandes terminées.\nElles apparaîtront ici une fois livrées.";

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.iconWell}>
        <MaterialCommunityIcons
          name={hasSearch ? "archive-search-outline" : "package-variant-closed"}
          size={42}
          color={colors.primary.main}
        />
      </View>
      <Text style={styles.emptyTitle}>
        {hasSearch ? "Aucun résultat" : "Aucune expédition terminée"}
      </Text>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
      {!hasSearch ? (
        <Pressable
          style={styles.browseButton}
          onPress={() => navigation.navigate("AddOrder" as never)}
          accessibilityRole="button"
        >
          <Text style={styles.browseButtonText}>Créer une commande</Text>
        </Pressable>
      ) : null}
    </View>
  );
};
