import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoShipment, DemoShipmentMode } from '../types';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

interface Props { shipments: DemoShipment[]; selectedMode: DemoShipmentMode; onSelect: (mode: DemoShipmentMode) => void; }

const ModeCard: React.FC<{ s: DemoShipment; sel: boolean; i: number; onSelect: () => void; colors: ReturnType<typeof useAppTheme>['colors']; isDark: boolean }> = ({ s, sel, i, onSelect, colors, isDark }) => {
  const sc = useSharedValue(1);
  const a = useAnimatedStyle(() => ({ transform: [{ scale: sc.value }] }));
  const air = s.mode === 'air';
  const ic = air ? colors.status.info : colors.status.success;
  return (
    <Pressable onPress={onSelect} onPressIn={() => { sc.value = withSpring(0.97); }} onPressOut={() => { sc.value = withSpring(1); }}>
      <Animated.View entering={FadeInRight.delay(i * 150)}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: colors.background.card, borderColor: sel ? colors.primary.main : colors.border, borderWidth: sel ? 2 : HAIRLINE },
            a,
          ]}
        >
          <View style={[styles.icon, { backgroundColor: `${ic}18` }]}><FontAwesome6 name={air ? 'plane' : 'ship'} size={22} color={ic} /></View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>{s.label}</Text>
            <Text style={[styles.route, { color: colors.text.secondary }]} numberOfLines={1}>{s.route}</Text>
            <View style={styles.meta}>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>{s.goodsCount} article{s.goodsCount > 1 ? 's' : ''}</Text>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>•</Text>
              <Text style={[styles.metaText, { color: colors.text.muted }]}>{s.etaDate}</Text>
            </View>
          </View>
          {sel && <View style={[styles.dot, { backgroundColor: colors.primary.main }]} />}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const GuestModeSelector: React.FC<Props> = ({ shipments, selectedMode, onSelect }) => {
  const { colors, isDark } = useAppTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      {shipments.map((s, i) => (<ModeCard key={s.id} s={s} sel={s.mode === selectedMode} i={i} onSelect={() => onSelect(s.mode)} colors={colors} isDark={isDark} />))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingVertical: 4 },
  card: { width: 300, flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 16, gap: 14, marginRight: 12 },
  icon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, gap: 3 },
  title: { fontFamily: Fonts.bold, fontSize: 14 },
  route: { fontFamily: Fonts.regular, fontSize: 12 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  metaText: { fontFamily: Fonts.medium, fontSize: 11 },
  dot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4 },
});
