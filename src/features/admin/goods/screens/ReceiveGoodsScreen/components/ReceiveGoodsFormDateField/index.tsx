/**
 * ReceiveGoodsFormDateField - Date picker field component
 * Pure UI for received date selection
 */

import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { DatePickerModal } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

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
              style={styles.dateButton}
            >
              <MaterialCommunityIcons name="calendar" size={20} color="#22C55E" />
              <Text style={styles.dateButtonText}>
                {displayDate || 'Date de réception (optionnel)'}
              </Text>
              {value && (
                <Pressable
                  onPress={() => setValue('receivedDate', '')}
                  hitSlop={8}
                >
                  <MaterialCommunityIcons name="close-circle" size={18} color={Theme.colors.text.muted} />
                </Pressable>
              )}
            </Pressable>
            {error && (
              <Text style={styles.dateError}>{error}</Text>
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
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(0,0,0,0.06)',
  },
  dateButtonText: {
    flex: 1,
    fontSize: 15,
    color: Theme.colors.text.secondary,
  },
  dateError: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});
