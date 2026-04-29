import React from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { styles } from "../AnnouncementForm.styles";

interface Props {
  dismissible: boolean;
  requiresAck: boolean;
  hasExpiry: boolean;
  onDismissibleChange: (value: boolean) => void;
  onRequiresAckChange: (value: boolean) => void;
  onHasExpiryChange: (value: boolean) => void;
}

export const AnnouncementFormToggles: React.FC<Props> = ({
  dismissible,
  requiresAck,
  hasExpiry,
  onDismissibleChange,
  onRequiresAckChange,
  onHasExpiryChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <>
      <View style={styles.toggleRow}>
        <Text style={[styles.toggleText, { color: colors.text.primary }]}>
          {"Masquable par l'utilisateur"}
        </Text>
        <Switch
          value={dismissible}
          onValueChange={onDismissibleChange}
          disabled={requiresAck}
        />
      </View>

      <View style={styles.toggleRow}>
        <Text style={[styles.toggleText, { color: colors.text.primary }]}>
          {"Demander l'accord explicite"}
        </Text>
        <Switch value={requiresAck} onValueChange={onRequiresAckChange} />
      </View>

      <View style={styles.toggleRow}>
        <Text style={[styles.toggleText, { color: colors.text.primary }]}>
          {"Définir une date d'expiration"}
        </Text>
        <Switch value={hasExpiry} onValueChange={onHasExpiryChange} />
      </View>
    </>
  );
};
