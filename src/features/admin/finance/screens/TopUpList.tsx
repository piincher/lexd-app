import React, { useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Image,
   TouchableOpacity,
   ActivityIndicator,
   Dimensions,
   TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
   FadeInRight,
   FadeOutRight,
   Layout,
   useSharedValue,
   useAnimatedStyle,
   withTiming,
} from "react-native-reanimated";
import { SegmentedButtons, IconButton } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useAdminGetTopUp, useUpdateTopupStatus } from "../hooks/useTopUp";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const STATUSES = ["pending", "approved", "rejected"];

const { width, height } = Dimensions.get("window");

interface TopUpItem {
   _id: string;
   proofImage: string;
   user: {
      firstName: string;
      phoneNumber: string;
   };
   amount: number;
   createdAt: string;
   status: "pending" | "approved" | "rejected";
}

const AdminTopUpList = () => {
   const [selectedStatus, setSelectedStatus] = useState("pending");
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const { data } = useAdminGetTopUp();
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

   const { mutate } = useUpdateTopupStatus();

   // zoom values
   const scale = useSharedValue(1);
   const savedScale = useSharedValue(1);
   const isZoomed = useSharedValue(false);

   // Pinch gesture
   const pinch = Gesture.Pinch()
      .onUpdate((e) => {
         scale.value = savedScale.value * e.scale;
      })
      .onEnd(() => {
         savedScale.value = scale.value;
      });

   // Double tap gesture
   const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
         if (isZoomed.value) {
            scale.value = withTiming(1);
            savedScale.value = 1;
            isZoomed.value = false;
         } else {
            scale.value = withTiming(2);
            savedScale.value = 2;
            isZoomed.value = true;
         }
      });

   const animatedImageStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
   }));

   const handleStatusChange = (_id: string, newStatus: "approved" | "rejected") => {
      mutate({ _id, status: newStatus } as any);
   };

   const renderItem = ({ item, index }: { item: TopUpItem; index: number }) => (
      <Animated.View
         key={item._id}
         entering={FadeInRight.delay(index * 50)}
         exiting={FadeOutRight}
         layout={Layout.springify()}
         style={styles.itemContainer}
      >
         <View style={styles.itemContent}>
            <TouchableOpacity onPress={() => setSelectedImage(item.proofImage)}>
               <Image source={{ uri: item.proofImage }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
               <Text style={styles.name}>{item.user?.firstName || "Unknown"}</Text>
               <Text style={styles.phone}>{item.user?.phoneNumber || "N/A"}</Text>
               <Text style={styles.amount}>{item.amount?.toLocaleString()} FCFA</Text>
               <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
         </View>

         {selectedStatus === "pending" && (
            <View style={styles.actions}>
               <IconButton
                  icon="check-circle"
                  size={28}
                  iconColor={COLORS.green}
                  onPress={() => handleStatusChange(item._id, "approved")}
                  style={styles.actionButton}
               />
               <IconButton
                  icon="close-circle"
                  size={28}
                  iconColor={COLORS.redShade}
                  onPress={() => handleStatusChange(item._id, "rejected")}
                  style={styles.actionButton}
               />
            </View>
         )}
      </Animated.View>
   );

   return (
      <GestureHandlerRootView style={styles.container}>
         <BlurView intensity={80} tint="light" style={styles.blurContainer}>
            <Text style={styles.title}>Top-Up Requests</Text>
            <SegmentedButtons
               value={selectedStatus}
               onValueChange={setSelectedStatus}
               buttons={STATUSES.map((status) => ({
                  value: status,
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  style: {
                     backgroundColor:
                        selectedStatus === status ? COLORS.blue : undefined,
                  },
                  labelStyle: {
                     color: selectedStatus === status ? COLORS.white : COLORS.lightGray,
                     fontFamily: Fonts.bold,
                  },
               }))}
               style={styles.segmentedControl}
            />
            <FlatList
               data={((data as unknown as TopUpItem[]) ?? []).filter((item) => item.status === selectedStatus)}
               keyExtractor={(item) => item._id}
               renderItem={renderItem}
               contentContainerStyle={styles.listContent}
               ListFooterComponent={() => (
                  <View style={styles.footer}>
                     {loading && <ActivityIndicator size="large" color={COLORS.blue} />}
                     {!hasMore && <Text style={styles.noMoreText}>No more requests</Text>}
                  </View>
               )}
            />
         </BlurView>

         {/* Full-screen image overlay */}
         {selectedImage && (
            <TouchableWithoutFeedback style={styles.overlayContainer}>
               <GestureDetector gesture={Gesture.Simultaneous(pinch, doubleTap)}>
                  <View style={styles.modalContent}>
                     <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                           setSelectedImage(null);
                           scale.value = 1;
                           savedScale.value = 1;
                           isZoomed.value = false;
                        }}
                     >
                        <MaterialIcons name="close" size={28} color="white" />
                     </TouchableOpacity>
                     <Animated.Image
                        source={{ uri: selectedImage }}
                        style={[styles.fullImage, animatedImageStyle]}
                        resizeMode="contain"
                     />
                  </View>
               </GestureDetector>
            </TouchableWithoutFeedback>
         )}
      </GestureHandlerRootView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
   },
   blurContainer: {
      flex: 1,
      padding: 16,
   },
   title: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      marginBottom: 16,
      textAlign: "center",
      color: COLORS.black,
   },
   segmentedControl: {
      marginBottom: 16,
   },
   listContent: {
      paddingBottom: 20,
   },
   itemContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      marginVertical: 8,
      padding: 16,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   itemContent: {
      flexDirection: "row",
      alignItems: "center",
   },
   image: {
      width: 60,
      height: 60,
      borderRadius: 8,
   },
   textContainer: {
      marginLeft: 12,
      flex: 1,
   },
   name: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: COLORS.black,
   },
   phone: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: COLORS.grey,
   },
   amount: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: COLORS.blue,
      marginTop: 4,
   },
   date: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: COLORS.lightGray,
      marginTop: 2,
   },
   actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 12,
   },
   actionButton: {
      margin: 0,
   },
   footer: {
      paddingVertical: 20,
      alignItems: "center",
   },
   noMoreText: {
      fontFamily: Fonts.regular,
      color: COLORS.grey,
   },
   overlayContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.9)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
   },
   modalContent: {
      width,
      height,
      justifyContent: "center",
      alignItems: "center",
   },
   closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 10,
   },
   fullImage: {
      width: width * 0.9,
      height: height * 0.7,
   },
});

export default AdminTopUpList;
