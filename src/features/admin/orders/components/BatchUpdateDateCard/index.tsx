import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface BatchUpdateDateCardProps {
   date?: Date;
   onPress: () => void;
}

export const BatchUpdateDateCard: React.FC<BatchUpdateDateCardProps> = ({ date, onPress }) => {
   const { colors } = useAppTheme();
   const label = date ? date.toLocaleDateString() : "Choisir une date";

   return (
      <Pressable
         accessibilityRole="button"
         accessibilityLabel="Choisir la date de départ"
         onPress={onPress}
         style={({ pressed }) => [
            styles.container,
            {
               backgroundColor: colors.background.card,
               borderColor: colors.border,
               opacity: pressed ? 0.78 : 1,
            },
         ]}
      >
         <View style={[styles.iconWrap, { backgroundColor: colors.feedback.infoBg }]}>
            <Ionicons name="calendar-outline" size={20} color={colors.status.info} />
         </View>
         <View style={styles.content}>
            <Text style={[styles.label, { color: colors.text.secondary }]}>Date de départ</Text>
            <Text style={[styles.value, { color: colors.text.primary }]}>{label}</Text>
         </View>
         <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
      </Pressable>
   );
};

const styles = StyleSheet.create({
   container: {
      minHeight: 72,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
   },
   iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      flex: 1,
   },
   label: {
      fontSize: 12,
      fontWeight: "700",
   },
   value: {
      fontSize: 17,
      fontWeight: "800",
      marginTop: 2,
   },
});
