import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface RouteNameInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

export const RouteNameInput: React.FC<RouteNameInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        Nom de la route <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder="Ex: Route Chine-Mali Maritime"
        style={styles.input}
        error={!!error}
        outlineColor={Theme.neutral[200]}
        activeOutlineColor={Theme.primary[500]}
        left={<TextInput.Icon icon="map-marker" />}
        onFocus={scrollToEnd}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  input: {
    backgroundColor: Theme.colors.background.card,
  },
});
