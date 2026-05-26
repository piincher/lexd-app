import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Control, Controller, useWatch, UseFormSetValue } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ReceiveExceptionReason, ReceiveGoodsFormData } from '../types';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ReceiveExceptionPanelProps {
  control: Control<ReceiveGoodsFormData>;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
  noteError?: string;
  photoCount: number;
  onUnknownClient: () => void;
}

const OPTIONS: { value: ReceiveExceptionReason; label: string; icon: IconName }[] = [
  { value: 'CLIENT_UNKNOWN', label: 'Client inconnu', icon: 'account-question-outline' },
  { value: 'TRACKING_DOUBTFUL', label: 'Suivi douteux', icon: 'barcode-off' },
  { value: 'DAMAGED', label: 'Endommagé', icon: 'package-variant-remove' },
  { value: 'PRICE_TO_CONFIRM', label: 'Prix à confirmer', icon: 'cash' },
  { value: 'PHOTO_MISSING', label: 'Photo manquante', icon: 'image-off-outline' },
];

export const ReceiveExceptionPanel: React.FC<ReceiveExceptionPanelProps> = ({
  control,
  setValue,
  noteError,
  photoCount,
  onUnknownClient,
}) => {
  const { colors } = useAppTheme();
  const watchedReasons = useWatch({ control, name: 'exceptionReasons' });
  const reasons = useMemo(() => watchedReasons || [], [watchedReasons]);

  const toggleReason = useCallback((reason: ReceiveExceptionReason) => {
    const next = reasons.includes(reason)
      ? reasons.filter((item: ReceiveExceptionReason) => item !== reason)
      : [...reasons, reason];
    setValue('exceptionReasons', next, { shouldDirty: true, shouldValidate: true });
    if (reason === 'CLIENT_UNKNOWN' && !reasons.includes(reason)) onUnknownClient();
    if (reason === 'DAMAGED' && !reasons.includes(reason)) {
      setValue('condition', 'damaged', { shouldDirty: true, shouldValidate: true });
    }
  }, [onUnknownClient, reasons, setValue]);

  return (
    <View style={[styles.panel, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>{"File d'exception"}</Text>
        {reasons.length > 0 ? (
          <Text style={[styles.count, { color: colors.status.warning }]}>{reasons.length}</Text>
        ) : null}
      </View>
      <View style={styles.grid}>
        {OPTIONS.map((option) => {
          const selected = reasons.includes(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => toggleReason(option.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.feedback.warningBg : colors.background.paper,
                  borderColor: selected ? colors.status.warning : colors.border,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={option.icon}
                size={16}
                color={selected ? colors.feedback.warningDark : colors.text.secondary}
              />
              <Text style={[styles.chipText, { color: selected ? colors.feedback.warningDark : colors.text.secondary }]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {reasons.includes('DAMAGED') && photoCount === 0 ? (
        <Text style={[styles.warning, { color: colors.status.error }]}>Photo obligatoire pour un colis endommagé.</Text>
      ) : null}
      {reasons.length > 0 ? (
        <Controller
          control={control}
          name="exceptionNotes"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              label="Note exception"
              value={value}
              onChangeText={onChange}
              error={!!noteError}
              multiline
              style={styles.note}
            />
          )}
        />
      ) : null}
      {noteError ? <Text style={[styles.warning, { color: colors.status.error }]}>{noteError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  panel: { marginBottom: 14, padding: 12, borderRadius: 8, borderWidth: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 14, fontWeight: '700' },
  count: { fontSize: 13, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40, borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  chipText: { fontSize: 12, fontWeight: '700' },
  note: { marginTop: 12 },
  warning: { marginTop: 8, fontSize: 12, fontWeight: '600' },
});
