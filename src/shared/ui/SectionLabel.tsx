/**
 * SectionLabel - Tracked uppercase micro-header.
 *
 * The LEXD counterpart to a plain bold section title. Optionally pairs with a
 * trailing hairline rule, which is how most list sections are introduced.
 * See ./designLanguage for the rationale.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { OVERLINE, HAIRLINE, STACK } from './designLanguage';

export interface SectionLabelProps {
  children: string;
  /** Draws a hairline rule filling the space after the label. */
  rule?: boolean;
  /** Right-hand slot, e.g. a "See all" action. Suppresses the rule. */
  trailing?: React.ReactNode;
  tone?: 'default' | 'muted' | 'brand';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  rule = false,
  trailing,
  tone = 'default',
  style,
  textStyle,
  testID,
}) => {
  const { colors } = useAppTheme();

  const color =
    tone === 'brand'
      ? colors.primary.main
      : tone === 'muted'
        ? colors.text.muted
        : colors.text.secondary;

  return (
    <View style={[styles.row, style]} testID={testID}>
      <Text
        style={[OVERLINE as TextStyle, { color }, textStyle]}
        accessibilityRole="header"
        numberOfLines={1}
      >
        {children}
      </Text>

      {trailing ? (
        <View style={styles.trailing}>{trailing}</View>
      ) : rule ? (
        <View style={[styles.rule, { backgroundColor: colors.border }]} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: STACK.snug,
  },
  rule: {
    flex: 1,
    height: HAIRLINE,
    marginLeft: STACK.snug,
  },
  trailing: {
    marginLeft: 'auto',
    paddingLeft: STACK.snug,
  },
});

export default SectionLabel;
