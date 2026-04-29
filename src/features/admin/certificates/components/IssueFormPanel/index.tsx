import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CertificateUser } from "../../api";
import { Theme } from "@src/constants/Theme";
import { styles } from "./IssueFormPanel.styles";

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
  return (
    <View style={styles.panel}>
      <View style={styles.selectedInfo}>
        <MaterialIcons name="verified" size={20} color="#d4a843" />
        <Text style={styles.selectedName}>
          {selectedUser.firstName} {selectedUser.lastName}
        </Text>
      </View>

      <TextInput
        style={styles.noteInput}
        placeholder="Note personnalisée (optionnel)"
        placeholderTextColor={Theme.colors.text.muted}
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
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <>
            <MaterialIcons name="card-membership" size={20} color="#FFF" />
            <Text style={styles.issueButtonText}>Émettre le certificat</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
