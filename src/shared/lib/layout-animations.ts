/**
 * Layout Animations — Reanimated presets for smooth list and section transitions
 *
 * Use these on list items, cards, and sections to provide smooth entrance
 * and layout-change animations without manual keyframe setup.
 *
 * @example
 * <Animated.View entering={FadeInUp} layout={listItemSpring}>
 *   <OrderCard />
 * </Animated.View>
 */

import {
  FadeIn,
  FadeInUp,
  FadeInDown,
  Layout,
  type Easing,
} from 'react-native-reanimated';

// ============================================
// Layout transitions (for reordering/resizing)
// ============================================

/**
 * Spring-based layout transition for list items.
 * Smoothly animates position changes when list data reorders.
 */
export const listItemSpring = Layout.springify()
  .damping(15)
  .stiffness(120)
  .mass(0.8);

/**
 * Quick layout transition for smaller items like chips or badges.
 */
export const quickSpring = Layout.springify()
  .damping(20)
  .stiffness(200)
  .mass(0.5);

// ============================================
// Entrance animations
// ============================================

/**
 * Standard fade-in with upward translation.
 * Perfect for list cards and section entrances.
 */
export const fadeInUp = FadeInUp.duration(400).springify();

/**
 * Standard fade-in with downward translation.
 * Use for dropdowns or expanding content.
 */
export const fadeInDown = FadeInDown.duration(400).springify();

/**
 * Simple fade-in without translation.
 * Use for subtle opacity-only reveals.
 */
export const fadeIn = FadeIn.duration(300);

/**
 * Staggered entrance helper.
 * Returns a FadeInUp with delay based on index.
 */
export const staggeredFadeIn = (index: number, baseDelay = 50) =>
  FadeInUp.duration(400)
    .delay(index * baseDelay)
    .springify();

// ============================================
// Easing presets
// ============================================

export const easing = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
} as const;
