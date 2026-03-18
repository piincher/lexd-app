import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dialog, Text, Button, TextInput } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";

interface CancelOrderDialogProps {
  visible: boolean;
  orderCode: string;
  onDismiss: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

export const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  visible,
  orderCode,
  onDismiss,
  onConfirm,
  isLoading,
}) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const handleDismiss = () => {
    setReason("");
    onDismiss();
  };

  return (
    <Dialog visible={visible} onDismiss={handleDismiss}>
      <Dialog.Title>❌ Annuler la commande</Dialog.Title>
      
      <Dialog.Content>
        <Text style={styles.warning}>
          Êtes-vous sûr de vouloir annuler la commande {orderCode} ?
        </Text>
        
        <Text style={styles.note}>
          Cette action est irréversible. Les marchandises ne peuvent pas être assignées à une commande annulée.
        </Text>
        
        <TextInput
          label="Raison de l'annulation (optionnel)"
          value={reason}
          onChangeText={setReason}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />
      </Dialog.Content>
      
      <Dialog.Actions>
        <Button onPress={handleDismiss} disabled={isLoading}>
          Retour
        </Button>
        <Button
          onPress={handleConfirm}
          loading={isLoading}
          disabled={isLoading}
          textColor={COLORS.red || "#F44336"}
        >
          Confirmer l'annulation
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  warning: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.white,
  },
});
