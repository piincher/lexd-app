/**
 * GoodsListSearch - Search bar with glass effect
 * SRP: Search input with clear button
 */

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const GoodsListSearch: React.FC<GoodsListSearchProps> = ({ 
  value, 
  onChangeText, 
  onClear 
}) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.wrapper}>
    <LinearGradient colors={[colors.background.card, colors.background.paper]} style={styles.container}>
      <Ionicons name="search" size={20} color={colors.primary.light} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher une marchandise..."
        placeholderTextColor={colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={22} color={colors.text.secondary} />
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  </View>
);}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Theme.spacing.xl,
    marginTop: -Theme.spacing.lg,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.xl,
    paddingHorizontal: Theme.spacing.lg,
    height: 56,
    ...Theme.shadows.md,
  },
  icon: {
    marginRight: Theme.spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Theme.colors.text.primary,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});
