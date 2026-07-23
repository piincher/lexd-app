/**
 * ShipmentFilterBar — the four buckets a customer actually sorts by.
 *
 * Not a mirror of the nine lifecycle stages: a filter list as long as the
 * journey is a worse tool than four buckets that answer real questions —
 * "what needs me", "what's moving", "what's done".
 */

import React, { useMemo } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';
import type { ShipmentFilter } from '../hooks/useShipments';

interface Props {
  value: ShipmentFilter;
  onChange: (f: ShipmentFilter) => void;
  counts: Record<ShipmentFilter, number>;
}

const OPTIONS: { key: ShipmentFilter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'action', label: 'À retirer' },
  { key: 'active', label: 'En cours' },
  { key: 'delivered', label: 'Livrés' },
];

export const ShipmentFilterBar: React.FC<Props> = ({ value, onChange, counts }) => {
  const { colors } = useAppTheme();

  const s = useMemo(
    () =>
      StyleSheet.create({
        scroll: { paddingHorizontal: 16, gap: 8, paddingVertical: 2 },
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 11,
          paddingVertical: 7,
          borderRadius: RADIUS.control,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
          backgroundColor: colors.background.card,
        },
        chipOn: { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
        label: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: colors.text.secondary,
        },
        labelOn: { color: colors.text.inverse },
        count: {
          fontSize: 10.5,
          fontWeight: '700',
          color: colors.text.muted,
          fontVariant: ['tabular-nums'],
        },
        countOn: { color: colors.text.inverse },
      }),
    [colors],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.scroll}
    >
      {OPTIONS.map((o) => {
        const on = value === o.key;
        return (
          <Pressable
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[s.chip, on && s.chipOn]}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={`${o.label}, ${counts[o.key]} envois`}
          >
            <Text style={[s.label, on && s.labelOn]}>{o.label}</Text>
            <Text style={[s.count, on && s.countOn]}>{counts[o.key]}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default ShipmentFilterBar;
