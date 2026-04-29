import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { Theme } from '@src/constants/Theme';
import type { PaymentHistoryItem } from '../types';

const METHOD_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  CASH: { icon: 'cash', color: '#10B981', label: 'Espèces' },
  BANK_TRANSFER: { icon: 'bank', color: '#3B82F6', label: 'Virement Bancaire' },
  MOBILE_MONEY: { icon: 'cellphone', color: '#8B5CF6', label: 'Mobile Money' },
  ORANGE_MONEY: { icon: 'cellphone', color: '#F97316', label: 'Orange Money' },
  WAVE: { icon: 'wave', color: '#06B6D4', label: 'Wave' },
  CARD: { icon: 'credit-card', color: '#6366F1', label: 'Carte Bancaire' },
};

const getStatusConfig = (status: string, isDark: boolean) => {
  const configs: Record<string, { color: string; lightBg: string; darkBg: string; label: string }> = {
    COMPLETED: { color: '#10B981', lightBg: '#F0FDF4', darkBg: '#14532D', label: 'Complété' },
    PENDING: { color: '#F59E0B', lightBg: '#FEF3C7', darkBg: '#78350F', label: 'En attente' },
    PROCESSING: { color: '#3B82F6', lightBg: '#DBEAFE', darkBg: '#1E3A8A', label: 'En cours' },
    FAILED: { color: '#EF4444', lightBg: '#FEE2E2', darkBg: '#7F1D1D', label: 'Échoué' },
    CANCELLED: { color: Theme.colors.text.secondary, lightBg: '#F3F4F6', darkBg: '#374151', label: 'Annulé' },
    REFUNDED: { color: '#8B5CF6', lightBg: '#F5F3FF', darkBg: '#4C1D95', label: 'Remboursé' },
  };
  const config = configs[status] || configs.PENDING;
  return { ...config, bgColor: isDark ? config.darkBg : config.lightBg };
};

interface RouteParams {
  payment: PaymentHistoryItem;
}

export const useUserPaymentDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { payment } = route.params as RouteParams;

  const methodConfig = METHOD_CONFIG[payment.paymentMethod] || {
    icon: 'cash',
    color: '#10B981',
    label: payment.paymentMethod,
  };
  const statusConfig = getStatusConfig(payment.status, false);
  const receiptUrl = payment.receiptUrl || payment.metadata?.receiptUrl;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), "dd MMMM yyyy 'à' HH:mm", { locale: fr });
    } catch {
      return dateStr;
    }
  };

  const handleOpenReceipt = async () => {
    if (!receiptUrl) {
      Alert.alert('Reçu non disponible', "Le reçu n'est pas encore généré pour ce paiement.");
      return;
    }
    try {
      const canOpen = await Linking.canOpenURL(receiptUrl);
      if (canOpen) {
        await Linking.openURL(receiptUrl);
      } else {
        Alert.alert('Erreur', "Impossible d'ouvrir le reçu. Vérifiez votre connexion.");
      }
    } catch {
      Alert.alert('Erreur', "Une erreur s'est produite lors de l'ouverture du reçu.");
    }
  };

  return {
    payment,
    navigation,
    methodConfig,
    statusConfig,
    receiptUrl,
    formattedDate: formatDate(payment.paidAt || payment.createdAt),
    handleOpenReceipt,
  };
};
