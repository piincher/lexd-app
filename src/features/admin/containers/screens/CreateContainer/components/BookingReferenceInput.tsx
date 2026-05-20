import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface BookingReferenceInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onInputFocus?: () => void;
}

export const BookingReferenceInput: React.FC<BookingReferenceInputProps> = ({
  value,
  onChangeText,
  onInputFocus,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Booking Reference (Optional)</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter booking reference"
        mode="outlined"
        style={styles.input}
        outlineColor={Theme.neutral[300]}
        activeOutlineColor={Theme.primary[500]}
        onFocus={onInputFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Theme.colors.background.card,
  },
});
