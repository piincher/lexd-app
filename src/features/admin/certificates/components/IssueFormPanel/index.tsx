import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CertificateUser } from "../../api";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { getStyles } from "./IssueFormPanel.styles";

interface IssueFormPanelProps {
  selectedUser: CertificateUser;
  customNote: string;
  onCustomNoteChange: (note: string) => void;
  onIssue: () => void;
  isIssuing: boolean;
}

export const IssueFormPanel: React.FC<IssueFormPanelProps> = ({
  selectedUser,
  customNote,
  onCustomNoteChange,
  onIssue,
  isIssuing,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.panel}>
      <View style={styles.selectedInfo}>
        <MaterialIcons name="verified" size={20} color={colors.primary.main} />
        <Text style={styles.selectedName}>
          {selectedUser.firstName} {selectedUser.lastName}
        </Text>
      </View>

      <TextInput
        style={styles.noteInput}
        placeholder="Note personnalisée (optionnel)"
        placeholderTextColor={colors.text.muted}
        value={customNote}
        onChangeText={onCustomNoteChange}
        maxLength={500}
        multiline
        numberOfLines={2}
      />

      <TouchableOpacity
        style={[styles.issueButton, isIssuing && styles.disabled]}
        onPress={onIssue}
        disabled={isIssuing}
        activeOpacity={0.7}
      >
        {isIssuing ? (
          <ActivityIndicator size="small" color={colors.text.inverse} />
        ) : (
          <>
            <MaterialIcons name="card-membership" size={20} color={colors.text.inverse} />
            <Text style={styles.issueButtonText}>Émettre le certificat</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
