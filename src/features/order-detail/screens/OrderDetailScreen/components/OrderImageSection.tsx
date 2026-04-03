import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { imagesType } from "@src/api/order";

interface OrderImageSectionProps {
   images?: imagesType;
   goodsIds?: any[];
}

export const OrderImageSection: React.FC<OrderImageSectionProps> = ({ images, goodsIds }) => {
   // Collect all photos: order-level images + goods photos
   const allPhotos: string[] = [];

   if (images && images.length > 0) {
      images.forEach((img) => allPhotos.push(img.url));
   }

   if (goodsIds && goodsIds.length > 0) {
      goodsIds.forEach((goods) => {
         if (Array.isArray(goods.photos)) {
            goods.photos.forEach((url: string) => {
               if (url && !allPhotos.includes(url)) allPhotos.push(url);
            });
         }
      });
   }

   if (allPhotos.length === 0) {
      return (
         <Card style={styles.card}>
            <View style={[styles.image, styles.placeholder]}>
               <MaterialCommunityIcons name="package-variant" size={56} color="#D1D5DB" />
               <Text style={styles.placeholderText}>Aucune photo</Text>
            </View>
         </Card>
      );
   }

   if (allPhotos.length === 1) {
      return (
         <Card style={styles.card}>
            <Image source={{ uri: allPhotos[0] }} style={styles.image} resizeMode="cover" />
         </Card>
      );
   }

   // Multiple photos — horizontal scroll
   return (
      <Card style={styles.card}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allPhotos.map((url, index) => (
               <Image
                  key={index}
                  source={{ uri: url }}
                  style={styles.imageMulti}
                  resizeMode="cover"
               />
            ))}
         </ScrollView>
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
   imageMulti: {
      width: 280,
      height: 200,
      marginRight: 4,
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
