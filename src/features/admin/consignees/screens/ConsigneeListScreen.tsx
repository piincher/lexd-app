import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useConsigneeListScreen } from "./hooks/useConsigneeListScreen";
import { ConsigneeListLoading } from "../components/ConsigneeListLoading";
import { ConsigneeListError } from "../components/ConsigneeListError";
import { ConsigneeListContent } from "../components/ConsigneeListContent";
import { createStyles } from "./ConsigneeListScreen.styles";

const ConsigneeListScreen: React.FC = () => {
   const {
      searchQuery,
      setSearchQuery,
      filteredConsignees,
      isLoading,
      error,
      refetch,
      handleToggleStatus,
      handlers,
   } = useConsigneeListScreen();

   const { colors } = useAppTheme();
   const styles = createStyles(colors);

   if (isLoading) {
      return (
         <SafeAreaView style={styles.container}>
            <ConsigneeListLoading />
         </SafeAreaView>
      );
   }

   if (error) {
      return (
         <SafeAreaView style={styles.container}>
            <ConsigneeListError onRetry={refetch} />
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <ConsigneeListContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            consignees={filteredConsignees}
            onConsigneePress={handlers.handleConsigneePress}
            onToggleStatus={handleToggleStatus}
            onCreatePress={handlers.handleCreatePress}
         />
      </SafeAreaView>
   );
};

export default ConsigneeListScreen;
