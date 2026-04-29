/**
 * ScrollDirectionProvider — Tracks scroll direction for tab bar visibility
 *
 * Screens use the `useScrollDirection` hook to report scroll position.
 * The tab bar reads the direction and animates its visibility.
 *
 * @example
 * // In a screen with ScrollView:
 * const { onScroll } = useScrollDirection();
 * <ScrollView onScroll={onScroll} scrollEventThrottle={16} />
 */

import React, { createContext, useContext, useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface ScrollDirectionState {
  isVisible: boolean;
  lastScrollY: number;
}

interface ScrollDirectionContextType extends ScrollDirectionState {
  reportScroll: (y: number) => void;
}

const ScrollDirectionContext = createContext<ScrollDirectionContextType>({
  isVisible: true,
  lastScrollY: 0,
  reportScroll: () => {},
});

export const ScrollDirectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const stateRef = useRef<ScrollDirectionState>({
    isVisible: true,
    lastScrollY: 0,
  });

  const reportScroll = useCallback((y: number) => {
    const state = stateRef.current;
    const delta = y - state.lastScrollY;
    const threshold = 10;

    if (delta > threshold && y > 50) {
      // Scrolling down — hide tab bar
      if (state.isVisible) {
        state.isVisible = false;
      }
    } else if (delta < -threshold) {
      // Scrolling up — show tab bar
      if (!state.isVisible) {
        state.isVisible = true;
      }
    }

    state.lastScrollY = y;
  }, []);

  return (
    <ScrollDirectionContext.Provider
      value={{
        isVisible: stateRef.current.isVisible,
        lastScrollY: stateRef.current.lastScrollY,
        reportScroll,
      }}
    >
      {children}
    </ScrollDirectionContext.Provider>
  );
};

/**
 * Hook to report scroll events from a screen.
 * Returns an `onScroll` handler to attach to ScrollView/FlatList.
 */
export const useScrollDirection = () => {
  const { reportScroll } = useContext(ScrollDirectionContext);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      reportScroll(event.nativeEvent.contentOffset.y);
    },
    [reportScroll]
  );

  return { onScroll };
};

/**
 * Hook to read the current tab bar visibility state.
 * Use this in custom tab bars or layout components.
 */
export const useTabBarVisibility = () => {
  const { isVisible } = useContext(ScrollDirectionContext);
  return isVisible;
};
