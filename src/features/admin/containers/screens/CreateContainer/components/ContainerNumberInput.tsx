import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ContainerNumberInputProps {
  value: string;
  error?: string;
  onChangeText: (text: string) => void;
  onInputFocus?: () => void;
}

export const ContainerNumberInput: React.FC<ContainerNumberInputProps> = ({
  value,
  error,
  onChangeText,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Container Number</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter container number"
        mode="outlined"
        style={styles.input}
        error={!!error}
        autoCapitalize="characters"
        onFocus={onInputFocus}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: colors.background.card,
  },
});
