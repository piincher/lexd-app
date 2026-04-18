/**
 * usePublicTrackingResult Hook
 * 
 * Handles all logic for PublicTrackingResultScreen including:
 * - Route params extraction
 * - Status configuration
 * - Share handler
 * - Navigation handlers
 */

import { useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PublicStackScreenProps } from '@src/navigations/type';

interface StatusConfig {
  color: string;
  icon: string;
  label: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  received: { color: '#6366F1', icon: 'package-variant', label: 'Reçu' },
  in_container: { color: '#3B82F6', icon: 'ferry', label: 'En Container' },
  shipped: { color: '#0EA5E9', icon: 'ferry', label: 'Expédié' },
  in_transit: { color: '#F59E0B', icon: 'truck-fast', label: 'En Transit' },
  arrived: { color: '#10B981', icon: 'map-marker-check', label: 'Arrivé' },
  delivered: { color: '#059669', icon: 'check-circle', label: 'Livré' },
  pending: { color: '#6B7280', icon: 'clock-outline', label: 'En Attente' },
};

export interface TimelineEvent {
  status: string;
  location: string;
  timestamp: string;
  description?: string;
}

export interface TrackingData {
  type: 'goods' | 'container';
  data?: {
    description?: string;
    category?: string;
    weightKg?: number;
    cbm?: number;
    quantity?: number;
    containerNumber?: string;
    shippingLine?: string;
    destination?: string;
  };
  currentStatus?: string;
  estimatedDelivery?: string;
  timeline?: TimelineEvent[];
}

export const usePublicTrackingResult = () => {
  const navigation = useNavigation();
  const route = useRoute<PublicStackScreenProps<'PublicTrackingResult'>['route']>();
  
  const { trackingNumber, data } = route.params;

  const getStatusConfig = useCallback((status: string): StatusConfig => {
    return STATUS_CONFIG[status] || { color: '#6B7280', icon: 'help-circle', label: status };
  }, []);

  const statusConfig = useMemo(() => 
    getStatusConfig(data.currentStatus || 'pending'),
    [data.currentStatus, getStatusConfig]
  );

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `Suivez mon envoi ChinaLink Express: ${trackingNumber}`,
        title: 'Suivi ChinaLink Express',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [trackingNumber]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogin = useCallback(() => {
    navigation.navigate('Login' as never);
  }, [navigation]);

  return {
    trackingNumber,
    data: data as TrackingData,
    statusConfig,
    getStatusConfig,
    handleShare,
    handleBack,
    handleLogin,
  };
};
