import { formatDate } from '@src/utils/formatDate';
import { PAYMENT_METHOD_LABELS } from '../constants/paymentMethods';

export const buildWhatsAppMessage = (
  payment: any,
  orderCode: string,
  clientName?: string,
): string => {
  const amountStr = (payment.amount || 0).toLocaleString('fr-FR');
  const methodLabel = PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod;
  const date = formatDate(payment.recordedAt);
  const name = clientName || 'Client';
  let msg = `✅ *Reçu de Paiement - ChinaLink Express*\n\nBonjour ${name},\n\nVotre paiement a été enregistré avec succès.\n\n📋 *Détails du Paiement:*\n• Montant: *${amountStr} FCFA*\n• Méthode: ${methodLabel}\n• Date: ${date}\n• N° Commande: ${orderCode}\n`;
  if (payment.referenceNumber) msg += `• Référence: ${payment.referenceNumber}\n`;
  if (payment.receiptNumber) msg += `• N° Reçu: ${payment.receiptNumber}\n`;
  msg += `\nMerci de votre confiance!\n_ChinaLink Express_`;
  return msg;
};
