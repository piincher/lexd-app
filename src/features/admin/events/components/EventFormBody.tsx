import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Checkbox } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { useEventForm } from '../hooks/useEventForm';
import { EventStatus } from '../api/types';
import { ChipSelect } from './ChipSelect';
import { ShippingRuleEditor } from './ShippingRuleEditor';
import { CampaignStepEditor } from './CampaignStepEditor';
import { EventDateField } from './EventDateField';
import { EventBannerPicker } from './EventBannerPicker';

type Controller = ReturnType<typeof useEventForm>;

const STATUSES: { value: EventStatus; label: string }[] = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'scheduled', label: 'Programmé' },
  { value: 'live', label: 'En cours' },
  { value: 'ended', label: 'Terminé' },
];

const SectionTitle: React.FC<{ children: string }> = ({ children }) => {
  const { colors } = useAppTheme();
  return <Text style={[styles.section, { color: colors.text.primary }]}>{children}</Text>;
};

export const EventFormBody: React.FC<{ ctrl: Controller }> = ({ ctrl }) => {
  const { colors } = useAppTheme();
  const { form, setField, setTheme } = ctrl;
  const [showShippingRules, setShowShippingRules] = useState(false);

  return (
    <View>
      {/* ── Général ── */}
      <SectionTitle>Général</SectionTitle>
      <Input label="Nom de l'événement" value={form.name} onChangeText={(t) => setField('name', t)} fullWidth />
      <Input label="Slug (ex: coupe-du-monde-2026)" value={form.slug} autoCapitalize="none"
        onChangeText={(t) => setField('slug', t.toLowerCase().replace(/\s+/g, '-'))} fullWidth />
      <ChipSelect label="Statut" value={(form.status || 'draft') as EventStatus} options={STATUSES}
        onChange={(status) => setField('status', status)} />
      <EventDateField label="Début teaser" value={form.teaserStart}
        onChange={(d) => setField('teaserStart', d)} maximumDate={form.liveStart ? new Date(form.liveStart) : undefined} />
      <EventDateField label="Début event mode" value={form.liveStart}
        onChange={(d) => setField('liveStart', d)} minimumDate={form.teaserStart ? new Date(form.teaserStart) : undefined} />
      <EventDateField label="Date de l'événement / coup d'envoi" value={form.eventStart}
        onChange={(d) => setField('eventStart', d)} minimumDate={form.liveStart ? new Date(form.liveStart) : undefined} />
      <EventDateField label="Fin" value={form.liveEnd}
        onChange={(d) => setField('liveEnd', d)} minimumDate={form.eventStart ? new Date(form.eventStart) : undefined} />
      <Input label="Régions (codes séparés par virgule, ex: ML,CI)" value={form.regions.join(',')}
        autoCapitalize="characters"
        onChangeText={(t) => setField('regions', t.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean))}
        fullWidth />
      <Input label="Priorité" value={String(form.priority)} keyboardType="numeric"
        onChangeText={(t) => setField('priority', Number(t.replace(/[^0-9]/g, '')) || 0)} fullWidth />
      <Checkbox label="Actif (interrupteur principal)" checked={form.isActive}
        onPress={() => setField('isActive', !form.isActive)} />

      {/* ── Thème ── */}
      <SectionTitle>Thème</SectionTitle>
      <Input label="Icône (emoji, ex: ⚽)" value={form.theme.icon} onChangeText={(t) => setTheme({ icon: t })} fullWidth />
      <Input label="Couleur primaire (#hex)" value={form.theme.primaryColor} autoCapitalize="none"
        onChangeText={(t) => setTheme({ primaryColor: t })} fullWidth />
      <Input label="Couleur accent (#hex)" value={form.theme.accentColor} autoCapitalize="none"
        onChangeText={(t) => setTheme({ accentColor: t })} fullWidth />
      <Text style={[styles.label, { color: colors.text.secondary }]}>Bannière</Text>
      <EventBannerPicker value={form.theme.bannerImageUrl}
        onChange={(url) => setTheme({ bannerImageUrl: url })} />

      {/* ── Expédition & tarifs (avancé) ── */}
      <Button
        title={showShippingRules ? 'Masquer les lignes d\'expédition' : 'Afficher les lignes d\'expédition (avancé)'}
        variant="outline"
        onPress={() => setShowShippingRules((s) => !s)}
        style={styles.advancedButton}
      />
      {showShippingRules && (
        <>
          <SectionTitle>Lignes d&apos;expédition</SectionTitle>
          {form.shippingRules.map((rule, i) => (
            <ShippingRuleEditor key={i} index={i} rule={rule} eventStart={form.eventStart}
              onChange={(patch) => ctrl.updateRule(i, patch)} onRemove={() => ctrl.removeRule(i)} />
          ))}
          <Button title="+ Ajouter une ligne" variant="outline" onPress={ctrl.addRule} />
        </>
      )}

      {/* ── Campagne ── */}
      <View style={styles.spacer} />
      <SectionTitle>Campagne (notifications)</SectionTitle>
      {form.campaignSteps.map((step, i) => (
        <CampaignStepEditor key={i} index={i} step={step}
          onChange={(patch) => ctrl.updateStep(i, patch)} onRemove={() => ctrl.removeStep(i)} />
      ))}
      <Button title="+ Ajouter une notification" variant="outline" onPress={ctrl.addStep} />

      {!!ctrl.validationError && (
        <Text style={[styles.error, { color: colors.status.error }]}>{ctrl.validationError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: { fontSize: 18, fontWeight: '800', marginTop: 18, marginBottom: 10 },
  label: { fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  advancedButton: { marginTop: 18 },
  spacer: { height: 8 },
  error: { fontSize: 13, fontWeight: '600', marginTop: 12 },
});
