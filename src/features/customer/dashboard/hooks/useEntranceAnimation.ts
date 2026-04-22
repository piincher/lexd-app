import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useEntranceAnimation = (itemCount: number, delay = 0) => {
  const anims = useRef<Animated.Value[]>(
    Array.from({ length: itemCount }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: delay + i * 80,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );
    Animated.stagger(60, animations).start();
  }, [itemCount]);

  return anims.map((anim) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  }));
};

export default useEntranceAnimation;
