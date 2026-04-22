/**
 * FeatureAnnouncementModal — Production-Ready Announcement Modal
 * Beautiful, animated, theme-aware announcement overlay
 */

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Modal, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as ExpoWeb from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import { useAppTheme } from "@src/providers/ThemeProvider";
import { Fonts } from "@src/constants/Fonts";
import { fetchAnnouncement, announcementProps } from "@src/api/announcement";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const CARD_WIDTH = Math.min(SCREEN_W - 40, 380);
const DISMISSED_KEY = "@dismissed_announcement_id";

// ─── Component ─────────────────────────────────────────────────────────────

const FeatureAnnouncementModal: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const [announcement, setAnnouncement] = useState<announcementProps | null>(null);
  const [visible, setVisible] = useState(false);

  // Animated values
  const backdropOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.8);
  const cardTranslateY = useSharedValue(60);
  const iconScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);

  // Load announcement on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAnnouncement();
        if (data?.isActive) {
          const dismissedId = await AsyncStorage.getItem(DISMISSED_KEY);
          if (dismissedId !== data._id) {
            setAnnouncement(data);
            setVisible(true);
          }
        }
      } catch (e) {
        // Silently fail — announcements are non-critical
      }
    };
    load();
  }, []);

  // Entrance animation when visible changes
  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 250 });
      cardScale.value = withSpring(1, { damping: 14, stiffness: 180 });
      cardTranslateY.value = withSpring(0, { damping: 14, stiffness: 180 });
      iconScale.value = withDelay(100, withSpring(1, { damping: 12, stiffness: 200 }));
      contentOpacity.value = withDelay(150, withTiming(1, { duration: 300 }));
      buttonsTranslateY.value = withDelay(200, withSpring(0, { damping: 14, stiffness: 180 }));
    }
  }, [visible]);

  const dismiss = useCallback(() => {
    backdropOpacity.value = withTiming(0, { duration: 200 });
    cardScale.value = withTiming(0.9, { duration: 200 });
    cardTranslateY.value = withTiming(40, { duration: 200 });
    contentOpacity.value = withTiming(0, { duration: 150 });

    setTimeout(() => {
      setVisible(false);
    }, 220);
  }, []);

  const handleDismiss = useCallback(async () => {
    if (announcement) {
      await AsyncStorage.setItem(DISMISSED_KEY, announcement._id);
    }
    dismiss();
  }, [announcement, dismiss]);

  const handleLearnMore = useCallback(async () => {
    if (announcement?.link) {
      await ExpoWeb.openBrowserAsync(announcement.link, {
        toolbarColor: colors.primary.main,
      });
    }
  }, [announcement, colors]);

  // Swipe down to dismiss
  const panGesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onUpdate((e) => {
      if (e.translationY > 0) {
        cardTranslateY.value = e.translationY * 0.6;
        backdropOpacity.value = interpolate(e.translationY, [0, 300], [1, 0.3]);
      }
    })
    .onEnd((e) => {
      if (e.translationY > 80 || e.velocityY > 500) {
        runOnJS(handleDismiss)();
      } else {
        cardTranslateY.value = withSpring(0, { damping: 14, stiffness: 180 });
        backdropOpacity.value = withTiming(1, { duration: 200 });
      }
    });

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateY: cardTranslateY.value },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  if (!announcement || !visible) return null;

  const hasLink = !!announcement.link;

  return (
    <Modal transparent visible={visible} onRequestClose={handleDismiss} statusBarTranslucent>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        {/* Blur backdrop */}
        <View
          style={[
            styles.backdropFill,
            { backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)" },
          ]}
        />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardContainer, cardStyle]}>
            <View style={[styles.cardSurface, { width: CARD_WIDTH, backgroundColor: colors.background.card }]}>
            {/* Top gradient accent */}
            <LinearGradient
              colors={isDark ? ["#16A34A", "#15803D"] : ["#22C55E", "#16A34A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.topAccent}
            />

            {/* Close button */}
            <Pressable onPress={handleDismiss} style={styles.closeButton} hitSlop={12}>
              <Ionicons name="close" size={20} color={colors.text.secondary} />
            </Pressable>

            {/* Icon */}
            <Animated.View style={[styles.iconWrapper, iconStyle]}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.1)" },
                ]}
              >
                <Ionicons name="megaphone" size={32} color={colors.primary.main} />
              </View>
            </Animated.View>

            {/* Content */}
            <Animated.View style={[styles.content, contentStyle]}>
              <Text style={[styles.title, { color: colors.text.primary }]}>
                {announcement.title}
              </Text>
              <Text style={[styles.message, { color: colors.text.secondary }]}>
                {announcement.message}
              </Text>
            </Animated.View>

            {/* Actions */}
            <Animated.View style={[styles.actions, buttonsStyle]}>
              <Pressable
                onPress={handleDismiss}
                style={({ pressed }) => [
                  styles.btnPrimary,
                  { opacity: pressed ? 0.9 : 1 },
                ]}
              >
                <LinearGradient
                  colors={["#22C55E", "#16A34A"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnPrimaryGradient}
                >
                  <Text style={styles.btnPrimaryText}>J'ai compris</Text>
                </LinearGradient>
              </Pressable>

              {hasLink && (
                <Pressable
                  onPress={handleLearnMore}
                  style={({ pressed }) => [
                    styles.btnSecondary,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)",
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.btnSecondaryText, { color: colors.primary.main }]}>
                    En savoir plus
                  </Text>
                </Pressable>
              )}
            </Animated.View>

            {/* Drag handle indicator */}
            <View style={styles.dragHandle}>
              <View
                style={[
                  styles.dragHandleBar,
                  { backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" },
                ]}
              />
            </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </Modal>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdropFill: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    alignItems: "center",
  },
  cardSurface: {
    borderRadius: 20,
    position: "relative",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 4,
    borderRadius: 2,
    zIndex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    marginTop: 28,
    marginBottom: 16,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    lineHeight: 22,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 10,
  },
  btnPrimary: {
    borderRadius: 14,
    overflow: "hidden",
    height: 50,
  },
  btnPrimaryGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
  },
  btnSecondary: {
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSecondaryText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  dragHandle: {
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 4,
  },
  dragHandleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});

export default FeatureAnnouncementModal;
