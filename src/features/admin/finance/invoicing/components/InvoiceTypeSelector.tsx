import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, useTheme } from 'react-native-paper';
import { InvoiceType, INVOICE_TYPE_LABELS, INVOICE_TYPE_COLORS } from '../types';

interface InvoiceTypeSelectorProps {
  value: InvoiceType | null;
  onSelect: (type: InvoiceType) => void;
  error?: boolean;
}

const invoiceTypes: InvoiceType[] = ['GOODS', 'SHIPPING', 'CUSTOMS', 'STORAGE', 'INSURANCE', 'OTHER'];

export const InvoiceTypeSelector: React.FC<InvoiceTypeSelectorProps> = ({
  value,
  onSelect,
  error,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const selectedLabel = value ? INVOICE_TYPE_LABELS[value] : 'Sélectionner un type';
  const selectedColor = value ? INVOICE_TYPE_COLORS[value] : undefined;

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => setVisible(true)}
          style={[styles.button, error && { borderColor: theme.colors.error }]}
          contentStyle={styles.buttonContent}
          icon={value ? 'tag' : 'tag-outline'}
          buttonColor={selectedColor ? `${selectedColor}15` : undefined}
          textColor={selectedColor || theme.colors.primary}
        >
          {selectedLabel}
        </Button>
      }
    >
      {invoiceTypes.map((type) => (
        <Menu.Item
          key={type}
          onPress={() => {
            onSelect(type);
            setVisible(false);
          }}
          title={INVOICE_TYPE_LABELS[type]}
          leadingIcon="tag"
          titleStyle={{ color: INVOICE_TYPE_COLORS[type] }}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
    justifyContent: 'flex-start',
  },
});
