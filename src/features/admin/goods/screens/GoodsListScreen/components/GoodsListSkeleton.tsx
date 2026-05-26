/* Hallmark · component: skeleton · genre: modern-minimal · theme: brand-aligned app theme
 * Replaces the centered spinner with content-shaped placeholders (validated brand pattern).
 * pre-emit critique: P4 H4 E4 S4 R5 V4
 */
import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, DimensionValue } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface SkeletonBlockProps {
  width: DimensionValue;
  height: number;
  radius?: number;
  style?: object;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width,
  height,
  radius = Theme.radius.sm,
  style,
}) => {
  const { colors } = useAppTheme();
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, backgroundColor: colors.neutral[200], opacity },
        style,
      ]}
    />
  );
};

const GoodsCardSkeleton: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.card}>
      <SkeletonBlock width={88} height={88} radius={16} />
      <View style={styles.info}>
        <SkeletonBlock width="52%" height={14} />
        <SkeletonBlock width="86%" height={12} style={styles.gapTop} />
        <View style={styles.footer}>
          <SkeletonBlock width={72} height={12} />
          <SkeletonBlock width={60} height={12} />
        </View>
        <View style={styles.pills}>
          <SkeletonBlock width={66} height={18} radius={Theme.radius.full} />
          <SkeletonBlock width={84} height={18} radius={Theme.radius.full} />
        </View>
      </View>
    </View>
  );
};

export const GoodsListSkeleton: React.FC = () => {
  return (
    <View style={styles.list}>
      {Array.from({ length: 6 }).map((_, i) => (
        <GoodsCardSkeleton key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: { paddingTop: Theme.spacing.sm },
});

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      marginHorizontal: Theme.spacing.lg,
      marginVertical: Theme.spacing.sm,
      padding: Theme.spacing.md,
      borderRadius: Theme.radius.xl,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      ...Theme.shadows.sm,
    },
    info: {
      flex: 1,
      marginLeft: Theme.spacing.md,
      justifyContent: 'center',
    },
    gapTop: { marginTop: 10 },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Theme.spacing.md,
    },
    pills: {
      flexDirection: 'row',
      gap: 6,
      marginTop: 10,
    },
  });

export default GoodsListSkeleton;
