import React, { useEffect } from "react";
import { Text, TextStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true });

interface AnimatedCounterProps {
  value: number;
  style?: TextStyle;
  delay?: number;
  duration?: number;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  style,
  delay = 0,
  duration = 800,
}) => {
  const animatedValue = useSharedValue(0);
  const [displayValue, setDisplayValue] = React.useState("0");

  useEffect(() => {
    animatedValue.value = withDelay(
      delay,
      withTiming(value, { duration, easing: Easing.out(Easing.cubic) }, (finished) => {
        if (finished) {
          runOnJS(setDisplayValue)(String(value));
        }
      })
    );
  }, [value, delay, duration]);

  const animatedProps = useAnimatedProps(() => ({
    text: String(Math.round(animatedValue.value)),
  }));

  return (
    <AnimatedText style={style} animatedProps={animatedProps as any}>
      {displayValue}
    </AnimatedText>
  );
};
