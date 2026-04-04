import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { showMessage } from "react-native-flash-message";

import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import { useCreateCampaign } from "../hooks/useCampaigns";
import type { TargetSegment } from "../api/campaignApi";

// ── Constants ─────────────────────────────────────────────────────────────

const SEGMENT_OPTIONS: { label: string; sublabel: string; value: TargetSegment }[] = [
  {
    label: "Tous les clients",
    sublabel: "Envoyer à tous les utilisateurs actifs",
    value: "all",
  },
  {
    label: "Clients actifs",
    sublabel: "Connectés dans les 90 derniers jours",
    value: "active_customers",
  },
  {
    label: "Clients inactifs",
    sublabel: "Pas de connexion depuis plus de 90 jours",
    value: "inactive_customers",
  },
];

// ── Screen ────────────────────────────────────────────────────────────────

const CreateCampaignScreen = ({
  navigation,
}: RootStackScreenProps<"CreateCampaign">) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState<TargetSegment>("all");
  const [scheduledDate, setScheduledDate] = useState<Date>(
    new Date(Date.now() + 60 * 60 * 1000) // default: 1 hour from now
  );
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const formatScheduledDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSubmit = () => {
    if (!title.trim()) {
      showMessage({ message: "Le titre est requis", type: "warning" });
      return;
    }
    if (!body.trim()) {
      showMessage({ message: "Le message est requis", type: "warning" });
      return;
    }
    if (!saveAsDraft && scheduledDate <= new Date()) {
      showMessage({
        message: "La date de planification doit être dans le futur",
        type: "warning",
      });
      return;
    }

    createCampaign(
      {
        title: title.trim(),
        body: body.trim(),
        scheduledAt: scheduledDate.toISOString(),
        targetSegment: segment,
        status: saveAsDraft ? "draft" : "scheduled",
      },
      {
        onSuccess: () => {
          showMessage({
            message: saveAsDraft
              ? "Brouillon enregistré"
              : "Campagne planifiée avec succès",
            type: "success",
          });
          navigation.goBack();
        },
        onError: (err) =>
          showMessage({ message: err.message, type: "danger" }),
      }
    );
  };

  const isValid = title.trim().length > 0 && body.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle campagne</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View style={styles.field}>
            <Text style={styles.label}>Titre de la notification</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Offre spéciale ce week-end !"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
              maxLength={200}
            />
            <Text style={styles.charCount}>{title.length}/200</Text>
          </View>

          {/* Body */}
          <View style={styles.field}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ex: Profitez de -20% sur vos prochaines expéditions..."
              placeholderTextColor="#9CA3AF"
              value={body}
              onChangeText={setBody}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={styles.charCount}>{body.length}/500</Text>
          </View>

          {/* Preview */}
          {(title.trim() || body.trim()) && (
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>Aperçu</Text>
              <View style={styles.notificationPreview}>
                <View style={styles.previewIcon}>
                  <Ionicons name="notifications" size={16} color="#8B5CF6" />
                </View>
                <View style={styles.previewContent}>
                  <Text style={styles.previewTitle} numberOfLines={1}>
                    {title || "Titre de la notification"}
                  </Text>
                  <Text style={styles.previewBody} numberOfLines={2}>
                    {body || "Votre message ici"}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Target Segment */}
          <View style={styles.field}>
            <Text style={styles.label}>Destinataires</Text>
            {SEGMENT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.segmentOption,
                  segment === opt.value && styles.segmentOptionActive,
                ]}
                onPress={() => setSegment(opt.value)}
              >
                <View style={styles.segmentRadio}>
                  {segment === opt.value && (
                    <View style={styles.segmentRadioDot} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.segmentLabel,
                      segment === opt.value && styles.segmentLabelActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  <Text style={styles.segmentSublabel}>{opt.sublabel}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Schedule date */}
          {!saveAsDraft && (
            <View style={styles.field}>
              <Text style={styles.label}>Date et heure d'envoi</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={18} color="#8B5CF6" />
                <Text style={styles.dateText}>
                  {formatScheduledDate(scheduledDate)}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>
              <Text style={styles.hint}>
                Les notifications ne seront pas envoyées entre 22h et 8h.
              </Text>
            </View>
          )}

          {/* Draft / Schedule toggle */}
          <TouchableOpacity
            style={styles.draftToggle}
            onPress={() => setSaveAsDraft((v) => !v)}
          >
            <View
              style={[
                styles.checkbox,
                saveAsDraft && styles.checkboxActive,
              ]}
            >
              {saveAsDraft && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.draftLabel}>Enregistrer comme brouillon</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!isValid || isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name={saveAsDraft ? "save-outline" : "send-outline"}
                size={18}
                color="#fff"
              />
              <Text style={styles.submitBtnText}>
                {saveAsDraft ? "Enregistrer le brouillon" : "Planifier l'envoi"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Date picker */}
      <DatePickerModal
        locale="fr"
        mode="single"
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        date={scheduledDate}
        onConfirm={({ date }) => {
          if (date) {
            // Preserve time from current scheduledDate, just update the day
            const updated = new Date(scheduledDate);
            updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            setScheduledDate(updated);
          }
          setShowDatePicker(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CreateCampaignScreen;

// ── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: "#111827",
  },

  content: { padding: 16, gap: 20, paddingBottom: 40 },

  field: { gap: 8 },
  label: { fontFamily: Fonts.semibold, fontSize: 14, color: "#374151" },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#111827",
  },
  textArea: { minHeight: 100, textAlignVertical: "top", paddingTop: 12 },
  charCount: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "right",
  },

  previewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EDE9FE",
    gap: 10,
  },
  previewLabel: {
    fontFamily: Fonts.semibold,
    fontSize: 12,
    color: "#7C3AED",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  notificationPreview: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#F5F3FF",
    borderRadius: 10,
    padding: 12,
  },
  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },
  previewContent: { flex: 1 },
  previewTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: "#111827",
    marginBottom: 2,
  },
  previewBody: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 17,
  },

  segmentOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
  },
  segmentOptionActive: {
    borderColor: "#8B5CF6",
    backgroundColor: "#FAFAFE",
  },
  segmentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  segmentRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8B5CF6",
  },
  segmentLabel: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: "#374151",
  },
  segmentLabelActive: { color: "#7C3AED" },
  segmentSublabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  dateText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: "#374151",
  },
  hint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
  },

  draftToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { backgroundColor: "#8B5CF6", borderColor: "#8B5CF6" },
  draftLabel: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: "#374151",
  },

  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    paddingVertical: 14,
  },
  submitBtnDisabled: { backgroundColor: "#C4B5FD" },
  submitBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: "#fff" },
});
