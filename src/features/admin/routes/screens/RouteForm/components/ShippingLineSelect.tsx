import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ShippingLine, SHIPPING_LINE_LABELS } from '@src/features/admin/routes/types';

interface ShippingLineSelectProps {
  value: ShippingLine | '';
  onSelect: (line: ShippingLine) => void;
  error?: string;
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  availableLines: ShippingLine[];
}

export const ShippingLineSelect: React.FC<ShippingLineSelectProps> = ({
  value,
  onSelect,
  error,
  menuVisible,
  setMenuVisible,
  availableLines,
}) => {
  if (availableLines.length === 0) return null;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        Compagnie maritime <Text style={styles.required}>*</Text>
      </Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              error && styles.dropdownButtonError,
            ]}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.dropdownButtonContent}>
              <Ionicons
                name="business"
                size={20}
                color={value ? Theme.primary[500] : Theme.neutral[400]}
              />
              <Text
                style={[
                  styles.dropdownButtonText,
                  !value && styles.dropdownButtonPlaceholder,
                ]}
              >
                {value
                  ? SHIPPING_LINE_LABELS[value as ShippingLine]
                  : 'Sélectionner une compagnie'}
              </Text>
            </View>
            <Ionicons
              name={menuVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={Theme.neutral[400]}
            />
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
      >
        {availableLines.map((line) => (
          <Menu.Item
            key={line}
            onPress={() => onSelect(line)}
            title={SHIPPING_LINE_LABELS[line]}
            leadingIcon={value === line ? 'check' : undefined}
            titleStyle={
              value === line
                ? { color: Theme.primary[600], fontWeight: '600' }
                : undefined
            }
          />
        ))}
      </Menu>
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
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
  },
  dropdownButtonError: {
    borderColor: Theme.status.error,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[800],
    flex: 1,
  },
  dropdownButtonPlaceholder: {
    color: Theme.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
    width: '85%',
  },
});
