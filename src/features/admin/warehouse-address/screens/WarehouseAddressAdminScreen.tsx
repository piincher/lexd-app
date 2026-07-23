import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';
import { Screen } from '@src/shared/ui/Screen';
import { Loading } from '@src/shared/ui/Loading';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WarehouseAddress, WarehouseMode } from '@src/features/warehouse-address/types';
import { useWarehouseAddressAdmin } from '../hooks/useWarehouseAddressAdmin';

type FormState = {
  companyName: string;
  warehouseCode: string;
  recipientName: string;
  phone: string;
  addressDetail: string;
  addressDetailFr: string;
  city: string;
  province: string;
  postalCode: string;
  contactWhatsApp: string;
  contactWeChat: string;
  note: string;
  active: boolean;
};

const FIELDS: { key: keyof FormState; label: string; multiline?: boolean; keyboardType?: KeyboardTypeOptions }[] = [
  { key: 'companyName', label: 'Société' },
  { key: 'warehouseCode', label: "Numéro d'entrepôt (入仓号)" },
  { key: 'recipientName', label: 'Destinataire (收件人)' },
  { key: 'phone', label: 'Téléphone (手机号码)', keyboardType: 'phone-pad' },
  { key: 'addressDetail', label: 'Adresse détaillée (详细地址)', multiline: true },
  { key: 'addressDetailFr', label: 'Adresse — traduction FR (optionnel)', multiline: true },
  { key: 'city', label: 'Ville (市)' },
  { key: 'province', label: 'Province (省)' },
  { key: 'postalCode', label: 'Code postal' },
  { key: 'contactWhatsApp', label: 'Contact WhatsApp' },
  { key: 'contactWeChat', label: 'Contact WeChat' },
  { key: 'note', label: 'Note / consigne fournisseur', multiline: true },
];

const toForm = (a?: WarehouseAddress): FormState => ({
  companyName: a?.companyName ?? '',
  warehouseCode: a?.warehouseCode ?? '',
  recipientName: a?.recipientName ?? '',
  phone: a?.phone ?? '',
  addressDetail: a?.addressDetail ?? '',
  addressDetailFr: a?.addressDetailFr ?? '',
  city: a?.city ?? '',
  province: a?.province ?? '',
  postalCode: a?.postalCode ?? '',
  contactWhatsApp: a?.contactWhatsApp ?? '',
  contactWeChat: a?.contactWeChat ?? '',
  note: a?.note ?? '',
  active: a?.active ?? true,
});

const MODES: { mode: WarehouseMode; label: string }[] = [
  { mode: 'SEA', label: 'Maritime' },
  { mode: 'AIR', label: 'Aérien' },
];

const WarehouseAddressAdminScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const { addresses, isLoading, isError, refetch, save, isSaving, savingMode } = useWarehouseAddressAdmin();
  const [mode, setMode] = useState<WarehouseMode>('SEA');
  const [forms, setForms] = useState<Partial<Record<WarehouseMode, FormState>>>({});

  // Seed local form state for any mode not already being edited (don't clobber
  // unsaved edits when the query refetches).
  useEffect(() => {
    if (!addresses.length) return;
    setForms((prev) => {
      const next = { ...prev };
      for (const address of addresses) {
        if (!next[address.mode]) next[address.mode] = toForm(address);
      }
      return next;
    });
  }, [addresses]);

  const form = useMemo(
    () => forms[mode] ?? toForm(addresses.find((a) => a.mode === mode)),
    [forms, mode, addresses],
  );

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForms((prev) => ({ ...prev, [mode]: { ...(prev[mode] ?? form), [key]: value } }));
  };

  const handleSave = () => {
    void save({ mode, payload: form });
  };

  if (isLoading) return <Loading message="Chargement des adresses…" fullScreen />;
  if (isError) {
    return (
      <EmptyState
        title="Erreur de chargement"
        message="Impossible de charger les adresses d'entrepôt."
        actionLabel="Réessayer"
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <Screen
      header={{ title: "Adresses d'entrepôt" }}
      footer={
        <View style={[styles.footer, { backgroundColor: colors.background.default, borderTopColor: colors.border }]}>
          <Button
            title={`Enregistrer (${mode === 'AIR' ? 'Aérien' : 'Maritime'})`}
            onPress={handleSave}
            loading={isSaving && savingMode === mode}
            fullWidth
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={[styles.segment, { borderColor: colors.border, backgroundColor: colors.background.card }]}>
          {MODES.map((item) => {
            const selected = item.mode === mode;
            return (
              <Pressable
                key={item.mode}
                onPress={() => setMode(item.mode)}
                style={[styles.segmentItem, selected && { backgroundColor: colors.primary.main }]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text style={[styles.segmentText, { color: selected ? colors.text.inverse : colors.text.secondary }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.activeRow, { borderColor: colors.border, backgroundColor: colors.background.card }]}>
          <View style={styles.activeText}>
            <Text style={[styles.activeTitle, { color: colors.text.primary }]}>Visible par les clients</Text>
            <Text style={[styles.activeSub, { color: colors.text.secondary }]}>
              Désactivez pour masquer cette adresse dans l&apos;app.
            </Text>
          </View>
          <Switch value={form.active} onValueChange={(v) => setField('active', v)} />
        </View>

        {FIELDS.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            value={form[field.key] as string}
            onChangeText={(text) => setField(field.key, text)}
            multiline={field.multiline}
            keyboardType={field.keyboardType}
            fullWidth
          />
        ))}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { gap: 14, padding: 16, paddingBottom: 32 },
  segment: { flexDirection: 'row', borderWidth: 1, borderRadius: 12, padding: 4, gap: 4 },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 9 },
  segmentText: { fontSize: 14, fontWeight: '700' },
  activeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 14 },
  activeText: { flex: 1 },
  activeTitle: { fontSize: 15, fontWeight: '700' },
  activeSub: { fontSize: 12, marginTop: 2, lineHeight: 17 },
  footer: { padding: 16, borderTopWidth: StyleSheet.hairlineWidth },
});

export default WarehouseAddressAdminScreen;
