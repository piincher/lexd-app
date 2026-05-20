import React from "react";
import { View } from "react-native";
import { Text, Checkbox, RadioButton, TextInput } from "react-native-paper";

import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ExportDataModal.styles";

interface EmailSectionProps {
  sendEmail: boolean;
  onToggle: () => void;
  email: string;
  onEmailChange: (email: string) => void;
  emailMethod: "LINK" | "ATTACHMENT";
  onMethodChange: (method: "LINK" | "ATTACHMENT") => void;
  onInputFocus?: () => void;
}

export const EmailSection: React.FC<EmailSectionProps> = ({
  sendEmail,
  onToggle,
  email,
  onEmailChange,
  emailMethod,
  onMethodChange,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <View style={styles.checkboxRow}>
        <Checkbox
          status={sendEmail ? "checked" : "unchecked"}
          onPress={onToggle}
        />
        <Text variant="bodyMedium">Send export by email</Text>
      </View>

      {sendEmail && (
        <View style={styles.emailSection}>
          <TextInput
            mode="outlined"
            label="Email Address"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onFocus={onInputFocus}
          />
          <RadioButton.Group
            onValueChange={(value) => onMethodChange(value as "LINK" | "ATTACHMENT")}
            value={emailMethod}
          >
            <RadioButton.Item
              label="Send download link"
              value="LINK"
              position="leading"
            />
            <RadioButton.Item
              label="Attach file to email"
              value="ATTACHMENT"
              position="leading"
            />
          </RadioButton.Group>
        </View>
      )}
    </>
  );
};
