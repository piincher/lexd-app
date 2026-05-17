import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { styles } from './AuditFilterBar.styles';

interface AuditSearchInputProps {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: 'search' | 'done';
}

export const AuditSearchInput: React.FC<AuditSearchInputProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  autoCapitalize = 'none',
  returnKeyType = 'search',
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.search, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <MaterialCommunityIcons name={icon as any} size={18} color={colors.text.secondary} />
      <TextInput
        style={[styles.input, { color: colors.text.primary }]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
      />
    </View>
  );
};
