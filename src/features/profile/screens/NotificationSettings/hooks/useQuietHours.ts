import { useState, useCallback } from 'react';
import { apiClientV2 } from '@src/api/client';

export interface QuietHours {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export const useQuietHours = () => {
  const [quietHours, setQuietHours] = useState<QuietHours>({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  });
  const [showQuietHoursDialog, setShowQuietHoursDialog] = useState(false);

  const handleQuietHoursToggle = useCallback(async (value: boolean) => {
    const updated = { ...quietHours, enabled: value };
    setQuietHours(updated);
    try {
      await apiClientV2.put('/users/preferences', { quietHours: updated });
    } catch (error) {
      console.warn('Quiet hours toggle save not implemented on backend:', error);
    }
  }, [quietHours]);

  const handleQuietHoursSave = useCallback(async (startTime: string, endTime: string) => {
    const updated = { ...quietHours, startTime, endTime };
    setQuietHours(updated);
    try {
      await apiClientV2.put('/users/preferences', { quietHours: updated });
    } catch (error) {
      console.warn('Quiet hours save not implemented on backend:', error);
    }
  }, [quietHours]);

  return {
    quietHours,
    showQuietHoursDialog,
    setShowQuietHoursDialog,
    handleQuietHoursToggle,
    handleQuietHoursSave,
  };
};
