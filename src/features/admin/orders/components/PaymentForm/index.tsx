import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, RadioButton, Surface, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPaymentFormStyles } from './PaymentForm.styles';

const PAYMENT_METHODS = [
  { key: 'CASH', label: 'Cash', icon: 'cash' },
  { key: 'BANK_TRANSFER', label: 'Bank Transfer', icon: 'bank' },
  { key: 'MOBILE_MONEY', label: 'Mobile Money', icon: 'cellphone' },
  { key: 'ORANGE_MONEY', label: 'Orange Money', icon: 'cellphone' },
  { key: 'WAVE', label: 'Wave', icon: 'wave' },
];

interface PaymentFormProps {
  amount: string;
  onAmountChange: (value: string) => void;
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  referenceNumber: string;
  onReferenceNumberChange: (value: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  errors: Record<string, string>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onAmountChange,
  paymentMethod,
  onPaymentMethodChange,
  referenceNumber,
  onReferenceNumberChange,
  notes,
  onNotesChange,
  errors,
}) => {
  const { colors } = useAppTheme();
  const styles = createPaymentFormStyles(colors);

  return (
    <Surface style={styles.formCard}>
      <Text style={styles.sectionTitle}>Payment Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount Received (FCFA) *</Text>
        <TextInput
          mode="outlined"
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="numeric"
          placeholder="Enter amount"
          error={!!errors.amount}
        />
        {errors.amount && (
          <HelperText type="error">{errors.amount}</HelperText>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payment Method *</Text>
        <RadioButton.Group onValueChange={onPaymentMethodChange} value={paymentMethod}>
          {PAYMENT_METHODS.map((method) => (
            <View key={method.key} style={styles.radioItem}>
              <MaterialCommunityIcons
                name={method.icon as any}
                size={20}
                color={colors.text.secondary}
                style={styles.radioIcon}
              />
              <RadioButton.Item
                label={method.label}
                value={method.key}
                style={styles.radioButton}
              />
            </View>
          ))}
        </RadioButton.Group>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reference Number (Optional)</Text>
        <TextInput
          mode="outlined"
          value={referenceNumber}
          onChangeText={onReferenceNumberChange}
          placeholder="e.g., Bank transfer reference or MOMO ID"
        />
        <HelperText type="info">
          Transaction ID for bank transfers or mobile money
        </HelperText>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          mode="outlined"
          value={notes}
          onChangeText={onNotesChange}
          placeholder="Any additional notes..."
          multiline
          numberOfLines={3}
        />
      </View>
    </Surface>
  );
};

export default PaymentForm;
