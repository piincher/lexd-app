/**
 * StatsStrip
 * Compact route facts for delivery times and support.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS, RAIL_WIDTH, HAIRLINE } from '@src/shared/ui/designLanguage';
import { HIGHLIGHTS } from '../../constants/homeData';

type FontAwesome6Name = React.ComponentProps<typeof FontAwesome6>['name'];

const ICON_MAP: Record<string, FontAwesome6Name> = {
  airplane: 'plane-up',
  ship: 'ship',
  headset: 'headset',
};

export const StatsStrip: React.FC = () => {
  const { colors } = useAppTheme();

  const COLOR_MAP: Record<string, string> = {
    airplane: colors.status.info,
    ship: colors.primary.main,
    headset: colors.status.success,
  };

  return (
    <View style={styles.container}>
      {HIGHLIGHTS.map((item, index) => {
        const iconName = ICON_MAP[item.icon] || 'circle';
        const accentColor = COLOR_MAP[item.icon] || colors.primary.main;

        return (
          <Animated.View
            key={item.label}
            entering={FadeInDown.delay(120 + index * 70).duration(320)}
            style={[
              styles.card,
              {
                backgroundColor: colors.background.card,
                borderColor: colors.border,
              },
            ]}
          >
            {/* LEXD status rail — the leading-edge signature. */}
            <View style={[styles.rail, { backgroundColor: accentColor }]} pointerEvents="none" />

            <View style={[styles.iconTile, { backgroundColor: `${accentColor}14` }]}>
              <FontAwesome6 name={iconName} size={18} color={accentColor} />
            </View>
            <View style={styles.textBlock}>
              <View style={styles.valueRow}>
                <Text style={[styles.value, { color: colors.text.primary }]}>{item.value}</Text>
                {item.unit !== '' && (
                  <Text style={[styles.unit, { color: colors.text.secondary }]}>{item.unit}</Text>
                )}
              </View>
              <Text style={[styles.label, { color: colors.text.disabled }]}>{item.label}</Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },
  card: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 10,
    // Waybill geometry: squarer than the previous 16px, border-first, no shadow.
    paddingLeft: 10 + RAIL_WIDTH,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    overflow: 'hidden',
  },
  rail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: RAIL_WIDTH,
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.control,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  textBlock: {
    alignItems: 'flex-start',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    letterSpacing: -0.2,
  },
  unit: {
    fontFamily: Fonts.regular,
    fontSize: 11,
  },
  label: {
    // Tracked uppercase micro-label: the manifest cue used app-wide.
    fontFamily: Fonts.bold,
    fontSize: 9.5,
    marginTop: 5,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});
