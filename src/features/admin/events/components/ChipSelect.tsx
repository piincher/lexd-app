import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ChipOption<T extends string> {
  value: T;
  label: string;
}

interface ChipSelectProps<T extends string> {
  label?: string;
  value: T;
  options: ChipOption<T>[];
  onChange: (value: T) => void;
}

/** Compact horizontal chip selector for enum fields. */
export function ChipSelect<T extends string>({ label, value, options, onChange }: ChipSelectProps<T>) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.wrap}>
      {!!label && <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>}
      <View style={styles.row}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? colors.primary.main : colors.background.paper,
                  borderColor: active ? colors.primary.main : colors.border,
                },
              ]}
            >
              <Text style={[styles.chipText, { color: active ? '#FFFFFF' : colors.text.primary }]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '600' },
});
