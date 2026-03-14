import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface BackToTopButtonProps {
   style: any;
   onPress: () => void;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
   style,
   onPress,
}) => {
   return (
      <Animated.View style={[styles.backToTop, style]}>
         <Pressable
            onPress={onPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
         >
            <LinearGradient
               colors={["#4A90E2", "#1ED7B5"]}
               style={styles.backToTopButton}
            >
               <AntDesign name="arrow-up" size={24} color="white" />
            </LinearGradient>
         </Pressable>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   backToTop: {
      position: "absolute",
      bottom: 30,
      right: 20,
      zIndex: 100,
   },
   backToTopButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
   },
});
