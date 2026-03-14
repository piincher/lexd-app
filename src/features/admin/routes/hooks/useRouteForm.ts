import { useState, useCallback } from 'react';

export interface RouteFormData {
  origin: string;
  destination: string;
  stops: string[];
  price: number;
  schedule: Date;
  shippingMode: 'air' | 'sea';
}

export const useRouteForm = () => {
  const [formData, setFormData] = useState<RouteFormData>({
    origin: '',
    destination: '',
    stops: [],
    price: 0,
    schedule: new Date(),
    shippingMode: 'sea',
  });

  const updateField = useCallback(<K extends keyof RouteFormData>(
    field: K,
    value: RouteFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addStop = useCallback((stop: string) => {
    setFormData(prev => ({ ...prev, stops: [...prev.stops, stop] }));
  }, []);

  const removeStop = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      origin: '',
      destination: '',
      stops: [],
      price: 0,
      schedule: new Date(),
      shippingMode: 'sea',
    });
  }, []);

  const validateForm = useCallback(() => {
    return !!(
      formData.origin &&
      formData.destination &&
      formData.price > 0
    );
  }, [formData]);

  return {
    formData,
    updateField,
    addStop,
    removeStop,
    resetForm,
    validateForm,
  };
};
