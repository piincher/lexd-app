/**
 * Ticket Search Bar
 * Debounced search input for ticket list
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface TicketSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const TicketSearchBar: React.FC<TicketSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Rechercher une demande...',
}) => {
  const { colors } = useAppTheme();
  const [text, setText] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeText(text);
    }, 300);
    return () => clearTimeout(timer);
  }, [text, onChangeText]);

  const handleClear = useCallback(() => {
    setText('');
    onChangeText('');
  }, [onChangeText]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <Ionicons name="search" size={18} color={colors.text.secondary} />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.disabled}
        style={[styles.input, { color: colors.text.primary }]}
      />
      {text.length > 0 && (
        <Ionicons name="close-circle" size={20} color={colors.text.secondary} onPress={handleClear} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    height: 44,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 15,
    height: 44,
    paddingVertical: 0,
  },
});

export default TicketSearchBar;
