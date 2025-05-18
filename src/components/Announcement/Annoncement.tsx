// components/FadingAnnouncement.tsx
import { COLORS } from "@src/constants/Colors";
import React, { useState, useEffect, useRef } from "react";
import * as ExpoWeb from "expo-web-browser";
import {
   View,
   Text,
   Animated,
   StyleSheet,
   TouchableOpacity,
   Linking,
   Easing,
   Dimensions,
} from "react-native";

type Announcement = {
   _id: string;
   title: string;
   message: string;
   link?: string;
   isActive: boolean;
   publishDate: string;
   expirationDate: string;
   __v: number;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FadingAnnouncement: React.FC = () => {
   const [announcement, setAnnouncement] = useState<Announcement | null>(null);
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
   const scaleAnim = useRef(new Animated.Value(0.8)).current;

   useEffect(() => {
      const fetchAnnouncement = async () => {
         try {
            const response = await fetch(
               "https://api.myempirebymyma.com/api/v1/announcement/active"
            );
            const data: Announcement = await response.json();

            if (data && data.isActive) {
               setAnnouncement(data);
            }
         } catch (error) {
            console.error("Error fetching announcement:", error);
         }
      };

      fetchAnnouncement();
   }, []);

   useEffect(() => {
      if (announcement) {
         const animation = Animated.loop(
            Animated.sequence([
               Animated.parallel([
                  Animated.timing(fadeAnim, {
                     toValue: 1,
                     duration: 800,
                     easing: Easing.out(Easing.quad),
                     useNativeDriver: true,
                  }),
                  Animated.timing(slideAnim, {
                     toValue: 0,
                     duration: 1000,
                     easing: Easing.out(Easing.back(1)),
                     useNativeDriver: true,
                  }),
                  Animated.spring(scaleAnim, {
                     toValue: 1,
                     friction: 4,
                     useNativeDriver: true,
                  }),
               ]),
               Animated.delay(3000),
               Animated.parallel([
                  Animated.timing(fadeAnim, {
                     toValue: 0,
                     duration: 800,
                     easing: Easing.in(Easing.quad),
                     useNativeDriver: true,
                  }),
                  Animated.timing(slideAnim, {
                     toValue: -SCREEN_WIDTH,
                     duration: 1000,
                     easing: Easing.in(Easing.quad),
                     useNativeDriver: true,
                  }),
                  Animated.timing(scaleAnim, {
                     toValue: 0.9,
                     duration: 800,
                     useNativeDriver: true,
                  }),
               ]),
               Animated.delay(500),
            ])
         ).start();

         //  return () => animation.stop();
      }
   }, [announcement]);

   const handlePress = () => {
      if (announcement?.link) {
         ExpoWeb.openBrowserAsync(announcement.link, {
            toolbarColor: COLORS.blue,
         });
         // Add press feedback animation
         Animated.sequence([
            Animated.spring(scaleAnim, {
               toValue: 0.95,
               useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
               toValue: 1,
               useNativeDriver: true,
            }),
         ]).start();
      }
   };

   if (!announcement) return null;

   return (
      <Animated.View
         style={[
            styles.container,
            {
               opacity: fadeAnim,
               transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
            },
         ]}
      >
         <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
            <View style={styles.content}>
               <Text style={styles.title}>{announcement.title}</Text>
               <Text style={styles.message}>{announcement.message}</Text>
               {announcement.link && (
                  <View style={styles.linkIndicator}>
                     <Text style={styles.linkText}>Learn More →</Text>
                  </View>
               )}
            </View>
         </TouchableOpacity>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: "absolute",
      top: 100,
      left: 20,
      right: 20,
      width: SCREEN_WIDTH - 40,
      borderRadius: 12,
      shadowColor: COLORS.DarkGrey,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 3,
      backgroundColor: COLORS.lightCrimson,
      borderWidth: 1,
      borderColor: COLORS.Crimson + "20",
   },
   content: {
      paddingVertical: 16,
      paddingHorizontal: 20,
   },
   title: {
      fontSize: 16,
      fontWeight: "600",
      color: COLORS.Crimson,
      marginBottom: 8,
   },
   message: {
      fontSize: 14,
      color: COLORS.DarkGrey,
      lineHeight: 20,
   },
   linkIndicator: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
   },
   linkText: {
      color: COLORS.terms2,
      fontSize: 14,
      fontWeight: "500",
   },
});

export default FadingAnnouncement;
