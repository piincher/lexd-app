/**
 * Payment Confirmation Screen
 * Shows payment status (success/failure) with transaction details
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Card,
  ActivityIndicator,
  Divider,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { usePaymentPolling, useDownloadReceipt } from '../hooks/usePayments';
import { PaymentStatusIndicator } from '../components';
import { PAYMENT_METHODS, PaymentStatus } from '../types';

type PaymentConfirmationScreenProps = RootStackScreenProps<'PaymentConfirmation'>;

const PaymentConfirmationScreen: React.FC<PaymentConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const {
    paymentId,
    transactionReference,
    amount,
    currency,
    paymentMethod,
    goodsCount,
  } = route.params;

  const { payment, status, isPolling, isComplete, error } = usePaymentPolling(paymentId);
  const downloadReceipt = useDownloadReceipt();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency || 'XOF',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const getPaymentMethodLabel = (method: string): string => {
    const config = PAYMENT_METHODS.find((m) => m.id === method);
    return config?.label || method;
  };

  const handleDownloadReceipt = async () => {
    try {
      const receiptUrl = await downloadReceipt.mutateAsync(paymentId);
      
      // Try to open the receipt URL
      const canOpen = await Linking.canOpenURL(receiptUrl);
      if (canOpen) {
        await Linking.openURL(receiptUrl);
      } else {
        // If can't open, share the URL
        await Share.share({
          message: `Reçu de paiement ChinaLink Express: ${receiptUrl}`,
          title: 'Télécharger le reçu',
        });
      }
    } catch (err) {
      Alert.alert(
        'Erreur',
        'Impossible de télécharger le reçu. Veuillez réessayer plus tard.'
      );
    }
  };

  const handleSharePayment = async () => {
    const message = `Paiement ChinaLink Express\n` +
      `Référence: ${transactionReference}\n` +
      `Montant: ${formatCurrency(amount)}\n` +
      `Date: ${formatDate(payment?.paidAt || new Date().toISOString())}\n` +
      `Statut: ${status === 'COMPLETED' ? 'Payé' : status === 'PENDING' ? 'En attente' : 'Échoué'}`;

    try {
      await Share.share({
        message,
        title: 'Détails du paiement',
      });
    } catch (err) {
      // User cancelled share
    }
  };

  const handleGoHome = () => {
    navigation.navigate('HomeTab', { screen: 'Home' });
  };

  const handleGoToHistory = () => {
    navigation.navigate('PaymentHistory');
  };

  const handleRetry = () => {
    navigation.goBack();
  };

  // Prevent back navigation while processing
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isPolling && !isComplete) {
        // Prevent going back while processing
        e.preventDefault();
        Alert.alert(
          'Paiement en cours',
          'Veuillez attendre la confirmation du paiement.',
          [{ text: 'OK' }]
        );
      }
    });

    return unsubscribe;
  }, [navigation, isPolling, isComplete]);

  const renderStatusContent = () => {
    if (isPolling && status === 'PENDING') {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.processingTitle}>Traitement du paiement...</Text>
          <Text style={styles.processingText}>
            Veuillez patienter pendant que nous confirmons votre paiement.
            {'\n'}Cela peut prendre quelques instants.
          </Text>
        </View>
      );
    }

    if (status === 'COMPLETED') {
      return (
        <View style={styles.statusContainer}>
          <PaymentStatusIndicator
            status="COMPLETED"
            message="Votre paiement a été effectué avec succès"
          />
        </View>
      );
    }

    if (status === 'FAILED') {
      return (
        <View style={styles.statusContainer}>
          <PaymentStatusIndicator
            status="FAILED"
            message={payment?.status === 'FAILED' ? 'Le paiement a échoué' : 'Une erreur est survenue'}
          />
        </View>
      );
    }

    return null;
  };

  const renderDetailsCard = () => (
    <Card style={styles.detailsCard}>
      <Card.Content>
        <Text style={styles.detailsTitle}>Détails de la transaction</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Référence</Text>
          <Text style={styles.detailValue}>{transactionReference}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Montant payé</Text>
          <Text style={[styles.detailValue, styles.amountValue]}>
            {formatCurrency(amount)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Méthode de paiement</Text>
          <Text style={styles.detailValue}>{getPaymentMethodLabel(paymentMethod)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Articles payés</Text>
          <Text style={styles.detailValue}>{goodsCount} marchandise(s)</Text>
        </View>

        {status === 'COMPLETED' && payment?.paidAt && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date de paiement</Text>
            <Text style={styles.detailValue}>{formatDate(payment.paidAt)}</Text>
          </View>
        )}

        <Divider style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Montant total</Text>
          <Text style={styles.totalValue}>{formatCurrency(amount)}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            if (!isPolling || isComplete) {
              navigation.goBack();
            }
          }}
        />
        <Appbar.Content title="Confirmation de paiement" />
        {isComplete && status === 'COMPLETED' && (
          <Appbar.Action
            icon="share-variant"
            onPress={handleSharePayment}
            disabled={downloadReceipt.isPending}
          />
        )}
      </Appbar.Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStatusContent()}

        {renderDetailsCard()}

        {/* Info Card */}
        {status === 'COMPLETED' && (
          <Card style={styles.infoCard}>
            <Card.Content style={styles.infoContent}>
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>
                Un reçu de paiement vous sera envoyé par SMS et email (si disponible).
                Vous pouvez également télécharger votre reçu ci-dessous.
              </Text>
            </Card.Content>
          </Card>
        )}

        {error && (
          <Card style={[styles.infoCard, styles.errorCard]}>
            <Card.Content style={styles.infoContent}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color={Theme.status.error}
              />
              <Text style={[styles.infoText, styles.errorText]}>
                Une erreur est survenue lors de la vérification du paiement.{'\n'}
                Veuillez vérifier votre historique de paiements ou contacter le support.
              </Text>
            </Card.Content>
          </Card>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {status === 'COMPLETED' ? (
          <>
            <Button
              mode="contained"
              onPress={handleDownloadReceipt}
              loading={downloadReceipt.isPending}
              disabled={downloadReceipt.isPending}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              icon="receipt"
            >
              Télécharger le reçu
            </Button>
            <Button
              mode="outlined"
              onPress={handleGoHome}
              style={[styles.actionButton, styles.secondaryButton]}
              contentStyle={styles.buttonContent}
              icon="home"
            >
              Retour à l'accueil
            </Button>
          </>
        ) : status === 'FAILED' ? (
          <>
            <Button
              mode="contained"
              onPress={handleRetry}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              icon="refresh"
            >
              Réessayer le paiement
            </Button>
            <Button
              mode="outlined"
              onPress={handleGoToHistory}
              style={[styles.actionButton, styles.secondaryButton]}
              contentStyle={styles.buttonContent}
              icon="history"
            >
              Voir l'historique
            </Button>
          </>
        ) : (
          <Button
            mode="outlined"
            onPress={handleGoHome}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon="home"
          >
            Retour à l'accueil
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing['2xl'],
  },
  processingTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.lg,
  },
  processingText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  detailsCard: {
    borderRadius: Theme.radius.lg,
    marginTop: Theme.spacing.md,
  },
  detailsTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  detailLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  detailValue: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: Theme.neutral[800],
  },
  amountValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.primary[600],
  },
  divider: {
    marginVertical: Theme.spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
  },
  totalValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Theme.primary[600],
  },
  infoCard: {
    marginTop: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[50],
  },
  errorCard: {
    backgroundColor: Theme.status.error + '15',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Theme.neutral[600],
    lineHeight: 18,
  },
  errorText: {
    color: Theme.status.error,
  },
  spacer: {
    height: 100,
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
  actionButton: {
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing.md,
  },
  secondaryButton: {
    borderColor: Theme.neutral[300],
  },
  buttonContent: {
    paddingVertical: 8,
    height: 52,
  },
});

export default PaymentConfirmationScreen;
