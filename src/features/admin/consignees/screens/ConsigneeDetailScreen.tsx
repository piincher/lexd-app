import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, Linking, Alert } from "react-native";
import {
   Text,
   Card,
   Button,
   Chip,
   ActivityIndicator,
   IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useGetConsigneeById, useDeleteConsignee } from "../hooks";
import { useAppTheme } from "@src/providers/ThemeProvider";

type ConsigneeStackParamList = {
   ConsigneeList: undefined;
   ConsigneeDetail: { id: string };
   EditConsignee: { id: string };
};

type ConsigneeDetailRouteProp = RouteProp<ConsigneeStackParamList, "ConsigneeDetail">;
type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

const ConsigneeDetailScreen: React.FC = () => {
   const route = useRoute<ConsigneeDetailRouteProp>();
   const navigation = useNavigation<NavigationProp>();
   const { id } = route.params;

   const { colors, isDark } = useAppTheme();

   const styles = useMemo(() => StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: colors.background.paper,
      },
      centered: {
         justifyContent: "center",
         alignItems: "center",
      },
      header: {
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
         paddingHorizontal: 8,
         paddingVertical: 8,
         backgroundColor: colors.background.card,
         borderBottomWidth: 1,
         borderBottomColor: colors.border,
      },
      headerTitle: {
         fontSize: 18,
         fontWeight: "600",
         color: colors.text.secondary,
      },
      scrollView: {
         flex: 1,
      },
      mainCard: {
         margin: 16,
         marginBottom: 8,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      nameSection: {
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
      },
      name: {
         fontSize: 24,
         fontWeight: "700",
         color: colors.text.secondary,
         flex: 1,
      },
      statusChip: {
         height: 28,
      },
      statusChipText: {
         color: colors.text.inverse,
         fontWeight: "600",
      },
      infoCard: {
         marginHorizontal: 16,
         marginBottom: 12,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      sectionTitle: {
         fontSize: 16,
         fontWeight: "600",
         color: colors.text.secondary,
         marginBottom: 16,
      },
      infoItem: {
         flexDirection: "row",
         alignItems: "flex-start",
         marginBottom: 16,
      },
      infoContent: {
         marginLeft: 12,
         flex: 1,
      },
      infoLabel: {
         fontSize: 12,
         color: colors.text.secondary,
         marginBottom: 2,
      },
      infoValue: {
         fontSize: 16,
         color: colors.text.secondary,
         fontWeight: "500",
      },
      addressText: {
         marginLeft: 12,
         fontSize: 16,
         color: colors.text.secondary,
         flex: 1,
         lineHeight: 22,
      },
      statsContainer: {
         flexDirection: "row",
         justifyContent: "space-around",
      },
      statItem: {
         alignItems: "center",
      },
      statNumber: {
         fontSize: 32,
         fontWeight: "700",
         color: colors.status.success,
      },
      statLabel: {
         fontSize: 14,
         color: colors.text.secondary,
         marginTop: 4,
      },
      actionButtons: {
         flexDirection: "row",
         marginHorizontal: 16,
         marginTop: 8,
         marginBottom: 12,
         gap: 12,
      },
      actionButton: {
         flex: 1,
         borderRadius: 12,
      },
      callButton: {
         backgroundColor: colors.primary.main,
      },
      whatsappButton: {
         backgroundColor: "#25D366",
      },
      deleteButton: {
         marginHorizontal: 16,
         marginBottom: 32,
         borderColor: colors.status.error,
         borderRadius: 12,
      },
      loadingText: {
         marginTop: 16,
         fontSize: 16,
         color: colors.text.secondary,
      },
      errorText: {
         marginTop: 16,
         fontSize: 16,
         color: colors.status.error,
         marginBottom: 16,
      },
   }), [colors, isDark]);

   const { data: consignee, isLoading, error } = useGetConsigneeById(id);
   const { mutate: deleteConsignee, isPending: isDeleting } = useDeleteConsignee();

   const handleCall = () => {
      if (consignee?.phone) {
         Linking.openURL(`tel:${consignee.phone}`);
      }
   };

   const handleWhatsApp = () => {
      if (consignee?.phone) {
         const whatsappUrl = `https://wa.me/${consignee.phone.replace(/\D/g, "")}`;
         Linking.openURL(whatsappUrl);
      }
   };

   const handleEdit = () => {
      navigation.navigate("EditConsignee", { id });
   };

   const handleDelete = () => {
      Alert.alert(
         "Supprimer le destinataire",
         `Êtes-vous sûr de vouloir supprimer ${consignee?.name} ?`,
         [
            { text: "Annuler", style: "cancel" },
            {
               text: "Supprimer",
               style: "destructive",
               onPress: () => {
                  deleteConsignee(id, {
                     onSuccess: () => {
                        navigation.goBack();
                     },
                  });
               },
            },
         ]
      );
   };

   if (isLoading) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <ActivityIndicator size="large" color={colors.status.success} />
            <Text style={styles.loadingText}>Chargement...</Text>
         </SafeAreaView>
      );
   }

   if (error || !consignee) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
            <Text style={styles.errorText}>Erreur lors du chargement</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>
               Retour
            </Button>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <IconButton
               icon="arrow-left"
               size={24}
               onPress={() => navigation.goBack()}
               iconColor={colors.text.secondary}
            />
            <Text style={styles.headerTitle}>Détails du destinataire</Text>
            <IconButton icon="pencil" size={24} onPress={handleEdit} iconColor={colors.status.success} />
         </View>

         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Card style={styles.mainCard}>
               <Card.Content>
                  <View style={styles.nameSection}>
                     <Text style={styles.name}>{consignee.name}</Text>
                     <Chip
                        style={[
                           styles.statusChip,
                           { backgroundColor: consignee.isActive ? colors.status.success : colors.text.secondary },
                        ]}
                        textStyle={styles.statusChipText}
                     >
                        {consignee.isActive ? "Actif" : "Inactif"}
                     </Chip>
                  </View>
               </Card.Content>
            </Card>

            <Card style={styles.infoCard}>
               <Card.Content>
                  <Text style={styles.sectionTitle}>Informations de contact</Text>

                  <View style={styles.infoItem}>
                     <Ionicons name="call-outline" size={20} color={colors.status.success} />
                     <View style={styles.infoContent}>
                        <Text style={styles.infoLabel}>Téléphone</Text>
                        <Text style={styles.infoValue}>{consignee.phone}</Text>
                     </View>
                  </View>

                  {consignee.email && (
                     <View style={styles.infoItem}>
                        <Ionicons name="mail-outline" size={20} color={colors.status.success} />
                        <View style={styles.infoContent}>
                           <Text style={styles.infoLabel}>Email</Text>
                           <Text style={styles.infoValue}>{consignee.email}</Text>
                        </View>
                     </View>
                  )}
               </Card.Content>
            </Card>

            <Card style={styles.infoCard}>
               <Card.Content>
                  <Text style={styles.sectionTitle}>Adresse de l'entrepôt</Text>
                  <View style={styles.infoItem}>
                     <Ionicons name="location-outline" size={20} color={colors.status.success} />
                     <Text style={styles.addressText}>{consignee.warehouseAddress}</Text>
                  </View>
               </Card.Content>
            </Card>

            <Card style={styles.infoCard}>
               <Card.Content>
                  <Text style={styles.sectionTitle}>Statistiques</Text>
                  <View style={styles.statsContainer}>
                     <View style={styles.statItem}>
                        <Text style={styles.statNumber}>
                           {consignee.assignedContainersCount}
                        </Text>
                        <Text style={styles.statLabel}>Conteneurs assignés</Text>
                     </View>
                  </View>
               </Card.Content>
            </Card>

            <View style={styles.actionButtons}>
               <Button
                  mode="contained"
                  onPress={handleCall}
                  style={[styles.actionButton, styles.callButton]}
                  icon="phone"
               >
                  Appeler
               </Button>
               <Button
                  mode="contained"
                  onPress={handleWhatsApp}
                  style={[styles.actionButton, styles.whatsappButton]}
                  icon="whatsapp"
               >
                  WhatsApp
               </Button>
            </View>

            <Button
               mode="outlined"
               onPress={handleDelete}
               style={styles.deleteButton}
               textColor={colors.status.error}
               loading={isDeleting}
               disabled={isDeleting}
            >
               Supprimer le destinataire
            </Button>
         </ScrollView>
      </SafeAreaView>
   );
};

export default ConsigneeDetailScreen;
