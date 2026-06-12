import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Booking Reference (Optional)</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter booking reference"
        mode="outlined"
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary[500]}
        onFocus={onInputFocus}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: colors.background.card,
  },
});
