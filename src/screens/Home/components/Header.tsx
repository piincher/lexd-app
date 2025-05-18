import Animated, {
   useAnimatedStyle,
   interpolate,
   useSharedValue,
   withSpring,
} from "react-native-reanimated";
import { Pressable, View, Image, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "@src/constants/Colors";
import { IMAGES } from "@src/constants/Images";
import { useNavigation } from "@react-navigation/native";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Header = () => {
   const headerHeight = useSharedValue(100);
   const buttonOneScale = useSharedValue(1);
   const buttonTwoScale = useSharedValue(1);

   const navigation = useNavigation();
   const handlePressBlockOne = () => {
      navigation.navigate("faq");
   };
   const handlePressBlockTwo = () => {
      navigation.navigate("AboutUs");
   };

   const headerStyle = useAnimatedStyle(() => ({
      height: withSpring(headerHeight.value),
      paddingVertical: interpolate(headerHeight.value, [70, 100], [8, 16]),
      borderBottomWidth: interpolate(headerHeight.value, [70, 100], [1, 0]),
      borderBottomColor: "rgba(0,0,0,0.1)",
   }));

   const logoStyle = useAnimatedStyle(() => ({
      width: interpolate(headerHeight.value, [70, 80], [90, 150]),
      height: interpolate(headerHeight.value, [70, 100], [30, 45]),
   }));

   const buttonOneAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(buttonOneScale.value) }],
      opacity: withSpring(buttonOneScale.value < 1 ? 0.6 : 1),
   }));

   const buttonTwoAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(buttonTwoScale.value) }],
      opacity: withSpring(buttonTwoScale.value < 1 ? 0.6 : 1),
   }));

   return (
      <AnimatedBlurView intensity={50} style={[styles.headerContainer, headerStyle]} tint="light">
         <Animated.Image
            source={IMAGES.flat_logo}
            style={[styles.logo, logoStyle]}
            resizeMode="contain"
         />

         <View style={styles.headerActions}>
            <Pressable
               onPress={handlePressBlockOne}
               onPressIn={() => (buttonOneScale.value = 0.9)}
               onPressOut={() => (buttonOneScale.value = 1)}
               accessibilityRole="button"
               accessibilityLabel="Help"
               hitSlop={12}
            >
               <Animated.View
                  style={[
                     styles.iconContainer,
                     buttonOneAnimatedStyle,
                     { backgroundColor: COLORS.blue + "15" },
                  ]}
               >
                  <FontAwesome6
                     name="question"
                     size={24}
                     color={COLORS.blue}
                     style={styles.iconShadow}
                  />
               </Animated.View>
            </Pressable>

            <Pressable
               onPress={handlePressBlockTwo}
               onPressIn={() => (buttonTwoScale.value = 0.9)}
               onPressOut={() => (buttonTwoScale.value = 1)}
               accessibilityRole="button"
               accessibilityLabel="Information"
               hitSlop={12}
            >
               <Animated.View
                  style={[
                     styles.iconContainer,
                     buttonTwoAnimatedStyle,
                     { backgroundColor: COLORS.blue + "15" },
                  ]}
               >
                  <FontAwesome6
                     name="info"
                     size={24}
                     color={COLORS.blue}
                     style={styles.iconShadow}
                  />
               </Animated.View>
            </Pressable>
         </View>
      </AnimatedBlurView>
   );
};

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      overflow: "hidden",
      backgroundColor: Platform.select({
         ios: "transparent",
         android: "rgba(255,255,255,0.95)",
      }),

      width: "100%",
   },
   logo: {
      aspectRatio: 4,
   },
   headerActions: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
   },
   iconContainer: {
      padding: 10,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: COLORS.blue,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
   },
   iconShadow: {
      textShadowColor: "rgba(0,0,0,0.1)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
   },
});
