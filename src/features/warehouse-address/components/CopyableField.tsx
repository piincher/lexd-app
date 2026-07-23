/* Hallmark · component: copy-row · genre: utilitarian
 * Tap-to-copy identity row. Value is the hero; the ZH·FR label is subordinate.
 * states: default · hover(pressed) · disabled(n/a) · success(flash) — pre-emit P5 H5 E4 S5 R5 V4
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CopyableFieldProps {
  labelZh: string;
  labelFr: string;
  value: string;
  /** Hero rows render the value large + accent-coloured (e.g. the warehouse code). */
  hero?: boolean;
  accent: string;
  /** Long values (the Chinese address) stack the value under the label full-width. */
  stacked?: boolean;
  last?: boolean;
}

export const CopyableField: React.FC<CopyableFieldProps> = ({
  labelZh, labelFr, value, hero, accent, stacked, last,
}) => {
  const { colors } = useAppTheme();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
    showMessage({ message: 'Copié', description: `${labelFr} copié`, type: 'success' });
  };

  return (
    <Pressable
      onPress={handleCopy}
      style={({ pressed }) => [
        styles.row,
        stacked && styles.rowStacked,
        !last && { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth },
        pressed && { opacity: 0.55 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Copier ${labelFr}`}
    >
      <View style={stacked ? styles.stackText : styles.inlineLabel}>
        <Text style={[styles.label, { color: colors.text.secondary }]} numberOfLines={1}>
          {labelZh}  ·  {labelFr}
        </Text>
        {stacked && (
          <Text style={[styles.value, styles.stackedValue, { color: colors.text.primary }]} selectable>
            {value}
          </Text>
        )}
      </View>
      {!stacked && (
        <Text
          style={[
            styles.value,
            styles.inlineValue,
            { color: hero ? accent : colors.text.primary },
            hero && styles.heroValue,
          ]}
          numberOfLines={2}
          selectable
        >
          {value}
        </Text>
      )}
      <Ionicons name="copy-outline" size={17} color={accent} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
  },
  rowStacked: { alignItems: 'flex-start' },
  inlineLabel: { flexShrink: 0, maxWidth: '42%' },
  stackText: { flex: 1, minWidth: 0, gap: 4 },
  label: { fontSize: 11.5, fontWeight: '700', letterSpacing: 0.4, textTransform: 'uppercase' },
  value: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  inlineValue: { flex: 1, textAlign: 'right' },
  stackedValue: { fontSize: 17, lineHeight: 25 },
  heroValue: { fontSize: 26, letterSpacing: 0.5, textAlign: 'right' },
  icon: { marginTop: 1 },
});
