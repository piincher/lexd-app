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
import { MotiView, MotiText } from "moti";
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
import { useAdminGetTopUp, useUpdateTopupStatus } from "./hooks/useTopUp";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const STATUSES = ["pending", "approved", "rejected"];

const { width, height } = Dimensions.get("window");

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
      mutate({ _id, status: newStatus });
   };

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
               <Image
                  source={{ uri: item.proofImage }}
                  style={styles.proofImage}
                  resizeMode="cover"
               />
            </TouchableOpacity>
            <View style={styles.details}>
               <Text style={styles.userName}>{item.user.firstName}</Text>
               <Text style={styles.userPhone}>{item.user.phoneNumber}</Text>
               <MotiView
                  from={{ opacity: 0, translateY: 5 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  style={styles.amountContainer}
               >
                  <Text style={styles.amount}>{item.amount.toLocaleString()} FCFA</Text>
                  <Text style={styles.date}>
                     {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                     })}
                  </Text>
               </MotiView>
            </View>
         </View>
         {item.status === "pending" ? (
            <View style={styles.actions}>
               <IconButton
                  icon="check-circle"
                  iconColor={COLORS.success}
                  size={28}
                  onPress={() => handleStatusChange(item._id, "approved")}
               />
               <IconButton
                  icon="close-circle"
                  iconColor={COLORS.redShade}
                  size={28}
                  onPress={() => handleStatusChange(item._id, "rejected")}
               />
            </View>
         ) : (
            <MotiText
               from={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               style={[
                  styles.statusBadge,
                  item.status === "approved" ? styles.approvedBadge : styles.rejectedBadge,
               ]}
            >
               {item.status}
            </MotiText>
         )}
      </Animated.View>
   );

   return (
      <View style={styles.container}>
         <BlurView intensity={25} style={styles.blurContainer}>
            <Text style={styles.title}>Top-Up Requests</Text>
            <SegmentedButtons
               value={selectedStatus}
               onValueChange={setSelectedStatus}
               buttons={STATUSES.map((status) => ({
                  value: status,
                  label: status.toUpperCase(),
                  style: {
                     backgroundColor: selectedStatus === status ? COLORS.blue : "transparent",
                     borderColor: COLORS.Crimson,
                  },
                  labelStyle: {
                     color: selectedStatus === status ? COLORS.white : COLORS.lightGray,
                     fontFamily: Fonts.bold,
                  },
               }))}
               style={styles.segmentedControl}
            />
            <FlatList
               data={(data ?? []).filter((item) => item.status === selectedStatus)}
               keyExtractor={(item) => item._id!}
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
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#1a237e",
   },
   blurContainer: {
      flex: 1,
      padding: 16,
   },
   title: {
      fontSize: 32,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginVertical: 24,
      textAlign: "center",
   },
   segmentedControl: {
      marginBottom: 24,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: 4,
   },
   listContent: {
      paddingBottom: 80,
   },
   itemContainer: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   itemContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
   },
   proofImage: {
      width: 60,
      height: 60,
      borderRadius: 12,
      marginRight: 16,
   },
   details: {
      flex: 1,
   },
   userName: {
      fontFamily: Fonts.black,
      color: COLORS.white,
      fontSize: 16,
      marginBottom: 4,
   },
   userPhone: {
      fontFamily: Fonts.meduim,
      color: "rgba(255,255,255,0.7)",
      fontSize: 14,
      marginBottom: 8,
   },
   amountContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   amount: {
      fontFamily: Fonts.bold,
      color: COLORS.success,
      fontSize: 18,
   },
   date: {
      fontFamily: Fonts.meduim,
      color: "rgba(255,255,255,0.5)",
      fontSize: 12,
   },
   actions: {
      flexDirection: "row",
      marginLeft: 12,
   },
   statusBadge: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 8,
      overflow: "hidden",
   },
   approvedBadge: {
      backgroundColor: "rgba(76,175,80,0.2)",
      color: COLORS.success,
   },
   rejectedBadge: {
      backgroundColor: "rgba(244,67,54,0.2)",
      color: COLORS.redShade,
   },
   footer: {
      padding: 20,
      alignItems: "center",
   },
   noMoreText: {
      color: "rgba(255,255,255,0.5)",
      fontFamily: Fonts.meduim,
   },
   overlayContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.95)",
      justifyContent: "center",
      alignItems: "center",
   },
   modalContent: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
   },
   fullImage: {
      width,
      height,
   },
   closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 10,
      backgroundColor: "rgba(255,255,255,0.3)",
      borderRadius: 20,
      padding: 8,
   },
});

export default AdminTopUpList;
