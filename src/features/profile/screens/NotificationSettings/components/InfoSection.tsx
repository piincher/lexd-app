import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const InfoSection: React.FC = () => {
   return (
      <View style={styles.infoSection}>
         <Text style={styles.infoText}>
            Vous pouvez personnaliser les notifications que vous recevez a tout moment. Les alertes
            de securite importantes sont toujours envoyees.
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   infoSection: {
      padding: 16,
      marginTop: 8,
   },
   infoText: {
      fontSize: 13,
      color: Theme.colors.text.disabled,
      textAlign: "center",
      lineHeight: 18,
   },
});
