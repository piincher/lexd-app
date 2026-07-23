import { useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import type { ShippingMarkDeliveryJob } from '../api/shippingMarkAdminApi';

const SINGLE_SEND_CAPTION =
  "Bonjour {{name}}, voici votre marque d'expédition. Merci de l'envoyer à votre fournisseur avec l'adresse de l'entrepôt. Le fournisseur doit l'imprimer et la coller sur chaque colis.";

type SendBulk = (payload: {
  userIds?: string[];
  all?: boolean;
  q?: string;
  caption?: string;
}) => Promise<ShippingMarkDeliveryJob>;

export const useShippingMarkDeliveryActions = (
  sendBulk: SendBulk,
  regenerateMark: (clientId: string) => Promise<{ shippingMarkImageUrl: string }>,
) => {
  const sendOne = useCallback(async (client: { _id: string; clientId: string }) => {
    try {
      await sendBulk({ userIds: [client._id], caption: SINGLE_SEND_CAPTION });
      showMessage({
        message: 'Envoi programmé',
        description: `La marque ${client.clientId} est en file d'envoi WhatsApp.`,
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Erreur WhatsApp',
        description: error instanceof Error ? error.message : "Impossible d'envoyer la marque.",
        type: 'danger',
      });
    }
  }, [sendBulk]);

  const regenerate = useCallback(async (clientId: string) => {
    try {
      await regenerateMark(clientId);
      showMessage({ message: 'Marque actualisée', type: 'success' });
    } catch (error) {
      showMessage({
        message: 'Génération impossible',
        description: error instanceof Error ? error.message : 'Réessayez dans quelques instants.',
        type: 'danger',
      });
    }
  }, [regenerateMark]);

  return { sendOne, regenerate };
};
