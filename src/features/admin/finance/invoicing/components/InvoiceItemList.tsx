import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, IconButton, useTheme, Divider, Button } from 'react-native-paper';
import { InvoiceItem } from '../types';
import { formatCurrency } from '@src/shared/lib/currency';

interface InvoiceItemListProps {
  items: Partial<InvoiceItem>[];
  onChange: (items: Partial<InvoiceItem>[]) => void;
  editable?: boolean;
  currency?: string;
}

export const InvoiceItemList: React.FC<InvoiceItemListProps> = ({
  items,
  onChange,
  editable = true,
  currency = 'XOF',
}) => {
  const theme = useTheme();

  const addItem = () => {
    onChange([...items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };

    // Recalculate total
    const qty = field === 'quantity' ? Number(value) : (item.quantity || 0);
    const price = field === 'unitPrice' ? Number(value) : (item.unitPrice || 0);
    item.total = qty * price;

    newItems[index] = item;
    onChange(newItems);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.title}>
        Articles
      </Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={styles.descriptionCell}>
            {editable ? (
              <TextInput
                mode="outlined"
                label="Description"
                value={item.description}
                onChangeText={(text) => updateItem(index, 'description', text)}
                dense
                style={styles.descriptionInput}
              />
            ) : (
              <Text variant="bodyMedium" numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>

          <View style={styles.qtyCell}>
            {editable ? (
              <TextInput
                mode="outlined"
                label="Qté"
                value={String(item.quantity || '')}
                onChangeText={(text) => updateItem(index, 'quantity', text)}
                keyboardType="numeric"
                dense
                style={styles.numberInput}
              />
            ) : (
              <Text variant="bodyMedium" style={styles.numberText}>
                {item.quantity}
              </Text>
            )}
          </View>

          <View style={styles.priceCell}>
            {editable ? (
              <TextInput
                mode="outlined"
                label="Prix"
                value={String(item.unitPrice || '')}
                onChangeText={(text) => updateItem(index, 'unitPrice', text)}
                keyboardType="numeric"
                dense
                style={styles.numberInput}
              />
            ) : (
              <Text variant="bodyMedium" style={styles.numberText}>
                {formatCurrency(item.unitPrice || 0, currency)}
              </Text>
            )}
          </View>

          <View style={styles.totalCell}>
            <Text variant="bodyMedium" style={[styles.totalText, { color: theme.colors.primary }]}>
              {formatCurrency(item.total || 0, currency)}
            </Text>
          </View>

          {editable && items.length > 1 && (
            <IconButton
              icon="delete"
              size={20}
              iconColor={theme.colors.error}
              onPress={() => removeItem(index)}
              style={styles.deleteButton}
            />
          )}
        </View>
      ))}

      {editable && (
        <Button
          mode="outlined"
          onPress={addItem}
          icon="plus"
          style={styles.addButton}
        >
          Ajouter un article
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  descriptionCell: {
    flex: 3,
  },
  descriptionInput: {
    fontSize: 13,
  },
  qtyCell: {
    flex: 1,
    minWidth: 60,
  },
  priceCell: {
    flex: 1.5,
    minWidth: 80,
  },
  numberInput: {
    fontSize: 13,
  },
  numberText: {
    textAlign: 'right',
  },
  totalCell: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  totalText: {
    fontWeight: '600',
  },
  deleteButton: {
    margin: 0,
  },
  addButton: {
    marginTop: 8,
  },
});
