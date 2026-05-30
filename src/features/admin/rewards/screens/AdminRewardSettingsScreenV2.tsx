import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RewardSettingsField } from '@src/features/referrals/components/RewardSettingsField';
import { RewardSettingsToggle } from '@src/features/referrals/components/RewardSettingsToggle';
import { useAdminRewardSettingsV2 } from '../hooks/useAdminRewards';
import type { RewardSettingsV2 } from '../types';
import { createStyles } from './AdminRewardSettingsScreenV2.styles';

const TRIGGER_OPTIONS = [
  'DELIVERED',
  'READY_FOR_PICKUP',
  'COLLECTED',
  'IN_TRANSIT',
];

const toText = (value?: number | boolean | null) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
};

const AdminRewardSettingsScreenV2: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { query, update } = useAdminRewardSettingsV2();
  const [form, setForm] = useState<Partial<RewardSettingsV2>>({});
  const [showTriggerPicker, setShowTriggerPicker] = useState(false);

  useEffect(() => {
    if (query.data) setForm({ ...query.data });
  }, [query.data]);

  const updateField = useCallback(<K extends keyof RewardSettingsV2>(key: K, value: RewardSettingsV2[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (!query.data) return;
    const payload: Partial<RewardSettingsV2> = {};
    (Object.keys(form) as (keyof RewardSettingsV2)[]).forEach((k) => {
      if (form[k] !== undefined && form[k] !== query.data[k]) {
        (payload as Record<string, unknown>)[k] = form[k];
      }
    });
    if (Object.keys(payload).length > 0) update.mutate(payload);
  }, [form, query.data, update]);

  const isDirty = query.data ? (Object.keys(form) as (keyof RewardSettingsV2)[]).some((k) => form[k] !== query.data[k]) : false;
  const isEnabled = form.enabled ?? query.data?.enabled ?? true;

  if (query.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Paramètres de points</Text>
        </View>
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
          <Text style={styles.stateText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres de points</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
          <View style={styles.section}>
            <RewardSettingsToggle enabled={isEnabled} onChange={(v) => updateField('enabled', v)} disabled={update.isPending} />
            <View style={[styles.section, { backgroundColor: isEnabled ? colors.status.success + '10' : colors.status.error + '10', marginTop: 8, borderWidth: 0 }]}>
              <Text style={[styles.helpText, { color: isEnabled ? colors.status.success : colors.status.error }]}>
                {isEnabled
                  ? 'Le système est actif. Les clients gagnent des points sur chaque livraison et peuvent faire des demandes de rédemption.'
                  : 'Le système est inactif. Aucun point ne sera attribué et les demandes de rédemption sont bloquées.'}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Règles de gain</Text>
            <RewardSettingsField
              label="Points par CBM (maritime)"
              value={toText(form.cbmPointsRate ?? query.data?.cbmPointsRate)}
              onChangeText={(v) => updateField('cbmPointsRate', Number(v.replace(',', '.')) || 0)}
              icon="cube-outline"
              helpText="Nombre de points attribués par CBM en expédition maritime."
              suffix="pts/CBM"
              disabled={!isEnabled || update.isPending}
            />
            <RewardSettingsField
              label="Points par KG (aérien)"
              value={toText(form.kgPointsRate ?? query.data?.kgPointsRate)}
              onChangeText={(v) => updateField('kgPointsRate', Number(v.replace(',', '.')) || 0)}
              icon="weight-kilogram"
              helpText="Nombre de points attribués par KG en expédition aérienne."
              suffix="pts/KG"
              disabled={!isEnabled || update.isPending}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attribution automatique</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Activer l'attribution auto</Text>
              <TouchableOpacity
                style={[styles.section, { padding: 0, backgroundColor: 'transparent', borderWidth: 0 }]}
                onPress={() => updateField('autoAwardEnabled', !(form.autoAwardEnabled ?? query.data?.autoAwardEnabled ?? false))}
                activeOpacity={0.8}
              >
                <RewardSettingsToggle
                  enabled={form.autoAwardEnabled ?? query.data?.autoAwardEnabled ?? false}
                  onChange={(v) => updateField('autoAwardEnabled', v)}
                  disabled={!isEnabled || update.isPending}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.pickerRow} onPress={() => setShowTriggerPicker(true)} activeOpacity={0.8}>
              <Text style={styles.pickerLabel}>Statut déclencheur</Text>
              <Text style={styles.pickerValue}>{form.autoAwardTriggerStatus || query.data?.autoAwardTriggerStatus || 'DELIVERED'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expiration</Text>
            <RewardSettingsField
              label="Mois avant expiration"
              value={toText(form.pointExpiryMonths ?? query.data?.pointExpiryMonths)}
              onChangeText={(v) => updateField('pointExpiryMonths', v ? Number(v) : null)}
              icon="calendar-clock-outline"
              helpText="Laisser vide pour aucune expiration."
              suffix="mois"
              disabled={!isEnabled || update.isPending}
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity style={[styles.saveButton, (!isDirty || update.isPending) && { opacity: 0.45 }]} onPress={handleSave} disabled={!isDirty || update.isPending} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>{update.isPending ? 'Enregistrement...' : 'Enregistrer'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showTriggerPicker} transparent animationType="slide" onRequestClose={() => setShowTriggerPicker(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowTriggerPicker(false)} activeOpacity={1}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Statut déclencheur</Text>
            {TRIGGER_OPTIONS.map((opt) => (
              <TouchableOpacity key={opt} style={styles.modalOption} onPress={() => { updateField('autoAwardTriggerStatus', opt); setShowTriggerPicker(false); }} activeOpacity={0.7}>
                <Text style={styles.modalOptionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowTriggerPicker(false)} activeOpacity={0.7}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminRewardSettingsScreenV2;
