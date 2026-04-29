/**
 * useHideTabBarOnScroll — Hook for screens to control tab bar visibility
 *
 * Attach the returned `onScroll` handler to any ScrollView or FlatList.
 * The tab bar will automatically hide when scrolling down and show when scrolling up.
 *
 * @example
 * const { onScroll } = useHideTabBarOnScroll();
 * <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
 *   ...
 * </ScrollView>
 */

import { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useTabBarStore } from '@src/store/tabBarStore';

export const useHideTabBarOnScroll = () => {
  const reportScroll = useTabBarStore((state) => state.reportScroll);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      reportScroll(event.nativeEvent.contentOffset.y);
    },
    [reportScroll]
  );

  return { onScroll };
};
