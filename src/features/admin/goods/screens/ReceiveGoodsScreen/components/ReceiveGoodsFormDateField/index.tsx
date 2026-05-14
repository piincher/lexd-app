/**
 * ReceiveGoodsFormDateField - Date picker field component
 * Pure UI for received date selection
 */

import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { DatePickerModal } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ReceiveGoodsFormDateFieldProps {
  control: any;
  setValue: any;
  error?: string;
}

export const ReceiveGoodsFormDateField: React.FC<ReceiveGoodsFormDateFieldProps> = ({
  control,
  setValue,
  error,
}) => {
  const { colors } = useAppTheme();

  return (
    <Controller
      control={control}
      name="receivedDate"
      render={({ field: { value } }) => {
        const [show, setShow] = useState(false);
        const displayDate = value
          ? new Date(value).toLocaleDateString('fr-FR')
          : null;
        return (
          <View>
            <Pressable
              onPress={() => setShow(true)}
              style={[styles.dateButton, { backgroundColor: colors.background.paper, borderColor: colors.border }]}
            >
              <MaterialCommunityIcons name="calendar" size={20} color={colors.status.success} />
              <Text style={[styles.dateButtonText, { color: colors.text.secondary }]}>
                {displayDate || 'Date de réception (optionnel)'}
              </Text>
              {value && (
                <Pressable
                  onPress={() => setValue('receivedDate', '')}
                  hitSlop={8}
                >
                  <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.disabled} />
                </Pressable>
              )}
            </Pressable>
            {error && (
              <Text style={[styles.dateError, { color: colors.status.error }]}>{error}</Text>
            )}
            <DatePickerModal
              locale="fr"
              mode="single"
              visible={show}
              onDismiss={() => setShow(false)}
              date={value ? new Date(value) : undefined}
              onConfirm={({ date }) => {
                setShow(false);
                if (date) {
                  setValue('receivedDate', date.toISOString(), {
                    shouldValidate: true,
                  });
                }
              }}
              validRange={{ endDate: new Date() }}
            />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    marginTop: 4,
    gap: 10,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 15,
  },
  dateError: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
