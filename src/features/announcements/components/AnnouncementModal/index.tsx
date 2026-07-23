import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Image,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@src/shared/ui/Button";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { Announcement } from "../../types";
import { createStyles, getTone } from "./styles";

interface AnnouncementModalProps {
  announcement: Announcement | null;
  visible: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
  onAction: () => void;
  isAcknowledging?: boolean;
}

interface Slide {
  imageUrl?: string | null;
  heading?: string;
  body?: string;
}

// Intro (title/message + hero image) followed by one slide per "part".
const buildSlides = (a: Announcement): Slide[] => {
  const blocks = Array.isArray(a.blocks) ? a.blocks : [];
  const intro: Slide = { imageUrl: a.imageUrl, heading: a.title, body: a.message };
  if (blocks.length === 0) return [intro];
  return [intro, ...blocks.map((b) => ({ imageUrl: b.imageUrl, heading: b.heading, body: b.body }))];
};

/**
 * In-tree animated overlay (NOT a native <Modal>) — avoids the Android modal
 * jank. When an announcement has multiple "parts" it renders a swipeable
 * carousel (Claude-style what's-new); otherwise a single card.
 */
export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  announcement,
  visible,
  onClose,
  onAcknowledge,
  onAction,
  isAcknowledging = false,
}) => {
  const { colors } = useAppTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(false);

  const lastAnnouncement = useRef(announcement);
  if (announcement) lastAnnouncement.current = announcement;
  const data = announcement ?? lastAnnouncement.current;

  const isOpen = visible && !!announcement;

  // Carousel state (hooks must run unconditionally, before any early return).
  const scrollRef = useRef<ScrollView>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.timing(opacity, {
      toValue: 0,
      duration: 140,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setRendered(false);
    });
  }, [isOpen, opacity]);

  // Reset to the first slide whenever a different announcement opens.
  useEffect(() => {
    setIndex(0);
    scrollRef.current?.scrollTo({ x: 0, animated: false });
  }, [data?._id]);

  const requiresAck = !!data?.requiresAcknowledgement;
  useEffect(() => {
    if (!rendered) return undefined;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (!requiresAck) onClose();
      return true;
    });
    return () => sub.remove();
  }, [rendered, requiresAck, onClose]);

  if (!rendered || !data) return null;

  const tone = getTone(data.type || "INFO");
  const styles = createStyles(colors, tone);
  const canClose = data.dismissible && !requiresAck;
  const primaryLabel = requiresAck ? "J'ai compris" : "Fermer";

  const slides = buildSlides(data);
  const isCarousel = slides.length > 1;
  const onLastSlide = index >= slides.length - 1;

  const goNext = () => {
    if (onLastSlide || slideWidth <= 0) return;
    const next = index + 1;
    scrollRef.current?.scrollTo({ x: next * slideWidth, animated: true });
    setIndex(next);
  };

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (slideWidth <= 0) return;
    setIndex(Math.round(event.nativeEvent.contentOffset.x / slideWidth));
  };

  const buttonLabel = isCarousel && !onLastSlide ? "Suivant" : primaryLabel;
  const handlePrimary = () => {
    if (isCarousel && !onLastSlide) {
      goNext();
      return;
    }
    if (requiresAck) onAcknowledge();
    else onClose();
  };

  const renderSlideBody = (slide: Slide, key: number) => (
    <ScrollView
      key={key}
      style={{ width: slideWidth || undefined }}
      contentContainerStyle={styles.slideContent}
      showsVerticalScrollIndicator={false}
    >
      {!!slide.imageUrl && (
        <Image source={{ uri: slide.imageUrl }} style={styles.slideImage} resizeMode="cover" />
      )}
      {!!slide.heading && <Text style={styles.title}>{slide.heading}</Text>}
      {!!slide.body && <Text style={styles.message}>{slide.body}</Text>}
    </ScrollView>
  );

  return (
    <Animated.View
      style={[styles.overlay, { opacity }]}
      pointerEvents="auto"
      accessibilityViewIsModal
    >
      <Pressable
        testID="announcement-overlay-backdrop"
        style={styles.backdrop}
        onPress={canClose ? onClose : undefined}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
      <View style={styles.card}>
        {canClose && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fermer"
            onPress={onClose}
            hitSlop={8}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={20} color={colors.text.secondary} />
          </Pressable>
        )}

        {isCarousel ? (
          <View
            style={styles.carousel}
            onLayout={(event) => setSlideWidth(event.nativeEvent.layout.width)}
          >
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumEnd}
            >
              {slides.map(renderSlideBody)}
            </ScrollView>
          </View>
        ) : (
          <>
            {!!data.imageUrl && (
              <Image source={{ uri: data.imageUrl }} style={styles.slideImage} resizeMode="cover" />
            )}
            {!data.imageUrl && (
              <View style={styles.iconCircle}>
                <Ionicons name={tone.icon} size={30} color={tone.color} />
              </View>
            )}
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.message}>{data.message}</Text>
          </>
        )}

        {isCarousel && (
          <View style={styles.dots}>
            {slides.map((_, dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  styles.dot,
                  { backgroundColor: dotIndex === index ? tone.color : colors.border },
                ]}
              />
            ))}
          </View>
        )}

        {!!data.ctaLabel && onLastSlide && (
          <Button title={data.ctaLabel} variant="outline" onPress={onAction} fullWidth />
        )}
        <Button
          title={buttonLabel}
          onPress={handlePrimary}
          loading={isAcknowledging && onLastSlide}
          fullWidth
        />
      </View>
    </Animated.View>
  );
};
