/**
 * usePublicTracking Hook
 * 
 * Provides public tracking functionality without requiring authentication.
 * Users can track their goods/containers using tracking numbers.
 */

import { useState } from 'react';
import { publicTrackingApi } from '../api/publicTrackingApi';
import { showMessage } from 'react-native-flash-message';

export interface TrackingResult {
  success: boolean;
  type: 'goods' | 'container' | 'order';
  data: any;
  timeline?: Array<{
    status: string;
    location: string;
    timestamp: string;
    description: string;
  }>;
  currentStatus?: string;
  estimatedDelivery?: string;
}

interface UsePublicTrackingReturn {
  track: (trackingNumber: string) => Promise<TrackingResult | null>;
  isLoading: boolean;
  error: string | null;
  lastResult: TrackingResult | null;
}

export const usePublicTracking = (): UsePublicTrackingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<TrackingResult | null>(null);

  const track = async (trackingNumber: string): Promise<TrackingResult | null> => {
    if (!trackingNumber.trim()) {
      showMessage({
        message: 'Veuillez entrer un numéro de suivi',
        type: 'warning',
        duration: 3000,
      });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await publicTrackingApi.track(trackingNumber.trim());
      
      if (result.success) {
        setLastResult(result);
        showMessage({
          message: 'Suivi trouvé !',
          description: `Statut: ${result.currentStatus || 'En cours'}`,
          type: 'success',
          duration: 3000,
        });
        return result;
      } else {
        setError(result.message || 'Numéro de suivi non trouvé');
        showMessage({
          message: 'Numéro de suivi non trouvé',
          description: 'Vérifiez votre numéro et réessayez',
          type: 'warning',
          duration: 4000,
        });
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erreur lors du suivi';
      setError(errorMessage);
      showMessage({
        message: 'Erreur de suivi',
        description: errorMessage,
        type: 'danger',
        duration: 4000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    track,
    isLoading,
    error,
    lastResult,
  };
};
