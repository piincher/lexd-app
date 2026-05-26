import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated, {
   FadeInDown,
   useSharedValue,
   useAnimatedStyle,
   withRepeat,
   withTiming,
   interpolate,
} from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";

const Circle: React.FC<{ s: number; style?: Record<string, unknown> }> = ({ s, style }) => {
   const { colors } = useAppTheme();
   const p = useSharedValue(0);
   useEffect(() => {
      p.value = withRepeat(withTiming(1, { duration: 2500 }), -1, true);
   }, []);
   const a = useAnimatedStyle(() => ({
      transform: [{ scale: interpolate(p.value, [0, 1], [1, 1.3]) }],
      opacity: interpolate(p.value, [0, 1], [0.5, 0.15]),
   }));
   return (
      <Animated.View
         style={[
            {
               width: s,
               height: s,
               borderRadius: s / 2,
               overflow: "hidden",
               backgroundColor: colors.neutral.white + "0F",
            },
            a,
            style,
         ]}
      >
         <BlurView intensity={25} tint="light" style={StyleSheet.absoluteFill} />
      </Animated.View>
   );
};

export const GuestHero: React.FC = () => {
   const { colors, isDark } = useAppTheme();
   const styles = createStyles(colors);
   const gradientColors = Theme.gradients.primary;

   return (
      <Animated.View
         entering={FadeInDown.duration(800)}
         style={[styles.wrap, { marginBottom: -12 }]}
      >
         <View
            style={[
               styles.gradWrap,
               { borderBottomLeftRadius: 16, borderBottomRightRadius: 16, overflow: "hidden" },
            ]}
         >
            <LinearGradient
               colors={gradientColors}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={styles.grad}
            >
               <View style={styles.content}>
                  <View style={styles.badge}>
                     <FontAwesome6 name="eye" size={12} color={colors.text.inverse} />
                     <Text style={styles.badgeText}>Mode démo</Text>
                  </View>
                  <Text style={styles.title}>Découvrez ChinaLink Express</Text>
                  <Text style={styles.subtitle}>
                     Suivez vos marchandises de la Chine jusqu&apos;au Mali en temps réel.
                  </Text>
               </View>
               <Circle s={80} style={{ top: 10, right: -10 }} />
               <Circle s={56} style={{ bottom: 50, right: 50 }} />
               <Circle s={100} style={{ bottom: -20, left: -20 }} />
            </LinearGradient>
         </View>
         <View
            style={[
               styles.overlap,
               { backgroundColor: colors.background.paper, shadowColor: colors.neutral[900] },
            ]}
         />
      </Animated.View>
   );
};

const createStyles = (colors: any) =>
   StyleSheet.create({
      wrap: { width: "100%", position: "relative" },
      gradWrap: { overflow: "hidden" },
      grad: { minHeight: 220, paddingTop: 24, paddingBottom: 28 },
      content: { paddingHorizontal: 20 },
      badge: {
         alignSelf: "flex-start",
         flexDirection: "row",
         alignItems: "center",
         gap: 6,
         borderRadius: 999,
         paddingHorizontal: 12,
         paddingVertical: 6,
         backgroundColor: colors.text.primary + "59",
      },
      badgeText: {
         color: colors.text.inverse,
         fontFamily: Fonts.bold,
         fontSize: 12,
         letterSpacing: 0.3,
      },
      title: {
         color: colors.text.inverse,
         fontFamily: Fonts.bold,
         fontSize: 28,
         lineHeight: 34,
         marginTop: 16,
      },
      subtitle: {
         color: colors.text.inverse + "CC",
         fontFamily: Fonts.regular,
         fontSize: 15,
         lineHeight: 22,
         marginTop: 8,
         maxWidth: "92%",
      },
      overlap: {
         position: "absolute",
         bottom: -12,
         left: 24,
         right: 24,
         height: 28,
         borderRadius: 12,
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.08,
         shadowRadius: 12,
         elevation: 4,
      },
   });
