import { useState, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useGetOrderDetails } from '../../../hooks/useOrderDetail';
import { useGetSeaRoutes } from '../../../hooks/useSeaRoutes';
import { useBalance } from '@src/shared/hooks';
import { RootStackScreenProps } from '@src/navigations/type';

export const useSeaShippingOrderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation<RootStackScreenProps<'SeaShippingOrderDetails'>['navigation']>();
  const { id } = route.params as { id: string };
  
  const [actualLocation, setActualLocation] = useState('');
  const [note, setNote] = useState('');
  const [showBalanceError, setShowBalanceError] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed' | ''>('');
  const [isPaying, setIsPaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  const { data: statusData } = useGetSeaRoutes();
  const { data: item, isPending } = useGetOrderDetails(id);
  const { data: balanceData } = useBalance();
  
  const isBalanceSufficient = (balanceData?.balance || 0) >= (item?.priceTotal || 0);
  
  useEffect(() => {
    if (showModal) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showModal]);
  
  useEffect(() => {
    const routeData = item?.route?.[item.route?.length - 1];
    const coordinateArr = routeData?.coordinates || [];
    const lastItem = coordinateArr[coordinateArr?.length - 1];
    setNote(lastItem?.note || '');
    setActualLocation(item?.currentStatus || '');
  }, [item]);
  
  const handleChat = useCallback(() => {
    navigation.navigate('SelectAdminToChatWith');
  }, [navigation]);
  
  const handlePayment = useCallback(async () => {
    if (!isBalanceSufficient) return;
    setIsPaying(true);
    // API call would go here
    setPaymentStatus('success');
    setShowModal(true);
    setIsPaying(false);
  }, [isBalanceSufficient]);
  
  const handleCloseModal = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      navigation.goBack();
    });
  }, [fadeAnim, navigation]);
  
  const getButtonColors = useCallback(() => {
    if (item?.paymentStatus === 'Paid') return ['#2abe77', '#1f7a45'];
    if (!isBalanceSufficient) return ['#8E8E8F', '#666666'];
    return ['#2abe77', '#1f7a45'];
  }, [item?.paymentStatus, isBalanceSufficient]);
  
  return {
    id,
    item,
    isPending,
    statusData,
    balanceData,
    isBalanceSufficient,
    note,
    actualLocation,
    paymentStatus,
    isPaying,
    showModal,
    fadeAnim,
    handleChat,
    handlePayment,
    handleCloseModal,
    getButtonColors,
    navigation,
  };
};
