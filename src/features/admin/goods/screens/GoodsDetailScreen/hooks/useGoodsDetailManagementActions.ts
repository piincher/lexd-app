import { useCallback } from 'react';
import { Alert } from 'react-native';

type ChannelStatus = { status: 'SENT' | 'FAILED' | 'SKIPPED'; reason?: string };
type ResendNotificationResult = {
  data?: {
    goodsId?: string;
    recipient?: string | null;
    notification?: {
      attempted?: boolean;
      whatsapp?: ChannelStatus;
      push?: ChannelStatus;
      publicFeed?: ChannelStatus;
    };
  };
};

type GoodsDetailManagementData = {
  goods?: { _id: string; clientId?: unknown } | null;
  goodsId: string;
  containerId?: string | null;
  deleteMutation: {
    mutate: (
      variables: { id: string; permanent?: boolean },
      options?: { onSuccess?: () => void },
    ) => void;
  };
  updateStatusMutation: {
    mutate: (variables: { id: string; status: string }) => void;
  };
  resendNotificationMutation: {
    mutate: (
      id: string,
      options?: {
        onSuccess?: (result: ResendNotificationResult) => void;
        onError?: (err: { message?: string }) => void;
      },
    ) => void;
    isPending: boolean;
  };
};

type GoodsDetailNavigation = {
  goBack: () => void;
  navigate: (screen: never, params: never) => void;
};

export const useGoodsDetailManagementActions = (data: GoodsDetailManagementData, navigation: GoodsDetailNavigation) => {
  const { goods, deleteMutation, updateStatusMutation, resendNotificationMutation, goodsId } = data;

  const handleDelete = useCallback(() => {
    if (!goods) return;
    Alert.alert('Suppression définitive', 'Cette action supprimera définitivement la marchandise et la retirera des conteneurs, lettres de transport, factures et paiements liés. Cette action est irréversible.', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer définitivement',
        style: 'destructive',
        onPress: () => {
          deleteMutation.mutate(
            { id: goods._id, permanent: true },
            { onSuccess: () => navigation.goBack() },
          );
        },
      },
    ]);
  }, [goods, deleteMutation, navigation]);

  const handleStatusUpdate = useCallback((status: string) => {
    if (!goods) return;
    Alert.alert('Confirmer le changement de statut', `Passer cette marchandise au statut "${status}" ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => updateStatusMutation.mutate({ id: goods._id, status }) },
    ]);
  }, [goods, updateStatusMutation]);

  /**
   * Re-trigger the customer "goods received" notifications. Confirms first, then surfaces
   * the per-channel dispatch result so the operator knows whether WhatsApp actually went
   * out (vs the original receive dispatch which may have logged a silent FAILED).
   */
  const handleResendNotification = useCallback(() => {
    if (!goods) return;
    if (!goods.clientId) {
      Alert.alert('Aucun client', 'Cette marchandise n\'a pas de client assigné. Assignez un client avant de renvoyer une notification.');
      return;
    }
    if (resendNotificationMutation.isPending) return;

    Alert.alert(
      'Renvoyer la notification',
      'Renvoyer la notification WhatsApp au client ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Renvoyer',
          onPress: () => {
            resendNotificationMutation.mutate(goods._id, {
              onSuccess: (result) => {
                const data = result?.data;
                const wa = data?.notification?.whatsapp;
                const recipient = data?.recipient;
                if (wa?.status === 'SENT') {
                  Alert.alert('Envoyé', recipient ? `WhatsApp envoyé à ${recipient}.` : 'WhatsApp envoyé avec succès.');
                } else if (wa?.status === 'FAILED') {
                  Alert.alert('Échec WhatsApp', `Le message n'a pas pu être envoyé : ${wa.reason || 'raison inconnue'}.\n\nVérifiez la session Wasender côté serveur.`);
                } else if (wa?.status === 'SKIPPED') {
                  const reason = wa.reason || 'raison inconnue';
                  const friendly =
                    reason === 'missing_phone_number'
                      ? 'le client n\'a pas de numéro de téléphone.'
                      : reason === 'whatsapp_disabled' || reason === 'whatsapp_unavailable'
                        ? 'le service WhatsApp est indisponible côté serveur.'
                        : reason;
                  Alert.alert('WhatsApp ignoré', `Notification non envoyée : ${friendly}`);
                } else {
                  Alert.alert('Terminé', 'Notification envoyée.');
                }
              },
              onError: (err) => {
                Alert.alert('Erreur', err?.message || 'Le renvoi a échoué.');
              },
            });
          },
        },
      ],
    );
  }, [goods, resendNotificationMutation]);

  const handleNavigateToEdit = useCallback(() => { navigation.navigate('EditGoods' as never, { goodsId } as never); }, [navigation, goodsId]);
  const handleGoBack = useCallback(() => { navigation.goBack(); }, [navigation]);
  const handleNavigateToContainer = useCallback(() => {
    if (!data.containerId) return;
    navigation.navigate('ContainerDetail' as never, { containerId: data.containerId } as never);
  }, [navigation, data.containerId]);

  return { handleDelete, handleStatusUpdate, handleResendNotification, handleNavigateToEdit, handleGoBack, handleNavigateToContainer };
};
