import React from "react";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Searchbar, FAB, Text } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Consignee } from "../../api";
import { ConsigneeCard } from "../ConsigneeCard";
import { ConsigneeListEmpty } from "../ConsigneeListEmpty";

interface ConsigneeListContentProps {
   searchQuery: string;
   onSearchChange: (query: string) => void;
   consignees: Consignee[];
   onConsigneePress: (id: string) => void;
   onToggleStatus: (id: string, currentStatus: boolean) => void;
   onCreatePress: () => void;
}

export const ConsigneeListContent: React.FC<ConsigneeListContentProps> = ({
   searchQuery,
   onSearchChange,
   consignees,
   onConsigneePress,
   onToggleStatus,
   onCreatePress,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.container}>
         <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Destinataires Bamako</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
               {consignees.length} destinataire(s)
            </Text>
         </View>

         <Searchbar
            placeholder="Rechercher par nom ou téléphone"
            onChangeText={onSearchChange}
            value={searchQuery}
            style={[styles.searchBar, { backgroundColor: colors.background.card }]}
            iconColor={colors.text.secondary}
         />

         <FlashList
            data={consignees}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
               <ConsigneeCard
                  consignee={item}
                  onPress={() => onConsigneePress(item._id)}
                  onToggleStatus={() => onToggleStatus(item._id, item.isActive)}
               />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<ConsigneeListEmpty searchQuery={searchQuery} />}
         />

         <FAB
            style={[styles.fab, { backgroundColor: colors.primary.main }]}
            icon="plus"
            onPress={onCreatePress}
            color={colors.background.default}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
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
   fab: {
      position: "absolute",
      right: 16,
      bottom: 24,
   },
});
