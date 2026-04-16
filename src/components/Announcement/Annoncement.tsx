// components/FeatureAnnouncementModal.tsx
import { COLORS } from "@src/constants/Colors";
import React, { useState, useEffect, useCallback } from "react";
import * as ExpoWeb from "expo-web-browser";
import {
   View,
   Text,
   Modal,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
   ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAnnouncement, announcementProps } from "@src/api/announcement";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DISMISSED_KEY = "@dismissed_announcement_id";

const FeatureAnnouncementModal: React.FC = () => {
   const [announcement, setAnnouncement] = useState<announcementProps | null>(null);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const loadAnnouncement = async () => {
         try {
            const data = await fetchAnnouncement();
            if (data && data.isActive) {
               const dismissedId = await AsyncStorage.getItem(DISMISSED_KEY);
               if (dismissedId !== data._id) {
                  setAnnouncement(data);
                  setVisible(true);
               }
            }
         } catch (error) {
            console.log("Announcement fetch failed:", error);
         }
      };

      loadAnnouncement();
   }, []);

   const handleDismiss = useCallback(async () => {
      setVisible(false);
      if (announcement) {
         await AsyncStorage.setItem(DISMISSED_KEY, announcement._id);
      }
   }, [announcement]);

   const handleLearnMore = useCallback(async () => {
      if (announcement?.link) {
         await ExpoWeb.openBrowserAsync(announcement.link, {
            toolbarColor: COLORS.blue,
         });
      }
   }, [announcement]);

   if (!announcement) return null;

   return (
      <Modal
         animationType="fade"
         transparent
         visible={visible}
         onRequestClose={handleDismiss}
      >
         <View style={styles.overlay}>
            <View style={styles.card}>
               <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
               >
                  <Text style={styles.title}>{announcement.title}</Text>
                  <Text style={styles.message}>{announcement.message}</Text>
               </ScrollView>

               <View style={styles.actions}>
                  {announcement.link && (
                     <TouchableOpacity
                        onPress={handleLearnMore}
                        style={[styles.button, styles.secondaryButton]}
                        activeOpacity={0.8}
                     >
                        <Text style={styles.secondaryButtonText}>En savoir plus</Text>
                     </TouchableOpacity>
                  )}
                  <TouchableOpacity
                     onPress={handleDismiss}
                     style={[styles.button, styles.primaryButton]}
                     activeOpacity={0.8}
                  >
                     <Text style={styles.primaryButtonText}>J'ai compris</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
   },
   card: {
      width: SCREEN_WIDTH - 48,
      maxHeight: "70%",
      backgroundColor: COLORS.white,
      borderRadius: 16,
      paddingTop: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
   },
   scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 8,
   },
   title: {
      fontSize: 20,
      fontWeight: "700",
      color: COLORS.black,
      marginBottom: 12,
      textAlign: "center",
   },
   message: {
      fontSize: 15,
      color: COLORS.DarkGrey,
      lineHeight: 22,
      textAlign: "center",
   },
   actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
      padding: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#E5E7EB",
   },
   button: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
   },
   primaryButton: {
      backgroundColor: COLORS.blue,
   },
   primaryButtonText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: "600",
   },
   secondaryButton: {
      backgroundColor: "#F3F4F6",
   },
   secondaryButtonText: {
      color: COLORS.DarkGrey,
      fontSize: 14,
      fontWeight: "600",
   },
});

export default FeatureAnnouncementModal;
