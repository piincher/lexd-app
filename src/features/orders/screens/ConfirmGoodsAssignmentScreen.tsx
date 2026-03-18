import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import { COLORS } from "@src/constants/Colors";

import { Header } from "@src/components/Header";
import { useAssignGoodsToOrder } from "../hooks/useAssignGoodsToOrder";

export const ConfirmGoodsAssignmentScreen: React.FC<
  AuthenticatedStackScreenProps<"ConfirmGoodsAssignment">
> = ({ navigation, route }) => {
  const { orderId, goodsId } = route.params || {};

  const { mutate, isPending } = useAssignGoodsToOrder({
    onSuccess: () => {
      navigation.navigate("AllOrders");
    },
  });

  const handleConfirm = () => {
    if (orderId && goodsId) {
      mutate({ orderId, goodsId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Confirmer l'assignation" showBackButton />

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>📦 Assigner les marchandises</Text>
            
            <Text style={styles.description}>
              Vous êtes sur le point d'assigner ces marchandises à une commande existante.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>ID Commande:</Text>
              <Text style={styles.infoValue}>{orderId}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>ID Marchandises:</Text>
              <Text style={styles.infoValue}>{goodsId}</Text>
            </View>

            <Text style={styles.warning}>
              ⚠️ Cette action mettra à jour le statut de la commande et calculera les totaux basés sur les marchandises.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.button}
            disabled={isPending}
          >
            Annuler
          </Button>
          
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.button}
            loading={isPending}
            disabled={isPending}
          >
            Confirmer
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: COLORS.darkGrey,
    marginBottom: 24,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: COLORS.lightBackground || "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.black,
  },
  warning: {
    fontSize: 14,
    color: COLORS.orange || "#FF9800",
    marginTop: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
