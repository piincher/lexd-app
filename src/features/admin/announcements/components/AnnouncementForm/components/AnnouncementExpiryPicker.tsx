import React from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { Button } from "@src/shared/ui/Button";

interface Props {
  hasExpiry: boolean;
  expiryDate: Date | undefined;
  showDatePicker: boolean;
  onShowDatePicker: () => void;
  onDismissDatePicker: () => void;
  onConfirmDate: (params: { date: Date }) => void;
}

export const AnnouncementExpiryPicker: React.FC<Props> = ({
  hasExpiry,
  expiryDate,
  showDatePicker,
  onShowDatePicker,
  onDismissDatePicker,
  onConfirmDate,
}) => (
  <>
    {hasExpiry && (
      <Button
        title={expiryDate ? expiryDate.toLocaleDateString("fr-FR") : "Choisir une date"}
        variant="outline"
        onPress={onShowDatePicker}
      />
    )}

    <DatePickerModal
      locale="fr"
      mode="single"
      visible={showDatePicker}
      onDismiss={onDismissDatePicker}
      date={expiryDate}
      onConfirm={onConfirmDate as never}
      saveLabel="OK"
      label="Date d'expiration"
    />
  </>
);
