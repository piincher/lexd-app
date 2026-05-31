import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import type { DemoGoodsItem } from '../types';

interface Props {
  goods: DemoGoodsItem[];
}

type Styles = ReturnType<typeof createStyles>;

const GoodsCard: React.FC<{
  item: DemoGoodsItem;
  index: number;
  colors: ReturnType<typeof useAppTheme>['colors'];
  styles: Styles;
}> = ({ item, index, colors, styles }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Pressable onPressIn={() => { scale.value = withSpring(0.95); }} onPressOut={() => { scale.value = withSpring(1); }}>
      <Animated.View entering={FadeInRight.delay(index * 100)}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={[styles.imageBox, { backgroundColor: item.imageColor }]}>
            <Text style={styles.imageLetter}>{item.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.code}>{item.trackingCode}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
            <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>Qté {item.quantity}</Text>
            <Text style={styles.meta}>{item.volume}</Text>
          </View>
          <Text style={styles.balance}>{item.balance}</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const DemoGoodsPreview: React.FC<Props> = ({ goods }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vos marchandises</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{goods.length}</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {goods.map((item, index) => (
          <GoodsCard key={item.id} item={item} index={index} colors={colors} styles={styles} />
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: { marginHorizontal: 20, marginTop: Theme.spacing.lg },
    header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    headerTitle: { fontFamily: Fonts.bold, fontSize: 18, color: colors.text.primary },
    badge: { minWidth: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary.main },
    badgeText: { fontFamily: Fonts.bold, fontSize: 12, color: colors.text.inverse, paddingHorizontal: 6 },
    scrollContent: { paddingRight: 16 },
    card: {
      width: 160, borderRadius: 20, padding: 12,
      backgroundColor: colors.background.card, marginRight: 12, shadowColor: colors.neutral[900], shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2,
    },
    imageBox: { height: 80, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    imageLetter: { fontFamily: Fonts.bold, fontSize: 28, color: colors.text.inverse },
    name: { fontFamily: Fonts.bold, fontSize: 14, color: colors.text.primary },
    code: { fontFamily: Fonts.medium, fontSize: 11, color: colors.text.muted, marginTop: 2, fontVariant: ['tabular-nums'] },
    statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999, marginTop: 8 },
    statusText: { fontFamily: Fonts.bold, fontSize: 10 },
    metaRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
    meta: { fontFamily: Fonts.medium, fontSize: 11, color: colors.text.muted },
    balance: { fontFamily: Fonts.bold, fontSize: 14, color: colors.text.primary, marginTop: 8 },
  });
