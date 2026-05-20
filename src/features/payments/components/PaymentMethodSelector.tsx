'use no memo';
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePaymentMethodSelectorStyles } from "./PaymentMethodSelector/usePaymentMethodSelectorStyles";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { usePaymentProviders } from "../hooks/usePayments";
import type { PaymentMethodSelectorProps, PaymentProvider } from "../types";
import { PaymentMethodSkeleton } from "./PaymentMethodSelector/PaymentMethodSkeleton";
import { PaymentMethodError } from "./PaymentMethodSelector/PaymentMethodError";
import { FeeBreakdown } from "./PaymentMethodSelector/FeeBreakdown";

const PROVIDER_ICON_NAMES: Record<PaymentProvider, string> = {
   ORANGE_MONEY: "cellphone",
   WAVE: "wave",
   STRIPE: "credit-card",
   CARD: "credit-card",
};

const getProviderColor = (provider: PaymentProvider, colors: any) => {
   switch (provider) {
      case "ORANGE_MONEY":
         return colors.status.warning;
      case "WAVE":
         return colors.status.info;
      case "STRIPE":
         return colors.primary.main;
      case "CARD":
         return colors.status.success;
      default:
         return colors.primary.main;
   }
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

   const styles = usePaymentMethodSelectorStyles();

   if (isLoading)
      return <PaymentMethodSkeleton style={styles.container} cardStyle={styles.methodCard} />;
   if (error)
      return (
         <PaymentMethodError
            containerStyle={styles.errorContainer}
            textStyle={styles.errorText}
            color={colors.status.error}
         />
      );

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Select Payment Method</Text>

         {amount && showFees && (
            <View style={styles.amountBanner}>
               <Text style={styles.amountLabel}>Amount to Pay</Text>
               <Text style={styles.amountValue}>{amount.toLocaleString()} FCFA</Text>
            </View>
         )}

         <View style={styles.methodsList}>
            {providers.map((provider) => {
               const isSelected = selectedMethod === provider.code;
               const hasError = false;
               const providerCode = provider.code as PaymentProvider;
               const iconName = PROVIDER_ICON_NAMES[providerCode] || PROVIDER_ICON_NAMES.CARD;
               const providerColor = getProviderColor(providerCode, colors);

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
                     <View
                        style={[
                           styles.methodIconContainer,
                           { backgroundColor: providerColor + "15" },
                        ]}
                     >
                        <MaterialCommunityIcons
                           name={iconName as any}
                           size={28}
                           color={providerColor}
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
      ORANGE_MONEY: "Pay with Orange Money mobile wallet",
      WAVE: "Pay with Wave mobile wallet",
      STRIPE: "Pay with Visa, Mastercard, or other cards",
      CARD: "Pay with Visa, Mastercard, or other cards",
   };
   return descriptions[provider];
};

export default PaymentMethodSelector;
