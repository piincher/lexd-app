import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useConsigneeList } from "../hooks/useConsigneeList";
import { ConsigneeListLoading } from "../components/ConsigneeListLoading";
import { ConsigneeListError } from "../components/ConsigneeListError";
import { ConsigneeListContent } from "../components/ConsigneeListContent";

type ConsigneeStackParamList = {
   ConsigneeList: undefined;
   ConsigneeDetail: { id: string };
   CreateConsignee: undefined;
};

type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

const ConsigneeListScreen: React.FC = () => {
   const navigation = useNavigation<NavigationProp>();
   const { colors } = useAppTheme();
   const {
      searchQuery,
      setSearchQuery,
      filteredConsignees,
      isLoading,
      error,
      refetch,
      handleToggleStatus,
   } = useConsigneeList();

   if (isLoading) {
      return (
         <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
            <ConsigneeListLoading />
         </SafeAreaView>
      );
   }

   if (error) {
      return (
         <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
            <ConsigneeListError onRetry={refetch} />
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
         <ConsigneeListContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            consignees={filteredConsignees}
            onConsigneePress={(id) => navigation.navigate("ConsigneeDetail", { id })}
            onToggleStatus={handleToggleStatus}
            onCreatePress={() => navigation.navigate("CreateConsignee")}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default ConsigneeListScreen;
