import { useCallback } from 'react';
import { useAutoAssignToOrder } from './useAutoAssignToOrder';
import type { useReceiveGoodsForm } from './useReceiveGoodsForm';
import type { Goods, ReceiveGoodsInput } from '@src/features/admin/goods/types';

type FormHook = ReturnType<typeof useReceiveGoodsForm>;

type ChannelStatus = { status: 'SENT' | 'FAILED' | 'SKIPPED'; reason?: string };
type NotificationDispatch = {
  // Receive flow: dispatch is fire-and-forget on the backend (so the request stays fast in
  // batch intake). Backend reports that dispatch was *initiated* + the recipient.
  dispatched?: boolean;
  channel?: string;
  recipient?: string | null;
  // Assign-client flow (single action, awaitable): full per-channel status.
  attempted?: boolean;
  whatsapp?: ChannelStatus;
  push?: ChannelStatus;
  publicFeed?: ChannelStatus;
};

type ReceiveResponseData = Partial<Goods> & {
  goods?: Partial<Goods>;
  order?: { code?: string };
  orderAction?: string;
  notification?: NotificationDispatch | null;
  /** Set to true when the backend short-circuited a duplicate submit and returned the
   *  previously-saved goods. The UI surfaces this so the operator knows nothing new was
   *  created. */
  idempotent?: boolean;
};

/**
 * Build the trailing notification badge so the operator can see — at every save in batch
 * intake — whether the customer actually got the WhatsApp ping. Silent backend failures
 * are now visible instead of invisibly swallowed.
 */
const formatNotificationBadge = (notification?: NotificationDispatch | null): string => {
  if (!notification) return '';

  // Receive flow (fire-and-forget) — backend just confirms dispatch was initiated.
  if (notification.dispatched) {
    const recipient = notification.recipient;
    return recipient
      ? ` · 📱 Notification envoyée à ${recipient}`
      : ' · 📱 Notification envoyée';
  }

  // Assign-client flow (awaited) — full per-channel status available.
  if (notification.attempted) {
    const wa = notification.whatsapp;
    if (!wa) return '';
    if (wa.status === 'SENT') return ' · 📱 WhatsApp envoyé';
    if (wa.status === 'FAILED') return ' · ⚠ WhatsApp échoué';
    if (wa.status === 'SKIPPED') {
      if (wa.reason === 'missing_phone_number') return ' · ⚠ WhatsApp ignoré (numéro manquant)';
      if (wa.reason === 'whatsapp_disabled' || wa.reason === 'whatsapp_unavailable') {
        return ' · ⚠ WhatsApp indisponible';
      }
      return ' · ⚠ WhatsApp ignoré';
    }
  }

  return '';
};

export const useReceiveGoodsResponseHandler = (formHook: FormHook) => {
  const { autoAssignToOrder } = useAutoAssignToOrder();

  // Returns the success message to show; the caller decides how to surface it
  // (success dialog for "finish", inline snackbar for "save & next").
  const handleResponse = useCallback(async (result: unknown, submitData: ReceiveGoodsInput): Promise<string> => {
    const res = result as { data?: ReceiveResponseData } & ReceiveResponseData;
    const resData = res?.data || res;
    const goodsObj = resData?.goods || resData;
    const orderObj = resData?.order;
    const orderAction = resData?.orderAction;
    const orderCode = orderObj?.code;
    const goodsId = goodsObj?._id || goodsObj?.goodsId;
    const notification = resData?.notification ?? null;
    const notifBadge = formatNotificationBadge(notification);
    const isIdempotent = resData?.idempotent === true;
    // Prepended hint that surfaces an idempotent replay — the backend dedupe kicked in
    // because the operator (or a network retry) re-submitted the same key, and the
    // operator should know the original is the one that "won".
    const idempotentHint = isIdempotent ? '⚠ Marchandise déjà enregistrée — ' : '';

    if (orderAction) {
      if (orderObj && orderCode) {
        const base = orderAction === 'added_to_existing'
          ? `Marchandise ajoutée à la commande ${orderCode}`
          : `Nouvelle commande ${orderCode} créée avec la marchandise`;
        return `${idempotentHint}${base}${notifBadge}`;
      }
      console.warn('[ReceiveGoods] Backend reported order action without order object:', orderAction);
      return `Marchandise enregistrée, mais la commande automatique n'a pas été retournée${notifBadge}`;
    }

    if (goodsId && formHook.selectedClient) {
      const orderResult = await autoAssignToOrder(goodsId, formHook.selectedClient, {
        weight: submitData.weight,
        quantity: submitData.quantity,
        unitPrice: submitData.unitPrice,
        shippingMode: submitData.shippingMode,
        actualCBM: submitData.actualCBM,
        description: submitData.description,
      });

      if (orderResult) {
        const base = orderResult.action === 'added_to_existing'
          ? `Marchandise ajoutée à la commande ${orderResult.code}`
          : `Nouvelle commande ${orderResult.code} créée avec la marchandise`;
        return `${idempotentHint}${base}${notifBadge}`;
      }
      return `Marchandise enregistrée mais la commande n'a pas pu être créée automatiquement${notifBadge}`;
    }

    return `Marchandise enregistrée avec succès!${notifBadge}`;
  }, [formHook, autoAssignToOrder]);

  return { handleResponse };
};
