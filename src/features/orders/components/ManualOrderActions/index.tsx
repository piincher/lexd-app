import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface ManualOrderActionsProps {
  order: {
    _id: string;
    manualOrderStatus: "PREBOOKING" | "AWAITING_GOODS" | "LINKED";
    isGoodsLinked: boolean;
  };
  onEdit: () => void;
  onConvert: () => void;
  onCancel: () => void;
  onAssignGoods: () => void;
}

export const ManualOrderActions: React.FC<ManualOrderActionsProps> = ({
  order,
  onEdit,
  onConvert,
  onCancel,
  onAssignGoods,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const canEdit = !order.isGoodsLinked;
  const canConvert = order.manualOrderStatus === "PREBOOKING";
  const canCancel = !order.isGoodsLinked;
  const canAssignGoods = order.manualOrderStatus === "AWAITING_GOODS";

  return (
    <View style={styles.container}>
      {canAssignGoods && (
        <Button
          mode="contained"
          icon="link"
          onPress={onAssignGoods}
          style={[styles.button, styles.primaryButton]}
        >
          Assigner des marchandises
        </Button>
      )}

      {canConvert && (
        <Button
          mode="contained"
          icon="swap-horizontal"
          onPress={onConvert}
          style={[styles.button, styles.convertButton]}
        >
          Convertir pré-résa
        </Button>
      )}

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            icon="dots-horizontal"
            onPress={() => setMenuVisible(true)}
            style={styles.button}
          >
            Actions
          </Button>
        }
      >
        {canEdit && (
          <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              onEdit();
            }}
            title="Modifier"
            leadingIcon="pencil"
          />
        )}
        
        {canCancel && (
          <>
            <Divider />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                onCancel();
              }}
              title="Annuler la commande"
              leadingIcon="close-circle"
              titleStyle={{ color: COLORS.red || "#F44336" }}
            />
          </>
        )}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  button: {
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.blue,
  },
  convertButton: {
    backgroundColor: COLORS.orange || "#FF9800",
  },
});
