import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface ConsigneeDetailHeaderProps {
   onBack: () => void;
   onEdit: () => void;
}

export const ConsigneeDetailHeader: React.FC<ConsigneeDetailHeaderProps> = ({ onBack, onEdit }) => {
   const { colors } = useAppTheme();

   return (
      <View
         style={[
            styles.header,
            { backgroundColor: colors.background.card, borderBottomColor: colors.border },
         ]}
      >
         <IconButton icon="arrow-left" size={24} onPress={onBack} iconColor={colors.text.secondary} />
         <Text style={[styles.headerTitle, { color: colors.text.secondary }]}>
            Détails du destinataire
         </Text>
         <IconButton icon="pencil" size={24} onPress={onEdit} iconColor={colors.status.success} />
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: "600",
   },
});
