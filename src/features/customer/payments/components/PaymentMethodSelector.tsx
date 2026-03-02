/**
 * Payment Method Selector Component
 * Radio button group for selecting payment method with logos
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, RadioButton, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaymentMethod, PAYMENT_METHODS } from '../types';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  disabled?: boolean;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
  disabled = false,
}) => {
  const theme = useTheme();

  const getPaymentIcon = (
    methodId: PaymentMethod
  ): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    switch (methodId) {
      case 'ORANGE_MONEY':
        return 'cellphone';
      case 'WAVE':
        return 'wave';
      case 'CARD':
        return 'credit-card';
      default:
        return 'cash';
    }
  };

  const renderPaymentMethod = (method: typeof PAYMENT_METHODS[0]) => {
    const isSelected = selectedMethod === method.id;
    const iconName = getPaymentIcon(method.id);

    return (
      <TouchableOpacity
        key={method.id}
        onPress={() => !disabled && onSelect(method.id)}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
      >
        <Card
          style={[
            styles.methodCard,
            isSelected && {
              borderColor: method.color,
              borderWidth: 2,
              backgroundColor: `${method.color}10`,
            },
            disabled && styles.disabledCard,
          ]}
        >
          <Card.Content style={styles.methodContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: method.color },
              ]}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>{method.label}</Text>
              {method.requiresPhone && (
                <Text style={styles.methodHint}>
                  Nécessite un numéro de téléphone
                </Text>
              )}
            </View>

            <RadioButton
              value={method.id}
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={() => onSelect(method.id)}
              disabled={disabled}
              color={method.color}
            />
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Méthode de paiement</Text>
      <View style={styles.methodsList}>
        {PAYMENT_METHODS.map(renderPaymentMethod)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  methodsList: {
    gap: Theme.spacing.md,
  },
  methodCard: {
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    elevation: 1,
  },
  disabledCard: {
    opacity: 0.6,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  methodHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
});

export default PaymentMethodSelector;
