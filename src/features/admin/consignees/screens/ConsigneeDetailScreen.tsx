import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useConsigneeDetail } from "../hooks/useConsigneeDetail";
import { ConsigneeDetailHeader } from "../components/ConsigneeDetailHeader";
import { ConsigneeDetailInfoSection } from "../components/ConsigneeDetailInfoSection";
import { ConsigneeDetailActions } from "../components/ConsigneeDetailActions";
import { ConsigneeDetailLoading } from "../components/ConsigneeDetailLoading";
import { ConsigneeDetailError } from "../components/ConsigneeDetailError";

const ConsigneeDetailScreen: React.FC = () => {
   const { consignee, isLoading, error, isDeleting, handlers, colors } = useConsigneeDetail();

   if (isLoading) {
      return <ConsigneeDetailLoading />;
   }

   if (error || !consignee) {
      return <ConsigneeDetailError onBack={handlers.goBack} />;
   }

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]}>
         <ConsigneeDetailHeader onBack={handlers.goBack} onEdit={handlers.edit} />
         <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <ConsigneeDetailInfoSection consignee={consignee} />
            <ConsigneeDetailActions
               onCall={handlers.call}
               onWhatsApp={handlers.whatsapp}
               onDelete={handlers.delete}
               isDeleting={isDeleting}
            />
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollView: {
      flex: 1,
   },
});

export default ConsigneeDetailScreen;
