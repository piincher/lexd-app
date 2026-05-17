import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useAnimatedRef, useScrollViewOffset, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import type { RootStackParamList } from '@src/navigations/type';
import { useGuestPreview } from '../../hooks/useGuestPreview';

export const useGuestPreviewScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'GuestPreview'>>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const guestPreview = useGuestPreview(navigation);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, 120], [1, 0.85], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(scrollOffset.value, [0, 120], [1, 0.97], Extrapolation.CLAMP) }],
  }));

  return {
    ...guestPreview,
    scrollRef,
    heroStyle,
    handlers: {
      setSelectedMode: guestPreview.setSelectedMode,
      handleLogin: guestPreview.handleLogin,
      handleContact: guestPreview.handleContact,
      handleAction: guestPreview.handleAction,
    },
  };
};
