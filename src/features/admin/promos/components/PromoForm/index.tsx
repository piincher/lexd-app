import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { PromoFormData } from "../../hooks/usePromoForm";
import { OptionPicker } from "../OptionPicker";
import { PROMO_TYPE_OPTIONS, APPLICABLE_TO_OPTIONS, TARGET_AUDIENCE_OPTIONS, formatDisplayDate, toDateString } from "./PromoForm.constants";
import { getStyles } from "./PromoForm.styles";

type PromoFormProps = {
  form: PromoFormData;
  onChange: (field: keyof PromoFormData, value: string) => void;
  onOptionChange: <K extends keyof PromoFormData>(field: K, value: PromoFormData[K]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
};

export function PromoForm({ form, onChange, onOptionChange, onSubmit, onCancel, isSubmitting, isEditing }: PromoFormProps) {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showUntilPicker, setShowUntilPicker] = useState(false);
  const validFromDate = form.validFrom ? new Date(form.validFrom) : undefined;
  const validUntilDate = form.validUntil ? new Date(form.validUntil) : undefined;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Code</Text>
          <TextInput style={styles.input} value={form.code} onChangeText={(v) => onChange("code", v.toUpperCase())} placeholder="ex: WELCOME20" placeholderTextColor={colors.text.disabled} autoCapitalize="characters" />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Nom</Text>
          <TextInput style={styles.input} value={form.name} onChangeText={(v) => onChange("name", v)} placeholder="Nom de la promotion" placeholderTextColor={colors.text.disabled} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput style={[styles.input, styles.textArea]} value={form.description} onChangeText={(v) => onChange("description", v)} placeholder="Description (optionnel)" placeholderTextColor={colors.text.disabled} multiline numberOfLines={3} />
        </View>

        <OptionPicker label="Type" options={PROMO_TYPE_OPTIONS} selected={form.type} onSelect={(v) => onOptionChange("type", v)} />

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Valeur {form.type === "PERCENTAGE" ? "(%)" : "(FCFA)"}</Text>
          <TextInput style={styles.input} value={form.value} onChangeText={(v) => onChange("value", v)} placeholder={form.type === "PERCENTAGE" ? "ex: 20" : "ex: 5000"} placeholderTextColor={colors.text.disabled} keyboardType="numeric" />
        </View>

        {form.type === "PERCENTAGE" && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Réduction max (FCFA, optionnel)</Text>
            <TextInput style={styles.input} value={form.maxDiscount} onChangeText={(v) => onChange("maxDiscount", v)} placeholder="ex: 10000" placeholderTextColor={colors.text.disabled} keyboardType="numeric" />
          </View>
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Montant minimum commande (optionnel)</Text>
          <TextInput style={styles.input} value={form.minOrderAmount} onChangeText={(v) => onChange("minOrderAmount", v)} placeholder="ex: 20000" placeholderTextColor={colors.text.disabled} keyboardType="numeric" />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldContainer, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Valide du</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowFromPicker(true)} activeOpacity={0.7}>
              <Ionicons name="calendar-outline" size={18} color={form.validFrom ? colors.text.primary : colors.text.disabled} />
              <Text style={[styles.dateButtonText, !form.validFrom && styles.dateButtonPlaceholder]}>
                {form.validFrom ? formatDisplayDate(form.validFrom) : "Sélectionner"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.fieldContainer, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Valide jusqu'au</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowUntilPicker(true)} activeOpacity={0.7}>
              <Ionicons name="calendar-outline" size={18} color={form.validUntil ? colors.text.primary : colors.text.disabled} />
              <Text style={[styles.dateButtonText, !form.validUntil && styles.dateButtonPlaceholder]}>
                {form.validUntil ? formatDisplayDate(form.validUntil) : "Sélectionner"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldContainer, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Max utilisations (optionnel)</Text>
            <TextInput style={styles.input} value={form.maxUsages} onChangeText={(v) => onChange("maxUsages", v)} placeholder="ex: 100" placeholderTextColor={colors.text.disabled} keyboardType="numeric" />
          </View>
          <View style={{ width: 12 }} />
          <View style={[styles.fieldContainer, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Max par utilisateur</Text>
            <TextInput style={styles.input} value={form.maxPerUser} onChangeText={(v) => onChange("maxPerUser", v)} placeholder="1" placeholderTextColor={colors.text.disabled} keyboardType="numeric" />
          </View>
        </View>

        <OptionPicker label="Applicable à" options={APPLICABLE_TO_OPTIONS} selected={form.applicableTo} onSelect={(v) => onOptionChange("applicableTo", v)} />
        <OptionPicker label="Audience cible" options={TARGET_AUDIENCE_OPTIONS} selected={form.targetAudience} onSelect={(v) => onOptionChange("targetAudience", v)} />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} onPress={onSubmit} disabled={isSubmitting} activeOpacity={0.7}>
            {isSubmitting ? <ActivityIndicator size="small" color={colors.text.inverse} /> : <Text style={styles.submitButtonText}>{isEditing ? "Mettre à jour" : "Créer"}</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DatePickerModal locale="fr" mode="single" visible={showFromPicker} onDismiss={() => setShowFromPicker(false)} date={validFromDate}
        onConfirm={(params) => { setShowFromPicker(false); if (params.date) onChange("validFrom", toDateString(params.date)); }} saveLabel="Confirmer" label="Date de début" animationType="slide" />
      <DatePickerModal locale="fr" mode="single" visible={showUntilPicker} onDismiss={() => setShowUntilPicker(false)} date={validUntilDate} validRange={{ startDate: validFromDate }}
        onConfirm={(params) => { setShowUntilPicker(false); if (params.date) onChange("validUntil", toDateString(params.date)); }} saveLabel="Confirmer" label="Date de fin" animationType="slide" />
    </KeyboardAvoidingView>
  );
}
