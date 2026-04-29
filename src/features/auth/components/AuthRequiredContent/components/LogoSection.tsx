import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, {
   FadeInDown,
   interpolate,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withTiming,
} from "react-native-reanimated";
import { IMAGES } from "@src/constants/Images";
import { useAppTheme } from '@src/providers/ThemeProvider';

export const LogoSection: React.FC = () => {
   const { colors } = useAppTheme();
   const pulseValue = useSharedValue(0);

   React.useEffect(() => {
      pulseValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
   }, []);

   const pulseStyle = useAnimatedStyle(() => ({
      transform: [
         {
            scale: interpolate(pulseValue.value, [0, 1], [1, 1.05]),
         },
      ],
      opacity: interpolate(pulseValue.value, [0, 1], [0.8, 1]),
   }));

   return (
      <Animated.View entering={FadeInDown.duration(600).springify()}>
         <Animated.View style={[styles.logoContainer, pulseStyle]}>
            <View
               style={[
                  styles.logoWrapper,
                  {
                     backgroundColor: colors.background.card,
                     shadowColor: colors.primary.main,
                  },
               ]}
            >
               <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />
            </View>
         </Animated.View>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   logoContainer: {
      marginBottom: 32,
   },
   logoWrapper: {
      width: 140,
      height: 140,
      borderRadius: 70,
      justifyContent: "center",
      alignItems: "center",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
   },
   logo: {
      width: 100,
      height: 100,
   },
});

export default LogoSection;
