import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './OutstandingPaymentsSearch.styles';

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
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={Theme.colors.text.muted} />
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
            <Ionicons name="close-circle" size={18} color={Theme.colors.text.muted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
