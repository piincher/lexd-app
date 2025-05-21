// AdminTopUpList.tsx
import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Image,
   TouchableOpacity,
   ActivityIndicator,
   RefreshControl,
   TouchableWithoutFeedback,
   Modal,
   Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { MotiView, MotiText } from "moti";
import Animated, {
   FadeInRight,
   FadeOutRight,
   Layout,
   SlideInRight,
   SlideOutLeft,
} from "react-native-reanimated";
import { SegmentedButtons, IconButton } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useAdminGetTopUp, useUpdateTopupStatus } from "./hooks/useTopUp";
import { GestureHandlerRootView, PinchGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
const STATUSES = ["pending", "approved", "rejected"];
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type TopUpRequest = {
   _id: string;
   user: {
      firstName: string;
      phoneNumber: string;
   };
   amount: number;
   createdAt: string;
   status: "pending" | "approved" | "rejected";
   proofImage: string;
};

const AdminTopUpList = () => {
   const [selectedStatus, setSelectedStatus] = useState("pending");

   const [loading, setLoading] = useState(false);

   const [hasMore, setHasMore] = useState(true);
   const { data } = useAdminGetTopUp();
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [scale, setScale] = useState(1);
   const [baseScale, setBaseScale] = useState(1);
   const [visible, setVisible] = useState(false);
   const { mutate } = useUpdateTopupStatus();

   // Add gesture handler functions
   const onPinchGestureEvent = (event) => {
      setScale(event.nativeEvent.scale * baseScale);
   };

   const onPinchHandlerStateChange = (event) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
         setBaseScale(scale);
      }
   };
   const handleStatusChange = async (id: string, newStatus: "approved" | "rejected") => {
      console.log("Status changed to:", newStatus);
      console.log("ID:", id);
      mutate({ _id: id, status: newStatus });
   };
   const renderItem = ({ item, index }: { item: TopUpRequest; index: number }) => (
      <Animated.View
         key={item._id}
         entering={FadeInRight.delay(index * 50)}
         exiting={FadeOutRight}
         layout={Layout.springify()}
         style={styles.itemContainer}
      >
         <View style={styles.itemContent}>
            <TouchableOpacity
               onPress={() => {
                  setSelectedImage(item.proofImage);
                  setVisible(true);
               }}
            >
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

         <Modal
            visible={!!selectedImage}
            transparent={false}
            onRequestClose={() => {
               setSelectedImage(null);
               setScale(1);
               setBaseScale(1);
            }}
         >
            <GestureHandlerRootView style={styles.modalContainer}>
               <PinchGestureHandler
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}
               >
                  <View style={styles.modalContent}>
                     <TouchableWithoutFeedback
                        onPress={() => {
                           setVisible(false);
                           setSelectedImage(null);
                        }}
                     >
                        <View style={styles.closeButton}>
                           <MaterialIcons name="close" size={28} color="white" />
                        </View>
                     </TouchableWithoutFeedback>

                     <Image
                        style={[styles.fullImage, { transform: [{ scale }] }]}
                        source={{ uri: selectedImage || "" }}
                        resizeMode={scale > 1 ? "contain" : "cover"}
                     />
                  </View>
               </PinchGestureHandler>
            </GestureHandlerRootView>
         </Modal>
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
                     backgroundColor: selectedStatus === status ? COLORS.accent : "transparent",
                     borderColor: COLORS.Crimson,
                  },
                  labelStyle: {
                     color: selectedStatus === status ? COLORS.white : COLORS.accent,
                     fontFamily: Fonts.bold,
                  },
               }))}
               style={styles.segmentedControl}
            />

            <FlatList
               data={(data ?? []).filter((item) => item.status === selectedStatus)}
               keyExtractor={(item) => item._id}
               renderItem={renderItem}
               contentContainerStyle={styles.listContent}
               //   refreshControl={
               //     <RefreshControl
               //       refreshing={refreshing}
               //       onRefresh={handleRefresh}
               //       tintColor={COLORS.accent}
               //     />
               //   }
               ListFooterComponent={() => (
                  <View style={styles.footer}>
                     {loading && <ActivityIndicator size="large" color={COLORS.accent} />}
                     {!hasMore && <Text style={styles.noMoreText}>No more requests</Text>}
                  </View>
               )}
               //   onEndReached={() => hasMore && loadRequests()}
               //   onEndReachedThreshold={0.5}
            />
         </BlurView>
      </View>
   );
};

const { width, height } = Dimensions.get("window");

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

   modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.95)",
      justifyContent: "center",
      alignItems: "center",
   },
   modalContent: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 200,
      right: -200,
   },
   fullImage: {
      width: width,
      height: height,
   },
   closeButton: {
      position: "absolute",
      top: -200,
      right: 20,
      zIndex: 100,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 20,
      padding: 8,
   },
});

export default AdminTopUpList;
