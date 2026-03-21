import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { imagesType } from "@src/api/order";

interface OrderImageSectionProps {
   images?: imagesType;
}

export const OrderImageSection: React.FC<OrderImageSectionProps> = ({ images }) => {
   const hasImages = images && images.length > 0;

   return (
      <Card style={styles.card}>
         {hasImages ? (
            <Image
               source={{ uri: images[0].url }}
               style={styles.image}
               resizeMode="cover"
            />
         ) : (
            <View style={[styles.image, styles.placeholder]}>
               <MaterialCommunityIcons name="package-variant" size={56} color="#D1D5DB" />
               <Text style={styles.placeholderText}>Aucune photo</Text>
            </View>
         )}
      </Card>
   );
};

const styles = StyleSheet.create({
   card: {
      marginHorizontal: 16,
      borderRadius: 14,
      overflow: "hidden",
      elevation: 2,
   },
   image: {
      width: "100%",
      height: 200,
   },
   placeholder: {
      backgroundColor: "#F3F4F6",
      justifyContent: "center",
      alignItems: "center",
   },
   placeholderText: {
      marginTop: 8,
      fontSize: 13,
      color: "#9CA3AF",
   },
});
