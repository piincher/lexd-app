import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Rect } from 'react-native-svg';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createClientIdBadgeStyles } from './ClientIdBadge.styles';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const BADGE_HEIGHT = 50;
const DASH_CYCLE = 280;

interface ClientIdBadgeProps {
  clientId: string;
}

export const ClientIdBadge: React.FC<ClientIdBadgeProps> = ({ clientId }) => {
  const { colors } = useAppTheme();
  const styles = createClientIdBadgeStyles(colors);
  const reducedMotion = useReducedMotion();
  const [width, setWidth] = useState(0);
  const dashOffset = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) {
      dashOffset.value = 0;
      return;
    }

    dashOffset.value = withRepeat(
      withTiming(DASH_CYCLE, {
        duration: 3200,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.System,
      }),
      -1,
      false,
    );
  }, [dashOffset, reducedMotion]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={handleLayout} accessibilityLabel={`Identifiant client ${clientId}`}>
      {width > 0 && (
        <Svg pointerEvents="none" width={width} height={BADGE_HEIGHT} style={styles.perimeter}>
          <Rect
            x={1}
            y={1}
            width={width - 2}
            height={BADGE_HEIGHT - 2}
            rx={13}
            stroke={colors.primary[200]}
            strokeWidth={1}
            fill="transparent"
          />
          {!reducedMotion && (
            <AnimatedRect
              x={1}
              y={1}
              width={width - 2}
              height={BADGE_HEIGHT - 2}
              rx={13}
              stroke={colors.primary.main}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="26 254"
              fill="transparent"
              animatedProps={animatedProps}
            />
          )}
        </Svg>
      )}
      <MaterialCommunityIcons name="barcode-scan" size={19} color={colors.primary.main} />
      <View style={styles.copy}>
        <Text style={styles.label}>Identifiant client</Text>
        <Text style={styles.value} numberOfLines={1}>{clientId}</Text>
      </View>
    </View>
  );
};
