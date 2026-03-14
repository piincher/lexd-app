import { useShippingMode } from "@src/store/shippingMode";
import { useAppTheme } from "@src/providers";
import { useRef, useCallback } from "react";
import { Linking, ScrollView } from "react-native";
import {
   Extrapolate,
   interpolate,
   useAnimatedRef,
   useAnimatedScrollHandler,
   useAnimatedStyle,
   useSharedValue,
   withSpring,
   withTiming,
} from "react-native-reanimated";

export const useHomeScreen = () => {
   const scrollY = useSharedValue(0);
   const scrollRef = useAnimatedRef<ScrollView>();
   const headerHeight = useSharedValue(100);
   const isScrolled = useSharedValue(false);
   const { colors } = useAppTheme();
   const setType = useShippingMode((state) => state.setType);

   const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
         scrollY.value = event.contentOffset.y;
         headerHeight.value = interpolate(
            event.contentOffset.y,
            [0, 100],
            [100, 70],
            Extrapolate.CLAMP
         );
         isScrolled.value = event.contentOffset.y > 800;
      },
   });

   const headerStyle = useAnimatedStyle(() => ({
      height: headerHeight.value,
      paddingVertical: interpolate(headerHeight.value, [70, 100], [8, 16]),
   }));

   const backButtonStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isScrolled.value ? 1 : 0),
      transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
   }));

   const whatsappStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(isScrolled.value ? 1 : 0.8) }],
   }));

   const scrollToTop = useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
   }, [scrollRef]);

   const openWhatsApp = useCallback(() => {
      Linking.openURL(
         "whatsapp://send?phone=+8618851725957&text=Bonjour%20ChinaLink,%20J%20ai%20une%20demande%20d'expedition%20a%20faire%20:)"
      );
   }, []);

   const openFAQ = useCallback(() => {
      return { navigateTo: "faq" as const };
   }, []);

   const openAboutUs = useCallback(() => {
      return { navigateTo: "AboutUs" as const };
   }, []);

   return {
      scrollY,
      scrollRef,
      headerHeight,
      isScrolled,
      colors,
      setType,
      scrollHandler,
      headerStyle,
      backButtonStyle,
      whatsappStyle,
      scrollToTop,
      openWhatsApp,
      openFAQ,
      openAboutUs,
   };
};
