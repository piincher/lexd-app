import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoMetric } from '../types';

interface Props { metrics: DemoMetric[]; }

const getTone = (c: ReturnType<typeof useAppTheme>['colors'], t: DemoMetric['tone']) => {
  switch (t) { case 'success': return c.status.success; case 'info': return c.status.info; case 'warning': return c.status.warning; case 'primary': return c.primary.main; default: return c.text.secondary; }
};

const Card: React.FC<{ m: DemoMetric; i: number; colors: ReturnType<typeof useAppTheme>['colors']; isDark: boolean; styles: ReturnType<typeof createStyles> }> = ({ m, i, colors, isDark, styles }) => {
  const s = useSharedValue(1);
  const tone = getTone(colors, m.tone);
  const a = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));
  return (
    <TouchableOpacity activeOpacity={0.9} onPressIn={() => { s.value = withSpring(0.97); }} onPressOut={() => { s.value = withSpring(1); }} style={{ width: '48%' }}>
      <Animated.View entering={FadeInDown.delay(i * 100)}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: colors.background.card, borderColor: colors.border, shadowColor: colors.neutral[900] },
            a,
          ]}
        >
          <View style={[styles.icon, { backgroundColor: `${tone}18` }]}><FontAwesome6 name={m.icon as React.ComponentProps<typeof FontAwesome6>['name']} size={16} color={tone} /></View>
          <Text style={[styles.val, { color: colors.text.primary }]}>{m.value}</Text>
          <Text style={[styles.lab, { color: colors.text.primary }]}>{m.label}</Text>
          <Text style={[styles.det, { color: colors.text.secondary }]}>{m.detail}</Text>
          {m.change && (
            <View style={[styles.pill, { backgroundColor: colors.feedback.successBg }]}>
              <Text style={[styles.pillText, { color: colors.feedback.successDark }]}>{m.change}</Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const GuestCommandCenter: React.FC<Props> = ({ metrics }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.grid}>
        {metrics.map((m, i) => (<Card key={m.id} m={m} i={i} colors={colors} isDark={isDark} styles={styles} />))}
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: { marginHorizontal: 20, marginTop: 24, borderRadius: 18, padding: 16, borderWidth: 1, backgroundColor: colors.background.card, borderColor: colors.border },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  card: { borderRadius: 14, padding: 12, borderWidth: 1, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, shadowColor: colors.neutral[900] },
  icon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  val: { fontFamily: Fonts.bold, fontSize: 22, marginTop: 10 },
  lab: { fontFamily: Fonts.bold, fontSize: 12, marginTop: 3 },
  det: { fontFamily: Fonts.regular, fontSize: 11, marginTop: 3, lineHeight: 16 },
  pill: { alignSelf: 'flex-start', marginTop: 8, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  pillText: { fontFamily: Fonts.medium, fontSize: 11 },
});
