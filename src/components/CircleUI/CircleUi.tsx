// CircleUI.tsx
import { COLORS } from "@src/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
   Easing,
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withSpring,
   withTiming,
} from "react-native-reanimated";

interface Props {
   size: number;
   position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const CircleUI: React.FC<Props> = ({ size, position }) => {
   const rotation = useSharedValue(0);
   const scale = useSharedValue(1);

   const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
   }));

   React.useEffect(() => {
      rotation.value = withRepeat(withTiming(360, { duration: 15000, easing: Easing.linear }), -1);
      scale.value = withRepeat(withSpring(1.2, { damping: 2 }), -1, true);
   }, []);

   let viewPosition = {};
   switch (position) {
      case "top-left":
         viewPosition = { top: -size / 2, left: -size / 2 };
         break;
      case "top-right":
         viewPosition = { top: -size / 2, right: -size / 2 };
         break;
      case "bottom-right":
         viewPosition = { bottom: -size / 2, right: -size / 2 };
         break;
      case "bottom-left":
         viewPosition = { bottom: -size / 2, left: -size / 2 };
         break;
   }

   return (
      <Animated.View
         style={[
            styles.circleContainer,
            viewPosition,
            animatedStyle,
            { width: size, height: size },
         ]}
      >
         <Animated.View
            style={[styles.outerCircle, { width: size, height: size, borderRadius: size / 2 }]}
         />
         <Animated.View
            style={[
               styles.innerCircle,
               {
                  width: size / 1.5,
                  height: size / 1.5,
                  borderRadius: size / 3,
                  transform: [{ translateX: -size / 3 }, { translateY: -size / 3 }],
               },
            ]}
         />
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   circleContainer: {
      position: "absolute",
   },
   outerCircle: {
      backgroundColor: COLORS.blue,
      opacity: 0.1,
      position: "absolute",
   },
   innerCircle: {
      backgroundColor: COLORS.blue,
      opacity: 0.05,
      position: "absolute",
   },
});
export default CircleUI;
