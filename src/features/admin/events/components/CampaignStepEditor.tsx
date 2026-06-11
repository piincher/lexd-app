import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Input, Card } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  CampaignStep,
  EventCampaignStepType,
  EventCampaignTriggerKind,
  EventCampaignAudience,
} from '../api/types';
import { ChipSelect } from './ChipSelect';

interface CampaignStepEditorProps {
  index: number;
  step: CampaignStep;
  onChange: (patch: Partial<CampaignStep>) => void;
  onRemove: () => void;
}

const TYPES: { value: EventCampaignStepType; label: string }[] = [
  { value: 'teaser', label: 'Teaser' },
  { value: 'live', label: 'Lancement' },
  { value: 'cutoff_warning', label: 'Alerte' },
  { value: 'last_call', label: 'Dernier appel' },
  { value: 'recap', label: 'Bilan' },
];

const TRIGGERS: { value: EventCampaignTriggerKind; label: string }[] = [
  { value: 'fixed_date', label: 'Date fixe' },
  { value: 'days_before_cutoff', label: 'Jours avant limite' },
  { value: 'on_status_change', label: 'Changement statut' },
];

const AUDIENCES: { value: EventCampaignAudience; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'region', label: 'Région' },
  { value: 'past_shippers', label: 'Anciens clients' },
  { value: 'rule_specific', label: 'Ligne précise' },
];

const triggerLabel = (kind: EventCampaignTriggerKind) =>
  kind === 'fixed_date'
    ? 'Date (AAAA-MM-JJ)'
    : kind === 'days_before_cutoff'
      ? 'Jours avant la date limite'
      : 'Statut déclencheur';

export const CampaignStepEditor: React.FC<CampaignStepEditorProps> = ({ index, step, onChange, onRemove }) => {
  const { colors } = useAppTheme();
  const triggerStr = step.triggerValue == null ? '' : String(step.triggerValue);

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Notification {index + 1}</Text>
        <Pressable onPress={onRemove}><Text style={[styles.remove, { color: colors.status.error }]}>Supprimer</Text></Pressable>
      </View>

      <ChipSelect label="Type" value={step.type} options={TYPES} onChange={(type) => onChange({ type })} />
      <ChipSelect label="Déclencheur" value={step.triggerKind} options={TRIGGERS}
        onChange={(triggerKind) => onChange({ triggerKind, triggerValue: null })} />
      <Input
        label={triggerLabel(step.triggerKind)}
        value={triggerStr}
        keyboardType={step.triggerKind === 'days_before_cutoff' ? 'numeric' : 'default'}
        onChangeText={(t) =>
          onChange({ triggerValue: step.triggerKind === 'days_before_cutoff' ? Number(t) || 0 : t })
        }
        fullWidth
      />
      <ChipSelect label="Audience" value={step.audience} options={AUDIENCES}
        onChange={(audience) => onChange({ audience })} />
      <Input label="Titre" value={step.title} onChangeText={(t) => onChange({ title: t })} fullWidth />
      <Input label="Message" value={step.body} onChangeText={(t) => onChange({ body: t })}
        multiline numberOfLines={3} fullWidth />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, padding: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 15, fontWeight: '700' },
  remove: { fontSize: 13, fontWeight: '600' },
});
