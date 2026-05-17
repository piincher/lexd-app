import React from "react";
import { View, Text, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { productType } from '@src/shared/types/order';
import { useAppTheme } from "@src/providers/ThemeProvider";
import { OrderInfoRow } from "./OrderInfoRow";
import { createOrderInfoCardStyles } from "./OrderInfoCard.styles";

interface OrderInfoCardProps {
  order: productType;
  onCopyCode?: () => void;
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  order,
  onCopyCode,
}) => {
  const { colors } = useAppTheme();
  const styles = createOrderInfoCardStyles(colors);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="information" size={20} color={colors.status.success} />
        <Text style={styles.headerTitle}>Informations</Text>
      </View>
      <Card.Content>
        <OrderInfoRow
          icon="pound-box"
          label="N° de suivi"
          trailing={
            <Pressable onPress={onCopyCode} style={styles.codeRow}>
              <Text style={styles.codeText}>{order.code || "N/A"}</Text>
              <Feather name="copy" size={14} color={colors.status.success} />
            </Pressable>
          }
        />
        <OrderInfoRow icon="account" label="Client" value={order.clientName} />
        <OrderInfoRow icon="phone" label="Téléphone" value={order.clientPhone} />
        <OrderInfoRow
          icon="shape"
          label="Catégorie"
          value={order.category?.name || order.typeOfPackage}
          optional
        />
        <OrderInfoRow
          icon="truck-delivery"
          label="Transporteur"
          value={order.contenairNumber || order.partenaire}
        />
      </Card.Content>
    </Card>
  );
};
