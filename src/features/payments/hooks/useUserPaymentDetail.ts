import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AppTheme } from '@src/constants/Theme';
import type { PaymentHistoryItem } from '../types';

type ThemeColors = AppTheme['colors'];

const getMethodConfig = (paymentMethod: string, colors: ThemeColors) => {
  const configs: Record<string, { icon: string; color: string; label: string }> = {
    CASH: { icon: 'cash', color: colors.status.success, label: 'Espèces' },
    BANK_TRANSFER: { icon: 'bank', color: colors.status.info, label: 'Virement Bancaire' },
    MOBILE_MONEY: { icon: 'cellphone', color: colors.primary.main, label: 'Mobile Money' },
    ORANGE_MONEY: { icon: 'cellphone', color: colors.status.warning, label: 'Orange Money' },
    WAVE: { icon: 'wave', color: colors.status.info, label: 'Wave' },
    CARD: { icon: 'credit-card', color: colors.status.info, label: 'Carte Bancaire' },
  };
  return configs[paymentMethod] || {
    icon: 'cash',
    color: colors.status.success,
    label: paymentMethod,
  };
};

const getStatusConfig = (status: string, colors: ThemeColors, isDark: boolean) => {
  const configs: Record<string, { color: string; lightBg: string; darkBg: string; label: string }> = {
    COMPLETED: { color: colors.status.success, lightBg: colors.feedback.successBg, darkBg: colors.feedback.successBg, label: 'Payé' },
    PENDING: { color: colors.status.warning, lightBg: colors.feedback.warningBg, darkBg: colors.feedback.warningBg, label: 'En attente' },
    PROCESSING: { color: colors.status.info, lightBg: colors.feedback.infoBg, darkBg: colors.feedback.infoBg, label: 'En cours' },
    FAILED: { color: colors.status.error, lightBg: colors.feedback.errorBg, darkBg: colors.feedback.errorBg, label: 'Échoué' },
    CANCELLED: { color: colors.text.secondary, lightBg: colors.background.paper, darkBg: colors.background.paper, label: 'Annulé' },
    REFUNDED: { color: colors.primary.main, lightBg: colors.feedback.infoBg, darkBg: colors.feedback.infoBg, label: 'Remboursé' },
  };
  const config = configs[status] || configs.PENDING;
  return { ...config, bgColor: isDark ? config.darkBg : config.lightBg };
};

interface RouteParams {
  payment: PaymentHistoryItem;
}

export const useUserPaymentDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { colors, isDark } = useAppTheme();
  const { payment } = route.params as RouteParams;

  const methodConfig = getMethodConfig(payment.paymentMethod, colors);
  const statusConfig = getStatusConfig(payment.status, colors, isDark);
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
