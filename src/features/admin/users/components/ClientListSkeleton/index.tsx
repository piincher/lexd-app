import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@src/providers/ThemeProvider";

const ShimmerBlock: React.FC<{
  width: number | `${number}%`;
  height: number;
  borderRadius?: number;
}> = ({ width, height, borderRadius = 4 }) => {
  const { colors, isDark } = useAppTheme();
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmer.value, [0, 1], [-200, 400]) }],
  }));

  return (
    <View style={{ width, height, borderRadius, overflow: "hidden", backgroundColor: isDark ? colors.background.card : colors.neutral[200] }}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={["transparent", isDark ? colors.neutral.white + '14' : colors.neutral.white + '80', "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const SkeletonCard: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <View style={styles.accentBorder} />
      <ShimmerBlock width={48} height={48} borderRadius={14} />
      <View style={styles.info}>
        <View style={styles.row}>
          <ShimmerBlock width={120} height={16} borderRadius={4} />
          <ShimmerBlock width={50} height={18} borderRadius={10} />
        </View>
        <ShimmerBlock width={90} height={13} borderRadius={4} />
        <ShimmerBlock width={160} height={12} borderRadius={4} />
      </View>
      <ShimmerBlock width={36} height={36} borderRadius={10} />
    </View>
  );
};

export const ClientListSkeleton: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.container}>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Animated.View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  accentBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.neutral[200],
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
    gap: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
