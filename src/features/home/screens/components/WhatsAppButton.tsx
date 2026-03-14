import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface WhatsAppButtonProps {
   style: any;
   onPress: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
   style,
   onPress,
}) => {
   return (
      <Animated.View style={[styles.whatsappButton, style]}>
         <Pressable
            onPress={onPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
         >
            <LinearGradient
               colors={["#25D366", "#128C7E"]}
               style={styles.whatsappContainer}
            >
               <FontAwesome6 name="whatsapp" size={28} color="white" />
            </LinearGradient>
         </Pressable>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   whatsappButton: {
      position: "absolute",
      bottom: 30,
      left: 20,
      zIndex: 100,
   },
   whatsappContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
   },
});
