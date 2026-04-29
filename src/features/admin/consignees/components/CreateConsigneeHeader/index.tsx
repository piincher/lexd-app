import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface CreateConsigneeHeaderProps {
   onBack: () => void;
}

export const CreateConsigneeHeader: React.FC<CreateConsigneeHeaderProps> = ({ onBack }) => {
   const { colors } = useAppTheme();

   return (
      <View
         style={[
            styles.header,
            { backgroundColor: colors.background.card, borderBottomColor: colors.border },
         ]}
      >
         <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.secondary}
            onPress={onBack}
         />
         <Text style={[styles.headerTitle, { color: colors.text.secondary }]}>
            Nouveau destinataire
         </Text>
         <View style={{ width: 24 }} />
      </View>
   );
};

const styles = StyleSheet.create({
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
   },
   headerTitle: {
      fontSize: 18,
      fontWeight: "600",
   },
});
