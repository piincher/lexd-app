import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface PaymentCardProps {
  priceTotal?: number;
  balance?: number;
  paymentStatus?: string;
  isBalanceSufficient: boolean;
  isPaying: boolean;
  onPayment: () => void;
  getButtonColors: () => string[];
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  priceTotal,
  balance,
  paymentStatus,
  isBalanceSufficient,
  isPaying,
  onPayment,
  getButtonColors,
}) => {
  const isPaid = paymentStatus === 'Paid';
  const deficit = (priceTotal || 0) - (balance || 0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails de paiement</Text>
      
      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Montant total</Text>
        <Text style={styles.amountValue}>
          {priceTotal?.toLocaleString() || '0'} FCFA
        </Text>
      </View>
      
      {!isBalanceSufficient && !isPaid && (
        <View style={styles.balanceAlert}>
          <View style={styles.alertHeader}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={24}
              color={COLORS.redShade}
            />
            <Text style={styles.alertTitle}>Solde insuffisant!</Text>
          </View>
          <View style={styles.balanceDetails}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Solde actuel</Text>
              <Text style={styles.balanceValue}>
                {balance?.toLocaleString()} FCFA
              </Text>
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>À payer maintenant</Text>
              <Text style={styles.dueAmount}>
                {priceTotal?.toLocaleString()} FCFA
              </Text>
            </View>
            <View style={styles.deficitContainer}>
              <Text style={styles.deficitText}>
                Manque {deficit.toLocaleString()} FCFA
              </Text>
            </View>
          </View>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.payButton, (!isBalanceSufficient || isPaid) && styles.disabledButton]}
        onPress={onPayment}
        disabled={!isBalanceSufficient || isPaid}
      >
        <LinearGradient colors={getButtonColors()} style={styles.gradientButton}>
          {isPaying ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.payButtonText}>
                {isPaid ? 'Déjà Payé' : 'Payer maintenant'}
              </Text>
              <MaterialCommunityIcons
                name={isPaid ? 'check' : 'shield-check'}
                size={24}
                color={COLORS.white}
              />
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.blue,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: COLORS.secondaryText,
  },
  amountValue: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.primary,
  },
  balanceAlert: {
    backgroundColor: COLORS.errorLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.error,
    marginLeft: 8,
  },
  balanceDetails: {
    borderTopWidth: 1,
    borderTopColor: COLORS.errorLight,
    paddingTop: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.secondaryText,
  },
  balanceValue: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: COLORS.error,
  },
  dueAmount: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: COLORS.primaryText,
  },
  deficitContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
  },
  deficitText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.error,
    textAlign: 'center',
  },
  payButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  payButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.white,
    marginRight: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
});
