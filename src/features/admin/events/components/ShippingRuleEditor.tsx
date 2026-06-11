import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Input, Card, Checkbox } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { formatDateLong } from '@src/shared/lib/formatters';
import { ShippingRule, EventShippingMode, EventFeePromoType } from '../api/types';
import { computeCutoffDate } from '../lib/computeCutoff';
import { ChipSelect } from './ChipSelect';

interface ShippingRuleEditorProps {
  index: number;
  rule: ShippingRule;
  eventStart: string;
  onChange: (patch: Partial<ShippingRule>) => void;
  onRemove: () => void;
}

const MODES: { value: EventShippingMode; label: string }[] = [
  { value: 'SEA', label: 'Maritime' },
  { value: 'AIR', label: 'Aérien' },
  { value: 'EXPRESS', label: 'Express' },
];

const PROMO_TYPES: { value: EventFeePromoType; label: string }[] = [
  { value: 'none', label: 'Aucune' },
  { value: 'percent', label: '%' },
  { value: 'fixed_per_kg', label: 'FCFA/kg' },
  { value: 'fixed_per_cbm', label: 'FCFA/CBM' },
  { value: 'flat', label: 'Forfait' },
];

const num = (t: string) => Number(t.replace(/[^0-9.]/g, '')) || 0;

export const ShippingRuleEditor: React.FC<ShippingRuleEditorProps> = ({
  index, rule, eventStart, onChange, onRemove,
}) => {
  const { colors } = useAppTheme();
  const cutoff = computeCutoffDate(eventStart, rule);

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Ligne {index + 1}</Text>
        <Pressable onPress={onRemove}><Text style={[styles.remove, { color: colors.status.error }]}>Supprimer</Text></Pressable>
      </View>

      <Input label="Libellé" value={rule.label} onChangeText={(t) => onChange({ label: t })} fullWidth />
      <Input label="Région destination (ex: ML)" value={rule.destinationRegion}
        onChangeText={(t) => onChange({ destinationRegion: t.toUpperCase() })} autoCapitalize="characters" fullWidth />

      <ChipSelect label="Mode" value={rule.mode} options={MODES} onChange={(mode) => onChange({ mode })} />

      <View style={styles.row}>
        <Input label="Transit (j)" value={String(rule.transitDays)} keyboardType="numeric"
          onChangeText={(t) => onChange({ transitDays: num(t) })} containerStyle={styles.half} />
        <Input label="Marge (j)" value={String(rule.bufferDays)} keyboardType="numeric"
          onChangeText={(t) => onChange({ bufferDays: num(t) })} containerStyle={styles.half} />
      </View>

      <View style={[styles.cutoff, { backgroundColor: colors.primary[50], borderColor: colors.primary[200] }]}>
        <Text style={[styles.cutoffText, { color: colors.primary.dark }]}>
          Date limite d'expédition : {cutoff ? formatDateLong(cutoff.toISOString()) : '—'}
        </Text>
      </View>

      <ChipSelect label="Promo tarif" value={rule.feePromoType} options={PROMO_TYPES}
        onChange={(feePromoType) => onChange({ feePromoType })} />
      {rule.feePromoType !== 'none' && (
        <Input label="Valeur promo" value={String(rule.feePromoValue)} keyboardType="numeric"
          onChangeText={(t) => onChange({ feePromoValue: num(t) })} fullWidth />
      )}

      <Checkbox label="Livraison garantie" checked={rule.guaranteedDelivery}
        onPress={() => onChange({ guaranteedDelivery: !rule.guaranteedDelivery })} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, padding: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 15, fontWeight: '700' },
  remove: { fontSize: 13, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  cutoff: { borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 10 },
  cutoffText: { fontSize: 13, fontWeight: '700' },
});
