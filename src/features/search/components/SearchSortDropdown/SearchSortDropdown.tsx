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
import { Theme } from '@src/constants/Theme';
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
  const [visible, setVisible] = useState(false);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  const handleSelect = (option: SearchSortOption) => {
    onChange(option);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{selectedOption?.label}</Text>
        <Ionicons name="chevron-down" size={16} color={Theme.neutral.grey600} />
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
                        color={Theme.colors.primary.main}
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

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.neutral.grey100,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: Theme.neutral.grey700,
    marginRight: Theme.spacing.sm,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  dropdown: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    paddingVertical: Theme.spacing.sm,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  activeOption: {
    backgroundColor: Theme.colors.primary.light + '20',
  },
  optionText: {
    fontSize: 16,
    color: Theme.neutral.grey800,
  },
  activeOptionText: {
    fontWeight: '600',
    color: Theme.colors.primary.main,
  },
});
