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
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useGetConsignees, useToggleConsigneeStatus } from "../hooks";
import { Consignee } from "../api";
import { useAppTheme } from "@src/providers/ThemeProvider";

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
   const { colors } = useAppTheme();

   return (
      <Card style={[styles.card, { backgroundColor: colors.background.card }]} onPress={onPress}>
         <Card.Content>
            <View style={styles.cardHeader}>
               <View style={styles.nameContainer}>
                  <Text style={[styles.name, { color: colors.text.primary }]}>{consignee.name}</Text>
                  <Chip
                     style={[
                        styles.statusChip,
                        { backgroundColor: consignee.isActive ? colors.status.success : colors.text.disabled },
                     ]}
                     textStyle={[styles.statusChipText, { color: colors.background.default }]}
                  >
                     {consignee.isActive ? "Actif" : "Inactif"}
                  </Chip>
               </View>
               <TouchableOpacity onPress={onToggleStatus}>
                  <Ionicons
                     name={consignee.isActive ? "toggle" : "toggle-outline"}
                     size={28}
                     color={consignee.isActive ? colors.status.success : colors.text.disabled}
                  />
               </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
               <Ionicons name="call-outline" size={16} color={colors.text.secondary} />
               <Text style={[styles.infoText, { color: colors.text.secondary }]}>{consignee.phone}</Text>
            </View>

            {consignee.email && (
               <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
                  <Text style={[styles.infoText, { color: colors.text.secondary }]}>{consignee.email}</Text>
               </View>
            )}

            <View style={styles.infoRow}>
               <Ionicons name="cube-outline" size={16} color={colors.text.secondary} />
               <Text style={[styles.infoText, { color: colors.text.secondary }]}>
                  {consignee.assignedContainersCount} conteneur(s) assigné(s)
               </Text>
            </View>
         </Card.Content>
      </Card>
   );
};

const ConsigneeListScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp>();
   const { colors } = useAppTheme();
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
         <SafeAreaView style={[styles.container, styles.centered, { backgroundColor: colors.background.default }]}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={[styles.loadingText, { color: colors.text.secondary }]}>Chargement des destinataires...</Text>
         </SafeAreaView>
      );
   }

   if (error) {
      return (
         <SafeAreaView style={[styles.container, styles.centered, { backgroundColor: colors.background.default }]}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.status.error} />
            <Text style={[styles.errorText, { color: colors.status.error }]}>Erreur lors du chargement</Text>
            <Button mode="contained" onPress={() => refetch()} style={[styles.retryButton, { backgroundColor: colors.primary.main }]}>
               Réessayer
            </Button>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
         <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Destinataires Bamako</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
               {filteredConsignees.length} destinataire(s)
            </Text>
         </View>

         <Searchbar
            placeholder="Rechercher par nom ou téléphone"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[styles.searchBar, { backgroundColor: colors.background.card }]}
            iconColor={colors.text.secondary}
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
                  <Ionicons name="people-outline" size={64} color={colors.text.disabled} />
                  <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
                     {searchQuery
                        ? "Aucun destinataire ne correspond à votre recherche"
                        : "Aucun destinataire enregistré"}
                  </Text>
               </View>
            }
         />

         <FAB
            style={[styles.fab, { backgroundColor: colors.primary.main }]}
            icon="plus"
            onPress={() => navigation.navigate("CreateConsignee")}
            color={colors.background.default}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   centered: {
      justifyContent: "center",
      alignItems: "center",
   },
   header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: "700",
   },
   headerSubtitle: {
      fontSize: 14,
      marginTop: 4,
   },
   searchBar: {
      margin: 16,
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
      flex: 1,
   },
   statusChip: {
      marginLeft: 8,
      height: 24,
   },
   statusChipText: {
      fontSize: 12,
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
   },
   fab: {
      position: "absolute",
      right: 16,
      bottom: 24,
   },
   emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 64,
   },
   emptyText: {
      marginTop: 16,
      fontSize: 16,
      textAlign: "center",
   },
   loadingText: {
      marginTop: 16,
      fontSize: 16,
   },
   errorText: {
      marginTop: 16,
      fontSize: 16,
   },
   retryButton: {
      marginTop: 16,
   },
});

export default ConsigneeListScreen;
