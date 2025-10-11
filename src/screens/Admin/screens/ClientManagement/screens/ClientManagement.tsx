import React, { useState, useMemo } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   Alert,
   Platform,
   TextInput,
   StyleSheet,
   Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBlockandUnblockUser, useGetUsers } from "@src/screens/Admin/hooks/useGetUsers";
import { userData } from "@src/constants/types";
import { RootStackScreenProps } from "@src/navigations/type";
import { useNavigation } from "@react-navigation/native";

type ClientItemProps = {
   client: userData;
   onToggleBlock: (clientId: string) => void;
};

const ClientItem = ({ client, onToggleBlock }: ClientItemProps) => {
   const navigation = useNavigation<RootStackScreenProps<"ClientDetails">["navigation"]>();
   const handleBlockToggle = () => {
      Alert.alert(
         client.blocked ? "Unblock Client?" : "Block Client?",
         client.blocked
            ? `Are you sure you want to unblock ${client.firstName} ${client.lastName}?`
            : `Are you sure you want to block ${client.firstName} ${client.lastName}?`,
         [
            { text: "Cancel", style: "cancel" },
            {
               text: client.blocked ? "Unblock" : "Block",
               style: client.blocked ? "default" : "destructive",
               onPress: () => onToggleBlock(client._id),
            },
         ]
      );
   };

   return (
      <Pressable
         onPress={() =>
            navigation.navigate("ClientDetails", {
               id: client._id,
            })
         }
         style={styles.clientCard}
      >
         <View style={styles.clientInfo}>
            <View style={styles.nameContainer}>
               <Text style={styles.fullName}>
                  {client.firstName} {client.lastName}
               </Text>
               {client.blocked && (
                  <View style={styles.badge}>
                     <Text style={styles.badgeText}>BLOCKED</Text>
                  </View>
               )}
            </View>

            <Text style={styles.phone}>{client.phoneNumber}</Text>
         </View>

         <View style={styles.actionContainer}>
            <TouchableOpacity
               style={[
                  styles.actionButton,
                  client.blocked ? styles.unblockButton : styles.blockButton,
               ]}
               onPress={handleBlockToggle}
               activeOpacity={0.7}
            >
               <Ionicons
                  name={client.blocked ? "lock-open" : "lock-closed"}
                  size={20}
                  color={client.blocked ? "#10B981" : "#EF4444"}
               />
               <Text
                  style={[
                     styles.actionText,
                     client.blocked ? styles.unblockText : styles.blockText,
                  ]}
               >
                  {client.blocked ? "Unblock" : "Block"}
               </Text>
            </TouchableOpacity>
         </View>
      </Pressable>
   );
};

export default function ClientManagement({ navigation }: RootStackScreenProps<"ClientManagement">) {
   const [searchQuery, setSearchQuery] = useState("");

   const { data } = useGetUsers();
   const { mutate } = useBlockandUnblockUser();
   const clients = data ?? [];

   // Filter clients based on search query
   const filteredClients = useMemo(() => {
      if (!searchQuery.trim()) {
         return clients;
      }

      return clients.filter(
         (client) =>
            client.firstName.toLowerCase().includes(searchQuery) ||
            client.lastName.toLowerCase().includes(searchQuery) ||
            client?.phoneNumber?.toLowerCase().includes(searchQuery)
      );
   }, [searchQuery, clients]);

   const handleToggleBlock = (clientId: string) => {
      mutate(clientId);
      console.log(`Toggling block status for client ${clientId}`);
   };

   const renderClient = ({ item }: { item: userData }) => (
      <ClientItem client={item} onToggleBlock={handleToggleBlock} />
   );

   const clearSearch = () => {
      setSearchQuery("");
   };
   return (
      <SafeAreaView style={styles.container}>
         {/* Header */}
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Client Management</Text>
            <Text style={styles.headerSubtitle}>
               {filteredClients.length} clients • {filteredClients.filter((c) => c.blocked).length}{" "}
               blocked
            </Text>
         </View>

         {/* Search Bar */}
         <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
               <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
               <TextInput
                  style={styles.searchInput}
                  placeholder="Search by name or phone..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
               />
               {searchQuery ? (
                  <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                     <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
               ) : null}
            </View>
         </View>

         {/* Client List with FlashList */}
         <FlashList
            data={filteredClients}
            renderItem={renderClient}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                     {searchQuery ? "No clients match your search" : "No clients found"}
                  </Text>
                  {searchQuery ? (
                     <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                        <Text style={styles.clearSearchText}>Clear search</Text>
                     </TouchableOpacity>
                  ) : null}
               </View>
            }
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
   },
   header: {
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "android" ? 16 : 24,
      paddingBottom: 16,
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: 4,
   },
   headerSubtitle: {
      fontSize: 14,
      color: "#6B7280",
      fontWeight: "500",
   },
   searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
   },
   searchInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F3F4F6",
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 48,
   },
   searchIcon: {
      marginRight: 12,
   },
   searchInput: {
      flex: 1,
      fontSize: 16,
      color: "#1F2937",
      paddingVertical: 0,
   },
   clearButton: {
      padding: 4,
   },
   listContainer: {
      padding: 16,
   },
   clientCard: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
   },
   clientInfo: {
      flex: 1,
      marginRight: 16,
   },
   nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
   },
   fullName: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1F2937",
      flex: 1,
   },
   badge: {
      backgroundColor: "#FEE2E2",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      marginLeft: 8,
   },
   badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#EF4444",
   },
   phone: {
      fontSize: 15,
      color: "#4B5563",
      fontWeight: "500",
   },
   actionContainer: {
      width: 100,
   },
   actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 12,
   },
   blockButton: {
      backgroundColor: "#FEE2E2",
   },
   unblockButton: {
      backgroundColor: "#DCFCE7",
   },
   actionText: {
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 6,
   },
   blockText: {
      color: "#EF4444",
   },
   unblockText: {
      color: "#10B981",
   },
   emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 32,
   },
   emptyText: {
      fontSize: 16,
      color: "#6B7280",
      textAlign: "center",
      marginBottom: 16,
   },
   clearSearchButton: {
      backgroundColor: "#E5E7EB",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
   },
   clearSearchText: {
      color: "#4B5563",
      fontWeight: "600",
   },
});
