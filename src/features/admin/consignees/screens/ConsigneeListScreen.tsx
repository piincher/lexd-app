import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
   Text,
   Searchbar,
   FAB,
   Card,
   Chip,
   ActivityIndicator,
   Button,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useGetConsignees, useToggleConsigneeStatus } from "../hooks";
import { Consignee } from "../api";
import { COLORS } from "@src/constants/Colors";

type ConsigneeStackParamList = {
   ConsigneeList: undefined;
   ConsigneeDetail: { id: string };
   CreateConsignee: undefined;
};

type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

interface ConsigneeCardProps {
   consignee: Consignee;
   onPress: () => void;
   onToggleStatus: () => void;
}

const ConsigneeCard: React.FC<ConsigneeCardProps> = ({ consignee, onPress, onToggleStatus }) => {
   return (
      <Card style={styles.card} onPress={onPress}>
         <Card.Content>
            <View style={styles.cardHeader}>
               <View style={styles.nameContainer}>
                  <Text style={styles.name}>{consignee.name}</Text>
                  <Chip
                     style={[
                        styles.statusChip,
                        { backgroundColor: consignee.isActive ? COLORS.green : COLORS.grey },
                     ]}
                     textStyle={styles.statusChipText}
                  >
                     {consignee.isActive ? "Actif" : "Inactif"}
                  </Chip>
               </View>
               <TouchableOpacity onPress={onToggleStatus}>
                  <Ionicons
                     name={consignee.isActive ? "toggle" : "toggle-outline"}
                     size={28}
                     color={consignee.isActive ? COLORS.green : COLORS.grey}
                  />
               </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
               <Ionicons name="call-outline" size={16} color={COLORS.DimGray} />
               <Text style={styles.infoText}>{consignee.phone}</Text>
            </View>

            {consignee.email && (
               <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={16} color={COLORS.DimGray} />
                  <Text style={styles.infoText}>{consignee.email}</Text>
               </View>
            )}

            <View style={styles.infoRow}>
               <Ionicons name="cube-outline" size={16} color={COLORS.DimGray} />
               <Text style={styles.infoText}>
                  {consignee.assignedContainersCount} conteneur(s) assigné(s)
               </Text>
            </View>
         </Card.Content>
      </Card>
   );
};

const ConsigneeListScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp>();
   const [searchQuery, setSearchQuery] = useState("");

   const { data: consignees, isLoading, error, refetch } = useGetConsignees();
   const { mutate: toggleStatus } = useToggleConsigneeStatus();

   const filteredConsignees = (() => {
      if (!consignees) return [];
      if (!searchQuery.trim()) return consignees;

      const query = searchQuery.toLowerCase();
      return consignees.filter(
         (consignee) =>
            consignee.name.toLowerCase().includes(query) ||
            consignee.phone.toLowerCase().includes(query)
      );
   })();

   const handleConsigneePress = (id: string) => {
      navigation.navigate("ConsigneeDetail", { id });
   };

   const handleToggleStatus = (id: string, currentStatus: boolean) => {
      toggleStatus({ id, isActive: !currentStatus });
   };

   if (isLoading) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <ActivityIndicator size="large" color={COLORS.Crimson} />
            <Text style={styles.loadingText}>Chargement des destinataires...</Text>
         </SafeAreaView>
      );
   }

   if (error) {
      return (
         <SafeAreaView style={[styles.container, styles.centered]}>
            <Ionicons name="alert-circle-outline" size={48} color={COLORS.danger} />
            <Text style={styles.errorText}>Erreur lors du chargement</Text>
            <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
               Réessayer
            </Button>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Destinataires Bamako</Text>
            <Text style={styles.headerSubtitle}>
               {filteredConsignees.length} destinataire(s)
            </Text>
         </View>

         <Searchbar
            placeholder="Rechercher par nom ou téléphone"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={COLORS.DimGray}
         />

         <FlashList
            data={filteredConsignees}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
               <ConsigneeCard
                  consignee={item}
                  onPress={() => handleConsigneePress(item._id)}
                  onToggleStatus={() => handleToggleStatus(item._id, item.isActive)}
               />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  <Ionicons name="people-outline" size={64} color={COLORS.SlateGray} />
                  <Text style={styles.emptyText}>
                     {searchQuery
                        ? "Aucun destinataire ne correspond à votre recherche"
                        : "Aucun destinataire enregistré"}
                  </Text>
               </View>
            }
         />

         <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate("CreateConsignee")}
            color={COLORS.white}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.lightBackground,
   },
   centered: {
      justifyContent: "center",
      alignItems: "center",
   },
   header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: COLORS.DarkGrey,
   },
   headerSubtitle: {
      fontSize: 14,
      color: COLORS.DimGray,
      marginTop: 4,
   },
   searchBar: {
      margin: 16,
      backgroundColor: COLORS.white,
      borderRadius: 12,
      elevation: 2,
   },
   listContent: {
      padding: 16,
      paddingBottom: 80,
   },
   card: {
      marginBottom: 12,
      borderRadius: 12,
      backgroundColor: COLORS.white,
      elevation: 2,
   },
   cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
   },
   nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
   },
   name: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.DarkGrey,
      flex: 1,
   },
   statusChip: {
      marginLeft: 8,
      height: 24,
   },
   statusChipText: {
      fontSize: 12,
      color: COLORS.white,
      fontWeight: "500",
   },
   infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
   },
   infoText: {
      marginLeft: 8,
      fontSize: 14,
      color: COLORS.DimGray,
   },
   fab: {
      position: "absolute",
      right: 16,
      bottom: 24,
      backgroundColor: COLORS.Crimson,
   },
   emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 64,
   },
   emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: COLORS.DimGray,
      textAlign: "center",
   },
   loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: COLORS.DimGray,
   },
   errorText: {
      marginTop: 16,
      fontSize: 16,
      color: COLORS.danger,
   },
   retryButton: {
      marginTop: 16,
      backgroundColor: COLORS.Crimson,
   },
});

export default ConsigneeListScreen;
