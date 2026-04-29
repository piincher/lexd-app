import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Appbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";

interface OrderDetailErrorProps {
   error: Error | null;
   onRetry: () => void;
   navigation: RootStackScreenProps<"OrderDetail">["navigation"];
}

export const OrderDetailError: React.FC<OrderDetailErrorProps> = ({
   error,
   onRetry,
   navigation,
}) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            container: {
               flex: 1,
               backgroundColor: colors.background.default,
            },
            center: {
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               padding: 32,
            },
            errorTitle: {
               marginTop: 16,
               fontSize: 18,
               fontWeight: "700",
               color: colors.text.primary,
            },
            errorText: {
               marginTop: 8,
               fontSize: 14,
               color: colors.text.secondary,
               textAlign: "center",
            },
            retryBtn: {
               marginTop: 20,
            },
         }),
      [colors]
   );

   return (
      <SafeAreaView style={styles.container}>
         <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Détails" />
         </Appbar.Header>
         <View style={styles.center}>
            <MaterialCommunityIcons
               name="alert-circle"
               size={56}
               color={colors.status.error}
            />
            <Text style={styles.errorTitle}>Erreur de chargement</Text>
            <Text style={styles.errorText}>
               {(error as any)?.message ||
                  "Impossible de charger les détails de cette commande."}
            </Text>
            <Button mode="contained" onPress={onRetry} style={styles.retryBtn}>
               Réessayer
            </Button>
         </View>
      </SafeAreaView>
   );
};
