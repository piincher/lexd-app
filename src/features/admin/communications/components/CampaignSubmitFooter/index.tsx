import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./CampaignSubmitFooter.styles";

interface CampaignSubmitFooterProps {
  saveAsDraft: boolean;
  isValid: boolean;
  isPending: boolean;
  showDatePicker: boolean;
  scheduledDate: Date;
  onSubmit: () => void;
  onDismissDatePicker: () => void;
  onDateConfirm: ({ date }: { date?: Date }) => void;
}

export const CampaignSubmitFooter: React.FC<CampaignSubmitFooterProps> = ({
  saveAsDraft,
  isValid,
  isPending,
  showDatePicker,
  scheduledDate,
  onSubmit,
  onDismissDatePicker,
  onDateConfirm,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
          onPress={onSubmit}
          disabled={!isValid || isPending}
        >
          {isPending ? (
            <ActivityIndicator color={colors.text.inverse} />
          ) : (
            <>
              <Ionicons
                name={saveAsDraft ? "save-outline" : "send-outline"}
                size={18}
                color={colors.text.inverse}
              />
              <Text style={styles.submitBtnText}>
                {saveAsDraft ? "Enregistrer le brouillon" : "Planifier l'envoi"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <DatePickerModal
        locale="fr"
        mode="single"
        visible={showDatePicker}
        onDismiss={onDismissDatePicker}
        date={scheduledDate}
        onConfirm={onDateConfirm}
      />
    </>
  );
};
