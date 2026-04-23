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
import { NotificationBell } from "@src/features/notifications";

import { Fonts } from "@src/constants/Fonts";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCreateCampaign } from "../hooks/useCampaigns";
import { useGetAllContainers } from "../../containers/hooks/useContainers";
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
  {
    label: "Clients d'un conteneur",
    sublabel: "Envoyer aux clients avec marchandises dans un conteneur",
    value: "container_customers",
  },
];

// ── Screen ────────────────────────────────────────────────────────────────

const CreateCampaignScreen = ({
  navigation,
}: RootStackScreenProps<"CreateCampaign">) => {
  const { colors, isDark } = useAppTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState<TargetSegment>("all");
  const [scheduledDate, setScheduledDate] = useState<Date>(
    new Date(Date.now() + 60 * 60 * 1000) // default: 1 hour from now
  );
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);

  const { mutate: createCampaign, isPending } = useCreateCampaign();
  const { data: containersData, isLoading: isLoadingContainers } = useGetAllContainers();

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
    if (segment === "container_customers" && !selectedContainerId) {
      showMessage({ message: "Veuillez sélectionner un conteneur", type: "warning" });
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
        containerId: selectedContainerId || undefined,
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

  const isValid =
    title.trim().length > 0 &&
    body.trim().length > 0 &&
    (segment !== "container_customers" || !!selectedContainerId);

  const dynamicStyles = createStyles(colors, isDark);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>Nouvelle campagne</Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={colors.text.primary}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={dynamicStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View style={dynamicStyles.field}>
            <Text style={dynamicStyles.label}>Titre de la notification</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Ex: Offre spéciale ce week-end !"
              placeholderTextColor={colors.text.disabled}
              value={title}
              onChangeText={setTitle}
              maxLength={200}
            />
            <Text style={dynamicStyles.charCount}>{title.length}/200</Text>
          </View>

          {/* Body */}
          <View style={dynamicStyles.field}>
            <Text style={dynamicStyles.label}>Message</Text>
            <TextInput
              style={[dynamicStyles.input, dynamicStyles.textArea]}
              placeholder="Ex: Profitez de -20% sur vos prochaines expéditions..."
              placeholderTextColor={colors.text.disabled}
              value={body}
              onChangeText={setBody}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={dynamicStyles.charCount}>{body.length}/500</Text>
          </View>

          {/* Preview */}
          {(title.trim() || body.trim()) && (
            <View style={dynamicStyles.previewBox}>
              <Text style={dynamicStyles.previewLabel}>Aperçu</Text>
              <View style={dynamicStyles.notificationPreview}>
                <View style={dynamicStyles.previewIcon}>
                  <Ionicons name="notifications" size={16} color="#8B5CF6" />
                </View>
                <View style={dynamicStyles.previewContent}>
                  <Text style={dynamicStyles.previewTitle} numberOfLines={1}>
                    {title || "Titre de la notification"}
                  </Text>
                  <Text style={dynamicStyles.previewBody} numberOfLines={2}>
                    {body || "Votre message ici"}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Target Segment */}
          <View style={dynamicStyles.field}>
            <Text style={dynamicStyles.label}>Destinataires</Text>
            {SEGMENT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  dynamicStyles.segmentOption,
                  segment === opt.value && dynamicStyles.segmentOptionActive,
                ]}
                onPress={() => {
                  setSegment(opt.value);
                  if (opt.value !== "container_customers") {
                    setSelectedContainerId(null);
                  }
                }}
              >
                <View style={dynamicStyles.segmentRadio}>
                  {segment === opt.value && (
                    <View style={dynamicStyles.segmentRadioDot} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      dynamicStyles.segmentLabel,
                      segment === opt.value && dynamicStyles.segmentLabelActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  <Text style={dynamicStyles.segmentSublabel}>{opt.sublabel}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Container Picker */}
          {segment === "container_customers" && (
            <View style={dynamicStyles.field}>
              <Text style={dynamicStyles.label}>Conteneur cible</Text>
              {isLoadingContainers ? (
                <ActivityIndicator size="small" color={colors.primary.main} />
              ) : (
                <View style={dynamicStyles.containerList}>
                  {(containersData?.data?.containers || containersData?.data || []).map(
                    (container: any) => {
                      const isSelected = selectedContainerId === container._id;
                      return (
                        <TouchableOpacity
                          key={container._id}
                          style={[
                            dynamicStyles.containerItem,
                            isSelected && dynamicStyles.containerItemActive,
                          ]}
                          onPress={() => setSelectedContainerId(container._id)}
                        >
                          <Ionicons
                            name={isSelected ? "radio-button-on" : "radio-button-off"}
                            size={18}
                            color={isSelected ? colors.primary.main : colors.text.disabled}
                          />
                          <View style={{ flex: 1 }}>
                            <Text
                              style={[
                                dynamicStyles.containerItemText,
                                isSelected && dynamicStyles.containerItemTextActive,
                              ]}
                            >
                              {container.virtualContainerNumber || container.containerNumber}
                            </Text>
                            <Text style={dynamicStyles.containerItemSubtext}>
                              {container.shippingMode} · {container.status}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  )}
                </View>
              )}
            </View>
          )}

          {/* Schedule date */}
          {!saveAsDraft && (
            <View style={dynamicStyles.field}>
              <Text style={dynamicStyles.label}>Date et heure d'envoi</Text>
              <TouchableOpacity
                style={dynamicStyles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={18} color={colors.primary.main} />
                <Text style={dynamicStyles.dateText}>
                  {formatScheduledDate(scheduledDate)}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.text.disabled} />
              </TouchableOpacity>
              <Text style={dynamicStyles.hint}>
                Les notifications ne seront pas envoyées entre 22h et 8h.
              </Text>
            </View>
          )}

          {/* Draft / Schedule toggle */}
          <TouchableOpacity
            style={dynamicStyles.draftToggle}
            onPress={() => setSaveAsDraft((v) => !v)}
          >
            <View
              style={[
                dynamicStyles.checkbox,
                saveAsDraft && dynamicStyles.checkboxActive,
              ]}
            >
              {saveAsDraft && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={dynamicStyles.draftLabel}>Enregistrer comme brouillon</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit */}
      <View style={dynamicStyles.footer}>
        <TouchableOpacity
          style={[dynamicStyles.submitBtn, !isValid && dynamicStyles.submitBtnDisabled]}
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
              <Text style={dynamicStyles.submitBtnText}>
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

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.default },

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
    },

    content: { padding: 16, gap: 20, paddingBottom: 40 },

    field: { gap: 8 },
    label: { fontFamily: Fonts.semiBold, fontSize: 14, color: colors.text.secondary },

    input: {
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
    textArea: { minHeight: 100, textAlignVertical: "top", paddingTop: 12 },
    charCount: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.disabled,
      textAlign: "right",
    },

    previewBox: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: isDark ? "#4C1D95" : "#EDE9FE",
      gap: 10,
    },
    previewLabel: {
      fontFamily: Fonts.semiBold,
      fontSize: 12,
      color: isDark ? "#C4B5FD" : "#7C3AED",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    notificationPreview: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: isDark ? "#2E1065" : "#F5F3FF",
      borderRadius: 10,
      padding: 12,
    },
    previewIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: isDark ? "#4C1D95" : "#EDE9FE",
      alignItems: "center",
      justifyContent: "center",
    },
    previewContent: { flex: 1 },
    previewTitle: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
      marginBottom: 2,
    },
    previewBody: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      lineHeight: 17,
    },

    segmentOption: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 14,
    },
    segmentOptionActive: {
      borderColor: "#8B5CF6",
      backgroundColor: isDark ? "#2E1065" : "#FAFAFE",
    },
    segmentRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.text.disabled,
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
      color: colors.text.secondary,
    },
    segmentLabelActive: { color: isDark ? "#C4B5FD" : "#7C3AED" },
    segmentSublabel: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 2,
    },

    dateInput: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 13,
    },
    dateText: {
      flex: 1,
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    hint: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
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
      borderColor: colors.text.disabled,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxActive: { backgroundColor: "#8B5CF6", borderColor: "#8B5CF6" },
    draftLabel: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },

    footer: {
      padding: 16,
      backgroundColor: colors.background.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
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

    containerList: { gap: 8 },
    containerItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    containerItemActive: {
      borderColor: "#8B5CF6",
      backgroundColor: isDark ? "#2E1065" : "#FAFAFE",
    },
    containerItemText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    containerItemTextActive: {
      color: isDark ? "#C4B5FD" : "#7C3AED",
    },
    containerItemSubtext: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 2,
    },
  });
