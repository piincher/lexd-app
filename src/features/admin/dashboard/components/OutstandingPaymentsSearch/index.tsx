import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OutstandingPaymentsSearch.styles';

interface OutstandingPaymentsSearchProps {
  localSearch: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export const OutstandingPaymentsSearch: React.FC<OutstandingPaymentsSearchProps> = ({
  localSearch,
  onChangeText,
  onSubmit,
  onClear,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.text.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un client ou ID..."
          value={localSearch}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />
        {localSearch.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close-circle" size={18} color={colors.text.muted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
