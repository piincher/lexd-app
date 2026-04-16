import React, { useState } from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { Input, Button } from "@src/shared/ui";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { CreateAnnouncementInput } from "../../types/announcement.types";
import { styles } from "./AnnouncementForm.styles";

interface AnnouncementFormProps {
  onSubmit: (data: CreateAnnouncementInput) => void;
  isLoading?: boolean;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { colors } = useAppTheme();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDismissDatePicker = () => setShowDatePicker(false);

  const handleConfirmDate = (params: { date: Date }) => {
    setExpiryDate(params.date);
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    onSubmit({
      title: title.trim(),
      message: message.trim(),
      link: link.trim() || undefined,
      isActive,
      publishDate: new Date().toISOString(),
      expirationDate: hasExpiry && expiryDate ? expiryDate.toISOString() : undefined,
    });
  };

  const isValid = title.trim().length > 0 && message.trim().length > 0;

  return (
    <View style={styles.container}>
      <Input
        label="Titre *"
        value={title}
        onChangeText={setTitle}
        fullWidth
      />

      <Input
        label="Message *"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        fullWidth
        inputStyle={{ height: 100 }}
      />

      <Input
        label="Lien (optionnel)"
        value={link}
        onChangeText={setLink}
        autoCapitalize="none"
        keyboardType="url"
        fullWidth
      />

      <View style={styles.toggleRow}>
        <Text style={{ color: colors.text.primary }}>Activer immédiatement</Text>
        <Switch value={isActive} onValueChange={setIsActive} />
      </View>

      <View style={styles.toggleRow}>
        <Text style={{ color: colors.text.primary }}>Définir une date d'expiration</Text>
        <Switch value={hasExpiry} onValueChange={setHasExpiry} />
      </View>

      {hasExpiry && (
        <Button
          title={expiryDate ? expiryDate.toLocaleDateString("fr-FR") : "Choisir une date"}
          variant="outline"
          onPress={() => setShowDatePicker(true)}
        />
      )}

      <DatePickerModal
        locale="fr"
        mode="single"
        visible={showDatePicker}
        onDismiss={handleDismissDatePicker}
        date={expiryDate}
        onConfirm={handleConfirmDate as any}
        saveLabel="OK"
        label="Date d'expiration"
      />

      <View style={styles.actions}>
        <Button
          title="Publier l'annonce"
          variant="primary"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!isValid || isLoading}
          fullWidth
        />
      </View>
    </View>
  );
};
