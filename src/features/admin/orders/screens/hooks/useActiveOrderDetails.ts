import { useEffect, useState } from 'react';
import { useGetOrderDetail } from '@src/shared/hooks/useOrderDetail';
import { useGetRoutes } from '@src/shared/hooks/useRoutes';
import { useUpdateOrder, useUpdateStatusDelivery } from '../../hooks/useOrderManagement';
import { UpdateSelected } from './types';

export const useActiveOrderDetails = (id: string) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>({});
  const [coordinatesData, setCoordinatesData] = useState<{ latitude: string; location: string; longitude: string }[]>([]);
  const [note, setNote] = useState('');
  const [statusChange, setStatusChange] = useState('');
  const [actualLocation, setActualLocation] = useState('');
  const [pickerValue, setPickerValue] = useState('');
  const { data: item, isLoading, refetch } = useGetOrderDetail(id);
  const { data: Routes } = useGetRoutes();
  const { mutate: updateOrderMutate } = useUpdateOrder();
  const { mutate: updateStatusDelivery, isPending } = useUpdateStatusDelivery(id);
  const Status = Routes?.[0];
  const isDelivered = item?.status === 'Delivered' || item?.status === 'Inactive';
  const isAir = item?.shippingMode === 'air';
  const orderPrice = parseFloat(String(item?.calculatedTotal || item?.priceTotal || 0)) || 0;

  const updateOrder = (updatedSelected: UpdateSelected) => {
    if (!item) return;
    updateOrderMutate({ ...item, orderId: item._id!, currentPosition: updatedSelected } as any);
  };

  const updateDeliver = () => {
    if (!item) return;
    updateStatusDelivery({ ...item, orderId: item?.code! } as any);
  };

  const handleStepChange = (value: string, status: string, coordinates: any[]) => {
    const location = coordinates.find((loc: any) => loc.location === value);
    setStatusChange(status);
    setPickerValue(value);
    setNote(location?.note || '');
    if (location) setCoordinatesData([location]);
  };

  const updateTransiteStatus = () => {
    updateOrder({ title: statusChange, coordinates: coordinatesData, id: Math.random().toString(36).substring(7), time: new Date().toISOString(), note });
  };

  const handleCheckboxPress = (location: string, status: string, coordinates: any[]) => {
    setSelectedCheckboxes((prev) => ({ ...prev, [location]: !prev[location] }));
    updateOrder({ title: status, coordinates, id: Math.random().toString(36).substring(7), time: new Date().toISOString(), note: `La status de votre colis est : ${status} ` });
  };

  useEffect(() => {
    const lastRoute = item?.route?.[item.route?.length - 1];
    const coords = lastRoute?.coordinates || [];
    const lastCoord = coords[coords.length - 1];
    setActualLocation(lastCoord?.location || '');
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const initial = item?.route?.reduce((acc: Record<string, boolean>, r: any) => {
      r?.coordinates?.forEach((loc: any) => {
        acc[loc.location] = !!Status?.orderDetail?.some((d: any) => d.status === r.title && d.coordinates.some((c: any) => c.location === loc.location));
      });
      return acc;
    }, {} as Record<string, boolean>);
    setSelectedCheckboxes(initial || {});
  }, [item, Status]);

  return {
    item, isLoading, refetch, Status, isDelivered, isAir, orderPrice,
    selectedCheckboxes, note, actualLocation, pickerValue, isPending,
    updateDeliver, handleStepChange, updateTransiteStatus, handleCheckboxPress,
  };
};
