import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, interpolate } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import type { DemoShipment } from '../types';

interface Props {
  shipment: DemoShipment;
}

export const DemoRouteBoard: React.FC<Props> = ({ shipment }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1.4, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1, true
    );
  }, [pulse]);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.4], [0.5, 0]),
  }));
  return (
    <Animated.View entering={FadeInRight.duration(500).delay(300)} style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {shipment.waypoints.map((wp, index) => {
          const done = wp.status === 'done';
          const active = wp.status === 'active';
          return (
            <React.Fragment key={wp.id}>
              <View style={styles.column}>
                <Text style={styles.city} numberOfLines={1}>{wp.city}</Text>
                <Text style={styles.code}>{wp.code}</Text>
                <View style={styles.row}>
                  <View style={styles.circleWrapper}>
                    {active && <Animated.View style={[styles.pulseRing, pulseStyle]} />}
                    <View style={[
                      styles.circle,
                      done && { backgroundColor: colors.status.success },
                      active && { backgroundColor: colors.status.info },
                      !done && !active && { backgroundColor: colors.neutral[200] },
                    ]}>
                      {done ? (
                        <FontAwesome6 name="check" size={12} color={colors.text.inverse} />
                      ) : (
                        <FontAwesome6 name={wp.icon as any} size={12} color={active ? colors.text.inverse : colors.text.secondary} />
                      )}
                    </View>
                  </View>
                  {index < shipment.waypoints.length - 1 && (
                    <View style={styles.connector}>
                      <View style={[styles.connectorLine, done && { backgroundColor: colors.status.success }]} />
                    </View>
                  )}
                </View>
                {wp.date && <Text style={styles.date}>{wp.date}</Text>}
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16, marginTop: 16,
      borderRadius: 24, padding: 16,
      backgroundColor: colors.background.card, shadowColor: colors.neutral[900], shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
    },
    scrollContent: { alignItems: 'flex-start', paddingRight: 16 },
    column: { width: 80, alignItems: 'center' },
    city: { fontFamily: Fonts.bold, fontSize: 12, color: colors.text.primary, textAlign: 'center', width: '100%' },
    code: { fontFamily: Fonts.medium, fontSize: 10, color: colors.text.muted, marginTop: 2 },
    row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    circleWrapper: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
    pulseRing: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: colors.status.info, top: 0, left: 0 },
    circle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
    date: { fontFamily: Fonts.medium, fontSize: 10, color: colors.text.secondary, textAlign: 'center' },
    connector: { width: 36, height: 44, justifyContent: 'center' },
    connectorLine: { height: 2, borderRadius: 1, backgroundColor: colors.neutral[300] },
  });
