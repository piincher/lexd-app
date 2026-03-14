/**
 * useSettingsForm Hook
 * Manages form state for settings screens
 */

import { useState, useCallback } from "react";

export interface UseSettingsFormReturn<T> {
  values: T;
  isDirty: boolean;
  isSubmitting: boolean;
  updateValue: <K extends keyof T>(key: K, value: T[K]) => void;
  updateValues: (newValues: Partial<T>) => void;
  setSubmitting: (value: boolean) => void;
  reset: (newValues?: T) => void;
  markDirty: () => void;
}

export function useSettingsForm<T extends Record<string, any>>(
  initialValues: T
): UseSettingsFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const updateValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
    setIsDirty(true);
  }, []);

  const setSubmitting = useCallback((value: boolean) => {
    setIsSubmitting(value);
  }, []);

  const reset = useCallback((newValues?: T) => {
    setValues(newValues || initialValues);
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  const markDirty = useCallback(() => {
    setIsDirty(true);
  }, []);

  return {
    values,
    isDirty,
    isSubmitting,
    updateValue,
    updateValues,
    setSubmitting,
    reset,
    markDirty,
  };
}
