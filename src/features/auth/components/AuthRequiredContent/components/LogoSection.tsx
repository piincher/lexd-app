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
import { HAIRLINE } from '@src/shared/ui/designLanguage';

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
                     borderColor: colors.border,
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
      // Waybill: border-first, no drop shadow on the brand mark.
      borderWidth: HAIRLINE,
   },
   logo: {
      width: 100,
      height: 100,
   },
});

export default LogoSection;
