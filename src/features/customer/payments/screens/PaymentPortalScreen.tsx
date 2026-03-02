/**
 * Payment Portal Screen
 * Main screen for customers to pay their balance
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  ActivityIndicator,
  Card,
  TextInput,
  HelperText,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import {
  useGetBalanceDue,
  useInitiatePayment,
} from '../hooks/usePayments';
import {
  PaymentMethod,
  PaymentMethodConfig,
  PAYMENT_METHODS,
} from '../types';
import { PaymentMethodSelector, UnpaidGoodsList } from '../components';

type PaymentPortalScreenProps = RootStackScreenProps<'PaymentPortal'>;

const PaymentPortalScreen: React.FC<PaymentPortalScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedGoodsIds, setSelectedGoodsIds] = useState<string[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Queries
  const {
    data: balanceData,
    isLoading: isLoadingBalance,
    isError: isBalanceError,
    refetch: refetchBalance,
  } = useGetBalanceDue();

  // Mutations
  const initiatePayment = useInitiatePayment();

  const unpaidGoods = balanceData?.unpaidGoods || [];
  const currency = balanceData?.currency || 'XOF';
  const totalBalance = balanceData?.totalBalanceDue || 0;

  const selectedTotal = selectedGoodsIds.reduce((sum, id) => {
    const item = unpaidGoods.find((g) => g._id === id);
    return sum + (item?.balanceDue || 0);
  }, 0);

  const selectedMethodConfig: PaymentMethodConfig | undefined = PAYMENT_METHODS.find(
    (m) => m.id === selectedMethod
  );
  const requiresPhone = selectedMethodConfig?.requiresPhone || false;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove spaces and validate
    const cleanPhone = phone.replace(/\s/g, '');
    // Support various African phone number formats
    const phoneRegex = /^(\+?\d{8,15})$/;
    return phoneRegex.test(cleanPhone);
  };

  const handleToggleSelection = (goodsId: string) => {
    setSelectedGoodsIds((prev) =>
      prev.includes(goodsId)
        ? prev.filter((id) => id !== goodsId)
        : [...prev, goodsId]
    );
  };

  const handleSelectAll = () => {
    if (selectedGoodsIds.length === unpaidGoods.length) {
      setSelectedGoodsIds([]);
    } else {
      setSelectedGoodsIds(unpaidGoods.map((g) => g._id));
    }
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPhoneError('');
    if (method === 'CARD') {
      setPhoneNumber('');
    }
  };

  const handlePayment = async () => {
    // Validation
    if (selectedGoodsIds.length === 0) {
      setSnackbarMessage('Veuillez sélectionner au moins une marchandise');
      setSnackbarVisible(true);
      return;
    }

    if (!selectedMethod) {
      setSnackbarMessage('Veuillez sélectionner une méthode de paiement');
      setSnackbarVisible(true);
      return;
    }

    if (requiresPhone) {
      if (!phoneNumber.trim()) {
        setPhoneError('Veuillez entrer votre numéro de téléphone');
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneError('Numéro de téléphone invalide');
        return;
      }
    }

    try {
      const paymentIntent = await initiatePayment.mutateAsync({
        goodsIds: selectedGoodsIds,
        paymentMethod: selectedMethod,
        phoneNumber: requiresPhone ? phoneNumber.replace(/\s/g, '') : undefined,
      });

      // Navigate to confirmation screen
      navigation.navigate('PaymentConfirmation', {
        paymentId: paymentIntent.paymentId,
        transactionReference: paymentIntent.transactionReference,
        amount: selectedTotal,
        currency: currency,
        paymentMethod: selectedMethod,
        goodsCount: selectedGoodsIds.length,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'initiation du paiement';
      setSnackbarMessage(errorMessage);
      setSnackbarVisible(true);
    }
  };

  if (isLoadingBalance) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Payer ma dette" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement de votre solde...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isBalanceError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Payer ma dette" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            Impossible de charger les informations de paiement.
          </Text>
          <Button mode="contained" onPress={() => refetchBalance()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const hasNoBalance = totalBalance === 0 || unpaidGoods.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Payer ma dette" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Total Balance Card */}
          <Card style={styles.balanceCard}>
            <Card.Content style={styles.balanceContent}>
              <MaterialCommunityIcons
                name="cash-multiple"
                size={32}
                color={hasNoBalance ? Theme.status.success : Theme.status.warning}
              />
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>
                  {hasNoBalance ? 'Solde soldé' : 'Total à payer'}
                </Text>
                <Text style={[styles.balanceAmount, hasNoBalance && styles.paidAmount]}>
                  {formatCurrency(totalBalance)}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {hasNoBalance ? (
            <Card style={styles.paidCard}>
              <Card.Content style={styles.paidContent}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={64}
                  color={Theme.status.success}
                />
                <Text style={styles.paidTitle}>Tous les paiements sont à jour!</Text>
                <Text style={styles.paidSubtitle}>
                  Vous n'avez aucune dette en cours.
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('PaymentHistory')}
                  style={styles.historyButton}
                  icon="history"
                >
                  Voir l'historique
                </Button>
              </Card.Content>
            </Card>
          ) : (
            <>
              {/* Unpaid Goods List */}
              <UnpaidGoodsList
                goods={unpaidGoods}
                selectedIds={selectedGoodsIds}
                onToggleSelection={handleToggleSelection}
                onSelectAll={handleSelectAll}
                currency={currency}
                disabled={initiatePayment.isPending}
              />

              {/* Payment Method Selector */}
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onSelect={handleMethodSelect}
                disabled={initiatePayment.isPending}
              />

              {/* Phone Number Input (for mobile money) */}
              {requiresPhone && (
                <Card style={styles.phoneCard}>
                  <Card.Content>
                    <Text style={styles.phoneLabel}>
                      Numéro de téléphone ({selectedMethodConfig?.label})
                    </Text>
                    <TextInput
                      mode="outlined"
                      value={phoneNumber}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                        setPhoneError('');
                      }}
                      placeholder="Ex: +223 76 12 34 56"
                      keyboardType="phone-pad"
                      disabled={initiatePayment.isPending}
                      error={!!phoneError}
                      left={<TextInput.Affix text="📱" />}
                      style={styles.phoneInput}
                    />
                    {phoneError ? (
                      <HelperText type="error">{phoneError}</HelperText>
                    ) : (
                      <HelperText>
                        Entrez le numéro associé à votre compte {selectedMethodConfig?.label}
                      </HelperText>
                    )}
                  </Card.Content>
                </Card>
              )}

              {/* Selected Total */}
              {selectedGoodsIds.length > 0 && (
                <Card style={styles.totalCard}>
                  <Card.Content style={styles.totalContent}>
                    <Text style={styles.totalLabel}>Montant à payer</Text>
                    <Text style={styles.totalAmountLarge}>
                      {formatCurrency(selectedTotal)}
                    </Text>
                  </Card.Content>
                </Card>
              )}

              {/* Spacer for button */}
              <View style={styles.spacer} />
            </>
          )}
        </ScrollView>

        {/* Pay Button */}
        {!hasNoBalance && (
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handlePayment}
              loading={initiatePayment.isPending}
              disabled={
                initiatePayment.isPending ||
                selectedGoodsIds.length === 0 ||
                !selectedMethod ||
                (requiresPhone && !phoneNumber.trim())
              }
              style={styles.payButton}
              contentStyle={styles.payButtonContent}
              icon="credit-card-check"
            >
              {initiatePayment.isPending
                ? 'Traitement en cours...'
                : `Payer ${formatCurrency(selectedTotal)}`}
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: Theme.neutral[500],
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  balanceCard: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.neutral.white,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  balanceInfo: {
    marginLeft: Theme.spacing.md,
  },
  balanceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  balanceAmount: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Theme.neutral[800],
    marginTop: 2,
  },
  paidAmount: {
    color: Theme.status.success,
  },
  paidCard: {
    marginTop: Theme.spacing.xl,
    borderRadius: Theme.radius.lg,
  },
  paidContent: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['3xl'],
  },
  paidTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  paidSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
  historyButton: {
    marginTop: Theme.spacing.lg,
  },
  phoneCard: {
    marginVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  phoneLabel: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.sm,
  },
  phoneInput: {
    backgroundColor: Theme.neutral.white,
  },
  totalCard: {
    marginVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[50],
  },
  totalContent: {
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: Theme.primary[700],
  },
  totalAmountLarge: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Theme.primary[700],
    marginTop: Theme.spacing.xs,
  },
  spacer: {
    height: 80,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  payButton: {
    borderRadius: Theme.radius.md,
  },
  payButtonContent: {
    paddingVertical: 8,
    height: 56,
  },
});

export default PaymentPortalScreen;
