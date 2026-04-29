/**
 * tabBarStore — Global tab bar visibility state
 *
 * Screens can hide/show the tab bar based on scroll direction.
 * The tab bar reads this state and animates its position.
 */

import { create } from 'zustand';

interface TabBarState {
  isVisible: boolean;
  scrollY: number;
  setVisible: (visible: boolean) => void;
  reportScroll: (y: number) => void;
}

const SCROLL_THRESHOLD = 10;
const MIN_SCROLL_BEFORE_HIDE = 50;

export const useTabBarStore = create<TabBarState>((set, get) => ({
  isVisible: true,
  scrollY: 0,

  setVisible: (visible) => {
    if (get().isVisible !== visible) {
      set({ isVisible: visible, scrollY: visible ? 0 : get().scrollY });
    }
  },

  reportScroll: (y) => {
    const state = get();
    const delta = y - state.scrollY;

    if (delta > SCROLL_THRESHOLD && y > MIN_SCROLL_BEFORE_HIDE) {
      if (state.isVisible) {
        set({ isVisible: false, scrollY: y });
      } else {
        set({ scrollY: y });
      }
    } else if (delta < -SCROLL_THRESHOLD) {
      if (!state.isVisible) {
        set({ isVisible: true, scrollY: y });
      } else {
        set({ scrollY: y });
      }
    } else {
      set({ scrollY: y });
    }
  },
}));
