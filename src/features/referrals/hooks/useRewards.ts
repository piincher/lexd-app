import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import {
  getMyRewards,
  getRewardLedger,
  getRewardSettings,
  updateRewardSettings,
} from '../api/rewardApi';
import { getMyRewardSummaryV2 } from '../api/rewardApi';
import type { RewardSettings } from '../types';
import { rewardSummaryV2QueryKeys } from './useRewardSummaryV2';

export const rewardQueryKeys = {
  me: ['rewards', 'me'] as const,
  settings: ['rewards', 'settings'] as const,
  ledger: ['rewards', 'ledger'] as const,
};

export const useMyRewards = () =>
  useQuery({
    queryKey: rewardQueryKeys.me,
    queryFn: getMyRewards,
  });

export const useMyRewardSummaryV2 = () =>
  useQuery({
    queryKey: rewardSummaryV2QueryKeys.summary,
    queryFn: getMyRewardSummaryV2,
  });

export interface SettingsValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof RewardSettings, string>>;
}

export const validateSettings = (form: Partial<RewardSettings>): SettingsValidationResult => {
  const errors: Partial<Record<keyof RewardSettings, string>> = {};

  if (form.cbmUnit !== undefined && (form.cbmUnit <= 0 || form.cbmUnit > 10)) {
    errors.cbmUnit = 'Doit être entre 0.01 et 10';
  }
  if (form.pointsPerCbmUnit !== undefined && (form.pointsPerCbmUnit <= 0 || form.pointsPerCbmUnit > 1000)) {
    errors.pointsPerCbmUnit = 'Doit être entre 1 et 1000';
  }
  if (form.kgUnit !== undefined && (form.kgUnit <= 0 || form.kgUnit > 1000)) {
    errors.kgUnit = 'Doit être entre 1 et 1000';
  }
  if (form.pointsPerKgUnit !== undefined && (form.pointsPerKgUnit <= 0 || form.pointsPerKgUnit > 1000)) {
    errors.pointsPerKgUnit = 'Doit être entre 1 et 1000';
  }
  if (form.pointValueFCFA !== undefined && (form.pointValueFCFA <= 0 || form.pointValueFCFA > 100000)) {
    errors.pointValueFCFA = 'Doit être entre 1 et 100 000';
  }
  if (form.maxInvoiceDiscountPercent !== undefined && (form.maxInvoiceDiscountPercent < 0 || form.maxInvoiceDiscountPercent > 100)) {
    errors.maxInvoiceDiscountPercent = 'Doit être entre 0 et 100';
  }
  if (form.minRedemptionPoints !== undefined && (form.minRedemptionPoints < 1 || form.minRedemptionPoints > 1000000)) {
    errors.minRedemptionPoints = 'Doit être entre 1 et 1 000 000';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

const numberOrDefault = (value: string, fallback: number) => {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

export const useAdminRewards = () => {
  const queryClient = useQueryClient();
  const settings = useQuery({
    queryKey: rewardQueryKeys.settings,
    queryFn: getRewardSettings,
  });
  const ledger = useQuery({
    queryKey: rewardQueryKeys.ledger,
    queryFn: getRewardLedger,
  });

  const [form, setForm] = useState<Partial<RewardSettings>>({});

  const resetForm = useCallback(() => {
    if (settings.data) {
      setForm({ ...settings.data });
    }
  }, [settings.data]);

  const updateField = useCallback((key: keyof RewardSettings, value: string | boolean) => {
    setForm((current) => {
      const next = { ...current };
      if (typeof value === 'boolean') {
        (next as Record<string, unknown>)[key] = value;
      } else {
        const num = numberOrDefault(value, 0);
        (next as Record<string, unknown>)[key] = num;
      }
      return next;
    });
  }, []);

  const validation = useMemo(() => validateSettings(form), [form]);

  const isDirty = useMemo(() => {
    if (!settings.data) return false;
    const keys = Object.keys(form) as (keyof RewardSettings)[];
    return keys.some((key) => form[key] !== settings.data[key]);
  }, [form, settings.data]);

  const updateSettings = useMutation({
    mutationFn: (payload: Partial<RewardSettings>) => updateRewardSettings(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: rewardQueryKeys.settings });
      showMessage({ message: 'Paramètres de récompense mis à jour', type: 'success' });
      setForm({ ...data });
    },
    onError: (error) => {
      showMessage({
        message: error instanceof Error ? error.message : 'Mise à jour impossible',
        type: 'danger',
      });
    },
  });

  const handleSave = useCallback(() => {
    if (!validation.isValid || !isDirty) return;
    const payload: Partial<RewardSettings> = {};
    (Object.keys(form) as (keyof RewardSettings)[]).forEach((key) => {
      const value = form[key];
      if (value !== undefined && value !== settings.data?.[key]) {
        (payload as Record<string, unknown>)[key] = value;
      }
    });
    updateSettings.mutate(payload);
  }, [form, validation.isValid, isDirty, settings.data, updateSettings]);

  return {
    settings,
    ledger,
    form,
    setForm,
    updateField,
    resetForm,
    validation,
    isDirty,
    isSaving: updateSettings.isPending,
    handleSave,
    updateSettings,
  };
};
