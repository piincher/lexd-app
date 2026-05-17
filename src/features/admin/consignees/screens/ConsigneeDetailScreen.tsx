import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useConsigneeDetail } from "../hooks/useConsigneeDetail";
import { ConsigneeDetailHeader } from "../components/ConsigneeDetailHeader";
import { ConsigneeDetailInfoSection } from "../components/ConsigneeDetailInfoSection";
import { ConsigneeDetailActions } from "../components/ConsigneeDetailActions";
import { ConsigneeDetailLoading } from "../components/ConsigneeDetailLoading";
import { ConsigneeDetailError } from "../components/ConsigneeDetailError";
import { createStyles } from "./ConsigneeDetailScreen.styles";

const ConsigneeDetailScreen: React.FC = () => {
   const { consignee, isLoading, error, isDeleting, handlers } = useConsigneeDetail();
   const { colors } = useAppTheme();
   const styles = createStyles(colors);

   if (isLoading) {
      return <ConsigneeDetailLoading />;
   }

   if (error || !consignee) {
      return <ConsigneeDetailError onBack={handlers.goBack} />;
   }

   return (
      <SafeAreaView style={styles.container}>
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

export default ConsigneeDetailScreen;
