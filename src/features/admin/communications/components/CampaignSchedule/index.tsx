import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./CampaignSchedule.styles";

interface CampaignScheduleProps {
  scheduledDate: Date;
  saveAsDraft: boolean;
  onToggleDraft: () => void;
  onShowDatePicker: () => void;
}

const formatScheduledDate = (date: Date) =>
  date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const CampaignSchedule: React.FC<CampaignScheduleProps> = ({
  scheduledDate,
  saveAsDraft,
  onToggleDraft,
  onShowDatePicker,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      {!saveAsDraft && (
        <View style={styles.field}>
          <Text style={styles.label}>Date et heure d'envoi</Text>
          <TouchableOpacity style={styles.dateInput} onPress={onShowDatePicker}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary.main} />
            <Text style={styles.dateText}>{formatScheduledDate(scheduledDate)}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.text.disabled} />
          </TouchableOpacity>
          <Text style={styles.hint}>
            Les notifications ne seront pas envoyées entre 22h et 8h.
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.draftToggle} onPress={onToggleDraft}>
        <View style={[styles.checkbox, saveAsDraft && styles.checkboxActive]}>
          {saveAsDraft && <Ionicons name="checkmark" size={14} color="#fff" />}
        </View>
        <Text style={styles.draftLabel}>Enregistrer comme brouillon</Text>
      </TouchableOpacity>
    </>
  );
};
