import { useCallback } from 'react';
import { useAutoAssignToOrder } from './useAutoAssignToOrder';
import type { useReceiveGoodsForm } from './useReceiveGoodsForm';
import type { ReceiveGoodsInput } from '../../../../types';

type FormHook = ReturnType<typeof useReceiveGoodsForm>;

export const useReceiveGoodsResponseHandler = (
  formHook: FormHook,
  setSuccessMessage: (v: string) => void,
) => {
  const { autoAssignToOrder } = useAutoAssignToOrder();

  const handleResponse = useCallback(async (result: unknown, submitData: ReceiveGoodsInput) => {
    console.log('[ReceiveGoods] Full response:', JSON.stringify(result));

    const res = result as any;
    const resData = res?.data || res;
    const goodsObj = resData?.goods || resData;
    const orderObj = resData?.order;
    const orderAction = resData?.orderAction;
    const orderCode = orderObj?.code;
    const goodsId = goodsObj?._id || goodsObj?.goodsId;

    console.log('[ReceiveGoods] Parsed:', { orderAction, orderCode, goodsId, orderIsNull: orderObj === null });

    if (orderAction) {
      if (orderObj && orderCode) {
        if (orderAction === 'added_to_existing') {
          setSuccessMessage(`Marchandise ajoutée à la commande ${orderCode}`);
        } else {
          setSuccessMessage(`Nouvelle commande ${orderCode} créée avec la marchandise`);
        }
      } else {
        console.warn('[ReceiveGoods] Backend reported order action without order object:', orderAction);
        setSuccessMessage('Marchandise enregistrée, mais la commande automatique n\'a pas été retournée');
      }
    } else if (goodsId && formHook.selectedClient) {
      console.log('[ReceiveGoods] Order is null from backend, creating on frontend. GoodsId:', goodsId);
      console.log('[ReceiveGoods] No orderAction from backend, creating order on frontend...');
      const orderResult = await autoAssignToOrder(goodsId, formHook.selectedClient, {
        weight: submitData.weight,
        quantity: submitData.quantity,
        unitPrice: submitData.unitPrice,
        shippingMode: submitData.shippingMode,
        actualCBM: submitData.actualCBM,
        description: submitData.description,
      });

      if (orderResult) {
        if (orderResult.action === 'added_to_existing') {
          setSuccessMessage(`Marchandise ajoutée à la commande ${orderResult.code}`);
        } else {
          setSuccessMessage(`Nouvelle commande ${orderResult.code} créée avec la marchandise`);
        }
      } else {
        setSuccessMessage('Marchandise enregistrée mais la commande n\'a pas pu être créée automatiquement');
      }
    } else {
      setSuccessMessage('Marchandise enregistrée avec succès!');
    }
  }, [formHook, autoAssignToOrder, setSuccessMessage]);

  return { handleResponse };
};
