import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { Button } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface Props {
  label: string;
  value?: string | null;
  onChange: (isoDate: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
}

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

export const EventDateField: React.FC<Props> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  disabled,
}) => {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);

  const selectedDate = value ? new Date(value) : undefined;
  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString('fr-FR')
    : 'Choisir une date';

  const handleConfirm = ({ date }: { date: Date }) => {
    setVisible(false);
    onChange(toIsoDate(date));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.secondary }]}>{label}</Text>
      <Button
        title={displayValue}
        variant="outline"
        onPress={() => setVisible(true)}
        disabled={disabled}
      />
      <DatePickerModal
        locale="fr"
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={selectedDate}
        onConfirm={handleConfirm as never}
        saveLabel="OK"
        label={label}
        validRange={{
          startDate: minimumDate,
          endDate: maximumDate,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
});
