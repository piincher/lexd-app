/**
 * CreateTicketForm Component
 * Modern form with type cards, priority chips, and inline validation
 */

import React from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { TicketType, TicketPriority } from '../../types';
import { TICKET_TYPE_LABELS, TICKET_TYPE_ICONS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS } from '../../types';

interface CreateTicketFormProps {
  form: {
    type: TicketType | null;
    setType: (t: TicketType) => void;
    priority: TicketPriority;
    setPriority: (p: TicketPriority) => void;
    subject: string;
    setSubject: (s: string) => void;
    description: string;
    setDescription: (d: string) => void;
  };
  errors: Record<string, string>;
  disabled?: boolean;
}

const TYPES: TicketType[] = ['ORDER_ISSUE', 'PAYMENT_ISSUE', 'DELIVERY_ISSUE', 'GENERAL'];
const PRIORITIES: TicketPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ form, errors, disabled }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>Type de demande</Text>
      <View style={styles.typeGrid}>
        {TYPES.map((t) => {
          const active = form.type === t;
          return (
            <View key={t} style={[styles.typeCard, { borderColor: active ? colors.primary.main : colors.border, backgroundColor: active ? colors.primary[50] : colors.background.card }]}>
              <MaterialCommunityIcons name={TICKET_TYPE_ICONS[t] as any} size={24} color={active ? colors.primary.main : colors.text.secondary} onPress={() => form.setType(t)} />
              <Text style={[styles.typeLabel, { color: active ? colors.primary.main : colors.text.primary }]}>{TICKET_TYPE_LABELS[t]}</Text>
            </View>
          );
        })}
      </View>
      {errors.type && <HelperText type="error">{errors.type}</HelperText>}

      <Text style={[styles.label, { color: colors.text.secondary }]}>Priorité</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipRow}>
          {PRIORITIES.map((p) => {
            const active = form.priority === p;
            return (
              <View key={p} style={[styles.chip, { borderColor: active ? TICKET_PRIORITY_COLORS[p] : colors.border, backgroundColor: active ? TICKET_PRIORITY_COLORS[p] + '20' : colors.background.card }]}>
                <Text style={[styles.chipText, { color: active ? TICKET_PRIORITY_COLORS[p] : colors.text.secondary }]} onPress={() => !disabled && form.setPriority(p)}>
                  {TICKET_PRIORITY_LABELS[p]}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Text style={[styles.label, { color: colors.text.secondary }]}>Sujet</Text>
      <TextInput
        style={[styles.input, { borderColor: errors.subject ? colors.status.error : colors.border, backgroundColor: colors.background.card, color: colors.text.primary }]}
        placeholder="Décrivez brièvement votre problème"
        placeholderTextColor={colors.text.disabled}
        value={form.subject}
        onChangeText={form.setSubject}
        maxLength={100}
        editable={!disabled}
      />
      <View style={styles.row}>
        {errors.subject ? <HelperText type="error">{errors.subject}</HelperText> : <View />}
        <Text style={[styles.counter, { color: colors.text.muted }]}>{form.subject.length}/100</Text>
      </View>

      <Text style={[styles.label, { color: colors.text.secondary }]}>Description</Text>
      <TextInput
        style={[styles.input, styles.area, { borderColor: errors.description ? colors.status.error : colors.border, backgroundColor: colors.background.card, color: colors.text.primary }]}
        placeholder="Décrivez votre problème en détail..."
        placeholderTextColor={colors.text.disabled}
        value={form.description}
        onChangeText={form.setDescription}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        maxLength={500}
        editable={!disabled}
      />
      <View style={styles.row}>
        {errors.description ? <HelperText type="error">{errors.description}</HelperText> : <View />}
        <Text style={[styles.counter, { color: form.description.length > 0 && form.description.length < 20 ? colors.status.error : colors.text.muted }]}>{form.description.length}/500</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { fontFamily: Fonts.meduim, fontSize: 14, marginBottom: 8, marginTop: 12 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeCard: { flex: 1, minWidth: '45%', borderWidth: 1.5, borderRadius: 12, padding: 14, alignItems: 'center', gap: 6 },
  typeLabel: { fontFamily: Fonts.meduim, fontSize: 12, textAlign: 'center' },
  chipRow: { flexDirection: 'row', gap: 10, paddingVertical: 2 },
  chip: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  chipText: { fontFamily: Fonts.meduim, fontSize: 13 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontFamily: Fonts.regular, fontSize: 15 },
  area: { minHeight: 120, paddingTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  counter: { fontFamily: Fonts.regular, fontSize: 12 },
});

export default CreateTicketForm;
