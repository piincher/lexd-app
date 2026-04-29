import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailActionsProps {
   onCall: () => void;
   onWhatsApp: () => void;
   onDelete: () => void;
   isDeleting: boolean;
}

export const ConsigneeDetailActions: React.FC<ConsigneeDetailActionsProps> = ({
   onCall,
   onWhatsApp,
   onDelete,
   isDeleting,
}) => {
   const { colors } = useAppTheme();

   return (
      <>
         <View style={styles.actionButtons}>
            <Button
               mode="contained"
               onPress={onCall}
               style={[styles.actionButton, { backgroundColor: colors.primary.main }]}
               icon="phone"
            >
               Appeler
            </Button>
            <Button
               mode="contained"
               onPress={onWhatsApp}
               style={[styles.actionButton, { backgroundColor: "#25D366" }]}
               icon="whatsapp"
            >
               WhatsApp
            </Button>
         </View>

         <Button
            mode="outlined"
            onPress={onDelete}
            style={[styles.deleteButton, { borderColor: colors.status.error }]}
            textColor={colors.status.error}
            loading={isDeleting}
            disabled={isDeleting}
         >
            Supprimer le destinataire
         </Button>
      </>
   );
};

const styles = StyleSheet.create({
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
   deleteButton: {
      marginHorizontal: 16,
      marginBottom: 32,
      borderRadius: 12,
   },
});
