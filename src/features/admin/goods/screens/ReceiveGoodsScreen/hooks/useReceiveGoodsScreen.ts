/**
 * useReceiveGoodsScreen - Screen-level hook
 * Responsibility: Orchestrate form hook and UI state
 * Auto-assigns goods to existing order (< 7 days) or creates new order
 */

import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useReceiveGoodsForm } from './useReceiveGoodsForm';
import { useReceiveGoods as useReceiveGoodsMutation } from '../../../hooks';
import { AuthenticatedStackParamList } from '@src/navigations/types';
import { getOrdersBasedOnUserId, placeOrder, productType } from '@src/api/order';
import { assignGoodsToOrder } from '@src/features/orders/api/assignGoodsToOrder';
import { useQueryClient } from '@tanstack/react-query';
import { queryKey } from '@src/constants/queryKey';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

const RECENT_ORDER_DAYS = 7;

/**
 * Check if an order was created within the last N days
 */
const isRecentOrder = (order: productType, days: number): boolean => {
  const createdAt = order.createdAt || order.departureDate;
  if (!createdAt) return false;
  const orderDate = new Date(createdAt);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return orderDate >= cutoff;
};

export const useReceiveGoodsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('Marchandise enregistrée avec succès!');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form hook
  const formHook = useReceiveGoodsForm({ initialQuantity: 1 });

  // Mutation hook
  const receiveGoodsMutation = useReceiveGoodsMutation();

  /**
   * After goods are created, find or create an order and assign the goods to it.
   */
  const autoAssignToOrder = useCallback(async (
    goodsId: string,
    client: { _id: string; firstName: string; lastName: string; phoneNumber?: string },
    goodsData: {
      weight: number;
      quantity: number;
      unitPrice: number;
      shippingMode?: string;
      actualCBM?: number;
      description?: string;
    },
  ): Promise<{ action: 'created_new' | 'added_to_existing'; code: string } | null> => {
    try {
      // 1. Fetch client's existing orders
      console.log('[AutoAssign] Fetching orders for client:', client._id);
      let orders: productType[] = [];
      try {
        orders = await getOrdersBasedOnUserId(client._id) || [];
      } catch (e) {
        console.log('[AutoAssign] No existing orders found, will create new');
      }
      console.log('[AutoAssign] Found', orders.length, 'orders for client');

      // 2. Find a recent active order for this client
      const activeOrder = orders.find(
        (o) => o.status === 'Active' && isRecentOrder(o, RECENT_ORDER_DAYS)
      );

      let orderId: string;
      let orderCode: string;
      let action: 'created_new' | 'added_to_existing';

      if (activeOrder && activeOrder._id) {
        console.log('[AutoAssign] Found recent active order:', activeOrder.code);
        orderId = activeOrder._id;
        orderCode = activeOrder.code || orderId;
        action = 'added_to_existing';
      } else {
        // Create a new order for this client
        console.log('[AutoAssign] No recent active order, creating new order...');
        const shippingMode = (goodsData.shippingMode || 'SEA').toLowerCase() as 'air' | 'sea';
        const totalPrice = goodsData.unitPrice * (
          shippingMode === 'air' ? goodsData.weight : (goodsData.actualCBM || 0)
        );

        const shipmentLine = shippingMode === 'air'
          ? 'AIR_ML_STANDARD'
          : 'SEA_ML_DAKAR';

        const newOrderData = {
          clientName: `${client.firstName} ${client.lastName}`.trim(),
          clientPhone: client.phoneNumber || '',
          packageWeight: goodsData.weight,
          quantity: goodsData.quantity,
          unitPrice: goodsData.unitPrice,
          shippingMode,
          packageCBM: (goodsData.actualCBM || 0).toString(),
          userId: client._id,
          status: 'Active',
          images: [],
          partenaire: 'AFA',
          shipmentLine,
          destinationCountry: 'ML',
          departureDate: new Date().toISOString(),
          priceTotal: totalPrice,
        } as productType;

        const orderPayload = {
          clientName: newOrderData.clientName,
          clientPhone: newOrderData.clientPhone,
          packageWeight: newOrderData.packageWeight,
          priceTotal: newOrderData.priceTotal,
          status: newOrderData.status,
          quantity: newOrderData.quantity,
          shippingMode: newOrderData.shippingMode,
          userId: newOrderData.userId,
          departureDate: newOrderData.departureDate,
          packageCBM: newOrderData.packageCBM,
          unitPrice: newOrderData.unitPrice,
        };
        console.log('[AutoAssign] Creating order with data:', JSON.stringify(orderPayload));

        const orderResult = await placeOrder(newOrderData);
        // placeOrder returns AxiosResponse<productType>
        const createdOrder = orderResult?.data;
        console.log('[AutoAssign] Order created:', JSON.stringify(createdOrder));

        orderId = createdOrder?._id || '';
        orderCode = createdOrder?.code || orderId;
        action = 'created_new';

        if (!orderId) {
          console.error('[AutoAssign] Order created but no _id returned');
          return null;
        }
      }

      // 3. Assign goods to the order
      console.log('[AutoAssign] Assigning goods', goodsId, 'to order', orderId);
      try {
        await assignGoodsToOrder({ orderId, goodsId });
        console.log('[AutoAssign] Goods assigned successfully');
      } catch (assignError: any) {
        console.error('[AutoAssign] Failed to assign goods:', assignError?.response?.data || assignError?.message);
        // Order was created but assignment failed — still return the order info
      }

      // 4. Invalidate order queries to refresh lists
      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });

      return { action, code: orderCode };
    } catch (error: any) {
      console.error('[AutoAssign] Error details:', JSON.stringify({
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      }));
      return null;
    }
  }, [queryClient]);

  /**
   * Handle form submission - receive goods, then auto-assign to order
   */
  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);

    // Validate client selection
    if (!formHook.selectedClient) {
      Alert.alert('Erreur', 'Veuillez sélectionner un client');
      return;
    }

    // Build submit data
    const submitData = formHook.buildSubmitData();
    if (!submitData) {
      Alert.alert('Erreur', 'Veuillez corriger les erreurs avant de continuer');
      return;
    }

    try {
      // Step 1: Receive goods
      console.log('[ReceiveGoods] Submitting goods...');
      const result = await receiveGoodsMutation.mutateAsync({
        data: submitData,
        photoUri: formHook.photoUri || undefined,
      });

      // Log full response to understand the structure
      console.log('[ReceiveGoods] Full response:', JSON.stringify(result));

      // Response shape: { success, data: { goods: {...}, order: {...}|null, orderAction }, message }
      const res = result as any;
      const resData = res?.data || res;
      const goodsObj = resData?.goods || resData;
      const orderObj = resData?.order;
      const orderAction = resData?.orderAction;
      const orderCode = orderObj?.code;
      const goodsId = goodsObj?._id || goodsObj?.goodsId;

      console.log('[ReceiveGoods] Parsed:', { orderAction, orderCode, goodsId, orderIsNull: orderObj === null });

      // Step 2: If backend created the order AND returned it, use that
      if (orderAction && orderObj && orderCode) {
        if (orderAction === 'added_to_existing') {
          setSuccessMessage(`Marchandise ajoutée à la commande ${orderCode}`);
        } else {
          setSuccessMessage(`Nouvelle commande ${orderCode} créée avec la marchandise`);
        }
      } else if (goodsId && formHook.selectedClient) {
        // Backend did NOT create the order (order is null), handle on frontend
        console.log('[ReceiveGoods] Order is null from backend, creating on frontend. GoodsId:', goodsId);
        // Backend did NOT handle order creation, do it on frontend
        console.log('[ReceiveGoods] No orderAction from backend, creating order on frontend...');
        const orderResult = await autoAssignToOrder(
          goodsId,
          formHook.selectedClient,
          {
            weight: submitData.weight,
            quantity: submitData.quantity,
            unitPrice: submitData.unitPrice,
            shippingMode: submitData.shippingMode,
            actualCBM: submitData.actualCBM,
            description: submitData.description,
          },
        );

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

      // Invalidate order queries so lists refresh
      queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });

      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('[ReceiveGoods] Error:', error?.response?.data || error?.message || error);
      const serverMessage = error?.message || error?.response?.data?.message;
      setErrorMessage(serverMessage || 'Une erreur inattendue est survenue');
    }
  }, [formHook, receiveGoodsMutation, autoAssignToOrder]);

  /**
   * Dismiss error message
   */
  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  /**
   * Handle success dialog dismissal
   */
  const dismissSuccess = useCallback(() => {
    setShowSuccessDialog(false);
    formHook.resetForm();
    setIsSubmitted(false);
    navigation.navigate('AdminGoodsList');
  }, [formHook, navigation]);

  // Watch shipping mode for UI display and validation
  const shippingMode = formHook.watch('shippingMode') || 'SEA';

  return {
    // Form-related
    form: {
      control: formHook.control,
      errors: formHook.formState.errors,
      setValue: formHook.setValue,
      watch: formHook.watch,
      shippingMode,
      selectedClient: formHook.selectedClient,
      setSelectedClient: formHook.setSelectedClient,
      photoUri: formHook.photoUri,
      setPhotoUri: formHook.setPhotoUri,
      useDimensions: formHook.useDimensions,
      setUseDimensions: formHook.setUseDimensions,
      calculatedCBM: formHook.calculatedCBM,
      totalCost: formHook.totalCost,
      isSubmitted,
      onSubmit: handleSubmit,
    },
    // UI state
    ui: {
      isSubmitting: receiveGoodsMutation.isPending,
      errorMessage,
      showSuccessDialog,
      successMessage,
    },
    // Actions
    actions: {
      dismissError,
      dismissSuccess,
    },
  };
};
