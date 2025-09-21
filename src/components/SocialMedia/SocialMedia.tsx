// SocialMedia.tsx
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { MotiView } from "moti";
import Animated, {
   Easing,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withSequence,
   withTiming,
} from "react-native-reanimated";

const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
const AnimatedFontAwesome = Animated.createAnimatedComponent(FontAwesome5);

interface Props {
   _handlePressButtonAsync?: (url: string) => void;
   color?: string;
}

const SocialMedia: FC<Props> = ({ color }: Props) => {
   const _handlePressButtonAsync = async (url: string) => {
      await WebBrowser.openBrowserAsync(url);
   };

   const createBounceAnimation = () => {
      const scale = useSharedValue(1);

      const animatedStyle = useAnimatedStyle(() => ({
         transform: [{ scale: scale.value }],
      }));

      const animate = () => {
         scale.value = withSequence(
            withTiming(1.2, { duration: 150, easing: Easing.ease }),
            withTiming(1, { duration: 150, easing: Easing.ease })
         );
      };

      return { animatedStyle, animate };
   };

   const SocialIcon = ({
      IconComponent,
      icon,
      url,
   }: {
      IconComponent: typeof AnimatedIcon | typeof AnimatedFontAwesome;
      icon: string;
      url: string;
   }) => {
      const { animatedStyle, animate } = createBounceAnimation();

      return (
         <MotiView
            from={{ scale: 0, rotate: "-180deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            transition={{ type: "spring" }}
         >
            <IconComponent
               name={icon}
               size={32}
               color={color}
               style={[styles.iconStyle, animatedStyle]}
               onPressIn={() => {
                  animate();
                  _handlePressButtonAsync(url);
               }}
            />
         </MotiView>
      );
   };

   return (
      <View style={styles.container}>
         <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", delay: 200 }}
            style={styles.iconContainer}
         >
            <SocialIcon
               IconComponent={AnimatedIcon}
               icon="instagram"
               url="https://www.instagram.com/chinalinkexpress"
            />
            <SocialIcon
               IconComponent={AnimatedFontAwesome}
               icon="facebook-f"
               url="https://www.facebook.com/profile.php?id=61556519083512"
            />
            <SocialIcon
               IconComponent={AnimatedFontAwesome}
               icon="whatsapp"
               url="https://wa.me/8618851725957"
            />
            <SocialIcon
               IconComponent={AnimatedFontAwesome}
               icon="tiktok"
               url="https://www.tiktok.com/@chinalink.express4?_t=8mcP9s8uM7y&_r=1"
            />
         </MotiView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      zIndex: 2,
      top: -25,
   },
   iconContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 30,
      paddingVertical: 20,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 30,
      marginHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
   },
   iconStyle: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
   },
});

export default SocialMedia;
