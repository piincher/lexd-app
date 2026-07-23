/**
 * Card - Reusable card surface.
 *
 * Follows the LEXD "waybill" language (see ./designLanguage): border-first
 * separation, squarer 10px corners, and an optional leading status rail.
 * The `elevated` variant is retained for compatibility but now renders a
 * restrained shadow rather than the previous heavy drop shadow.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, RAIL_WIDTH, HAIRLINE, railColor, type RailTone } from './designLanguage';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  /**
   * Draws the LEXD status rail on the leading edge. Omit for a plain surface.
   */
  rail?: RailTone;
}

const paddingMap: Record<CardPadding, number> = {
  none: 0,
  small: 12,
  medium: 16,
  large: 24,
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  onPress,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
  rail,
}) => {
  const { colors } = useAppTheme();
  const paddingValue = paddingMap[padding];
  const isFlat = variant === 'flat' || variant === 'default';

  const surface = useMemo<ViewStyle>(() => {
    const base: ViewStyle = {
      backgroundColor: isFlat ? colors.background.paper : colors.background.card,
      borderRadius: RADIUS.card,
      // Border-first: every variant reads its edge, not its shadow.
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      overflow: 'hidden',
    };

    if (variant === 'elevated') {
      return {
        ...base,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
      };
    }
    return base;
  }, [variant, isFlat, colors]);

  const railStyle = useMemo<ViewStyle | null>(
    () =>
      rail
        ? {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: RAIL_WIDTH,
            backgroundColor: railColor(rail, colors),
          }
        : null,
    [rail, colors]
  );

  return (
    // Padding stays on the container (not an inner wrapper) so callers passing
    // layout props via `style` — flexDirection, alignItems — still apply to
    // children exactly as before. The rail is absolutely positioned and so
    // never participates in that layout.
    <TouchableOpacity
      onPress={onPress}
      // Only honor the explicit prop: a disabled TouchableOpacity swallows
      // touches for its children, so a non-pressable Card must stay enabled
      // or nested buttons inside it would stop working.
      disabled={disabled}
      style={[
        surface,
        {
          padding: paddingValue,
          paddingLeft: rail ? paddingValue + RAIL_WIDTH : paddingValue,
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={onPress ? 'button' : undefined}
      activeOpacity={onPress ? 0.85 : 1}
    >
      {railStyle ? <View style={railStyle} pointerEvents="none" /> : null}
      {children}
    </TouchableOpacity>
  );
};

export default Card;
