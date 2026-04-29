import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { ShippingMode, FILTER_OPTIONS } from "../../hooks/usePastOrders";
import { createStyles } from "./PastOrdersEmptyState.styles";

interface PastOrdersEmptyStateProps {
  shippingMode: ShippingMode;
}

export const PastOrdersEmptyState: React.FC<PastOrdersEmptyStateProps> = ({
  shippingMode,
}) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const emptyMessage =
    shippingMode !== "all"
      ? `Vous n'avez pas de commandes ${
          FILTER_OPTIONS.find((f) => f.value === shippingMode)?.label.toLowerCase()
        } terminées.`
      : "Vous n'avez pas encore de commandes terminées.\nElles apparaîtront ici une fois livrées.";

  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="package-variant-closed"
        size={80}
        color={colors.text.disabled}
      />
      <Text style={styles.emptyTitle}>Aucune commande terminée</Text>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
      <Pressable
        style={styles.browseButton}
        onPress={() => navigation.navigate("AddOrder" as never)}
      >
        <Text style={styles.browseButtonText}>Créer une commande</Text>
      </Pressable>
    </View>
  );
};
