import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SearchSortOption } from '../../types';

interface SearchSortDropdownProps {
  value: SearchSortOption;
  onChange: (value: SearchSortOption) => void;
}

const SORT_OPTIONS: { value: SearchSortOption; label: string }[] = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'date_desc', label: 'Plus récent' },
  { value: 'date_asc', label: 'Plus ancien' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
];

export const SearchSortDropdown: React.FC<SearchSortDropdownProps> = ({
  value,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  const handleSelect = (option: SearchSortOption) => {
    onChange(option);
    setVisible(false);
  };

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: colors.neutral[100],
          borderRadius: 8,
        },
        buttonText: {
          fontSize: 14,
          color: colors.neutral[700],
          marginRight: 8,
        },
        overlay: {
          flex: 1,
          backgroundColor: colors.background.overlay,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        },
        dropdown: {
          backgroundColor: colors.background.card,
          borderRadius: 12,
          width: '80%',
          maxWidth: 300,
          paddingVertical: 8,
        },
        option: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 12,
        },
        activeOption: {
          backgroundColor: colors.primary.light + '20',
        },
        optionText: {
          fontSize: 16,
          color: colors.neutral[800],
        },
        activeOptionText: {
          fontWeight: '600',
          color: colors.primary.main,
        },
      }),
    [colors]
  );

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{selectedOption?.label}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.neutral[600]} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdown}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      value === option.value && styles.activeOption,
                    ]}
                    onPress={() => handleSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        value === option.value && styles.activeOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {value === option.value && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.primary.main}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
