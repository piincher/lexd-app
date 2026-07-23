import { useState, useCallback } from 'react';
import { RouteFormData } from '@src/features/admin/routes/types';

export interface FormErrors {
  name?: string;
  shippingMode?: string;
  origin?: string;
  destination?: string;
  shippingLine?: string;
  estimatedTransitDays?: string;
  waypoints?: string;
}

export const useRouteFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((formData: RouteFormData): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la route est requis';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.shippingMode) {
      newErrors.shippingMode = 'Le mode de transport est requis';
    }

    if (!formData.origin.trim()) {
      newErrors.origin = 'L\'origine est requise';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'La destination est requise';
    }

    if (formData.shippingMode === 'SEA' && !formData.shippingLine) {
      newErrors.shippingLine = 'La compagnie maritime est requise pour le mode maritime';
    }

    if (!formData.estimatedTransitDays.trim()) {
      newErrors.estimatedTransitDays = 'Le délai de transit est requis';
    } else {
      const days = parseInt(formData.estimatedTransitDays, 10);
      if (isNaN(days) || days < 1 || days > 365) {
        newErrors.estimatedTransitDays = 'Veuillez entrer un nombre valide (1-365)';
      }
    }

    const invalidWaypointIndex = formData.waypoints.findIndex((waypoint) =>
      !waypoint.location.city.trim() ||
      !waypoint.location.country.trim() ||
      !/^[A-Z]{2}$/.test((waypoint.location.countryCode || '').trim().toUpperCase()) ||
      !waypoint.description.trim()
    );
    if (invalidWaypointIndex >= 0) {
      newErrors.waypoints = `L'escale ${invalidWaypointIndex + 1} doit avoir une ville, un pays, un code pays ISO et une description.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { errors, setErrors, validateForm };
};
