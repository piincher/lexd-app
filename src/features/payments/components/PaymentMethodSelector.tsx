import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { usePaymentProviders } from '../hooks/usePayments';
import type { PaymentProvider, PaymentMethodSelectorProps } from '../types';

// Use icons instead of images since assets don't exist
const PROVIDER_ICONS: Record<PaymentProvider, { name: string; color: string; bgColor: string }> = {
  ORANGE_MONEY: { name: 'cellphone', color: '#FF6600', bgColor: '#FFF3E0' },
  WAVE: { name: 'wave', color: '#1E88E5', bgColor: '#E3F2FD' },
  STRIPE: { name: 'credit-card', color: '#635BFF', bgColor: '#EDE7F6' },
  CARD: { name: 'credit-card', color: '#4CAF50', bgColor: '#E8F5E9' },
};

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
  amount,
  disabled = false,
  showFees = true,
}) => {
  const { colors } = useAppTheme();
  const { data, isLoading, error } = usePaymentProviders();
  const providers = data?.providers ?? [];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 16,
        },
        loadingContainer: {
          padding: 40,
          alignItems: 'center',
        },
        loadingText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        errorContainer: {
          padding: 40,
          alignItems: 'center',
        },
        errorText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.status.error,
          textAlign: 'center',
        },
        amountBanner: {
          backgroundColor: colors.primary.main + '10',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          alignItems: 'center',
        },
        amountLabel: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        amountValue: {
          fontSize: 24,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
          marginTop: 4,
        },
        methodsList: {
          gap: 12,
        },
        methodCard: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.default,
          borderRadius: 12,
          padding: 16,
          borderWidth: 2,
          borderColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        },
        methodCardSelected: {
          borderColor: colors.primary.main,
          backgroundColor: colors.primary.main + '08',
        },
        methodCardError: {
          borderColor: colors.status.error,
        },
        methodCardDisabled: {
          opacity: 0.5,
        },
        methodIconContainer: {
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        methodInfo: {
          flex: 1,
        },
        methodName: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        methodDescription: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginTop: 2,
        },
        feeText: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          color: colors.accent.goldDark,
          marginTop: 4,
        },
        methodRight: {
          marginLeft: 12,
        },
        selectedIndicator: {
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
        },
        unselectedIndicator: {
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.neutral[200],
        },
        feeBreakdown: {
          marginTop: 24,
          padding: 16,
          backgroundColor: colors.background.default,
          borderRadius: 12,
        },
        feeBreakdownTitle: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 12,
        },
        feeRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        },
        feeLabel: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        feeValue: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        totalRow: {
          marginTop: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.neutral[200],
        },
        totalLabel: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        totalValue: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
        },
      }),
    [colors]
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ShimmerBlock width={180} height={20} borderRadius={4} />
        <View style={{ marginTop: 16, gap: 12 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} style={[styles.methodCard, { borderColor: 'transparent' }]}>
              <ShimmerBlock width={48} height={48} borderRadius={24} />
              <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
                <ShimmerBlock width={120} height={16} borderRadius={3} />
                <ShimmerBlock width={'70%'} height={12} borderRadius={3} />
              </View>
              <ShimmerBlock width={24} height={24} borderRadius={12} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={32} color={colors.status.error} />
        <Text style={styles.errorText}>
          Failed to load payment methods. Please try again.
        </Text>
      </View>
    );
  }

  /**
   * Fee breakdown component
   */
  interface FeeBreakdownProps {
    provider: PaymentProvider;
    amount: number;
  }

  const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ provider, amount }) => {
    const { data } = usePaymentProviders();
    const providerInfo = data?.providers?.find(p => p.code === provider);
    
    if (!providerInfo?.feeExample) return null;

    const fee = providerInfo.feeExample;

    return (
      <View style={styles.feeBreakdown}>
        <Text style={styles.feeBreakdownTitle}>Fee Breakdown</Text>
        
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Subtotal</Text>
          <Text style={styles.feeValue}>{fee.amountFCFA.toLocaleString()} FCFA</Text>
        </View>
        
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>
            Processing Fee ({providerInfo.feeExample.feePercentage})
          </Text>
          <Text style={styles.feeValue}>
            {fee.totalFeeFCFA.toLocaleString()} FCFA
          </Text>
        </View>
        
        <View style={[styles.feeRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {(fee.amountFCFA + fee.totalFeeFCFA).toLocaleString()} FCFA
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      
      {amount && showFees && (
        <View style={styles.amountBanner}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>
            {amount.toLocaleString()} FCFA
          </Text>
        </View>
      )}

      <View style={styles.methodsList}>
        {providers.map((provider) => {
          const isSelected = selectedMethod === provider.code;
          const hasError = false;
          const iconConfig = PROVIDER_ICONS[provider.code as PaymentProvider] || PROVIDER_ICONS.CARD;

          return (
            <TouchableOpacity
              key={provider.code}
              style={[
                styles.methodCard,
                isSelected && styles.methodCardSelected,
                hasError && styles.methodCardError,
                disabled && styles.methodCardDisabled,
              ]}
              onPress={() => !disabled && onSelect(provider.code as PaymentProvider)}
              activeOpacity={disabled ? 1 : 0.7}
            >
              <View style={[styles.methodIconContainer, { backgroundColor: iconConfig.bgColor }]}>
                <MaterialCommunityIcons
                  name={iconConfig.name as any}
                  size={28}
                  color={iconConfig.color}
                />
              </View>

              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{provider.name}</Text>
                <Text style={styles.methodDescription}>
                  {getProviderDescription(provider.code as PaymentProvider)}
                </Text>
                
                {showFees && provider.processingFee > 0 && (
                  <Text style={styles.feeText}>
                    Fee: {(provider.processingFee * 100).toFixed(1)}%
                    {provider.fixedFee && ` + ${provider.fixedFee} FCFA`}
                  </Text>
                )}
              </View>

              <View style={styles.methodRight}>
                {isSelected ? (
                  <View style={styles.selectedIndicator}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={24}
                      color={colors.primary.main}
                    />
                  </View>
                ) : (
                  <View style={styles.unselectedIndicator} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedMethod && amount && showFees && (
        <FeeBreakdown provider={selectedMethod} amount={amount} />
      )}
    </View>
  );
};

/**
 * Get provider description
 */
const getProviderDescription = (provider: PaymentProvider): string => {
  const descriptions: Record<PaymentProvider, string> = {
    ORANGE_MONEY: 'Pay with Orange Money mobile wallet',
    WAVE: 'Pay with Wave mobile wallet',
    STRIPE: 'Pay with Visa, Mastercard, or other cards',
    CARD: 'Pay with Visa, Mastercard, or other cards',
  };
  return descriptions[provider];
};

export default PaymentMethodSelector;
