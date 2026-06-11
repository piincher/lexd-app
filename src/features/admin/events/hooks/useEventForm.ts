import { useEffect, useMemo, useState } from 'react';
import { CreateEventInput, ShippingRule, CampaignStep } from '../api/types';
import { emptyEvent, emptyRule, emptyStep, toEditableEvent } from '../lib/eventDefaults';
import { useEvent } from './useEventQueries';
import { useCreateEvent, useUpdateEvent } from './useEventMutations';

/**
 * Form state for creating/editing an event. Owns the editable draft plus
 * helpers to mutate the nested shipping-rule and campaign-step arrays, and a
 * submit() that routes to create or update.
 */
export const useEventForm = (id?: string) => {
  const isEdit = !!id;
  const { data, isLoading } = useEvent(id);
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();

  const [form, setForm] = useState<CreateEventInput>(emptyEvent());

  useEffect(() => {
    if (isEdit && data?.data) setForm(toEditableEvent(data.data as CreateEventInput));
  }, [isEdit, data]);

  const setField = <K extends keyof CreateEventInput>(key: K, value: CreateEventInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setTheme = (patch: Partial<CreateEventInput['theme']>) =>
    setForm((prev) => ({ ...prev, theme: { ...prev.theme, ...patch } }));

  const addRule = () => setForm((p) => ({ ...p, shippingRules: [...p.shippingRules, emptyRule()] }));
  const updateRule = (i: number, patch: Partial<ShippingRule>) =>
    setForm((p) => ({
      ...p,
      shippingRules: p.shippingRules.map((r, idx) => (idx === i ? { ...r, ...patch } : r)),
    }));
  const removeRule = (i: number) =>
    setForm((p) => ({ ...p, shippingRules: p.shippingRules.filter((_, idx) => idx !== i) }));

  const addStep = () => setForm((p) => ({ ...p, campaignSteps: [...p.campaignSteps, emptyStep()] }));
  const updateStep = (i: number, patch: Partial<CampaignStep>) =>
    setForm((p) => ({
      ...p,
      campaignSteps: p.campaignSteps.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  const removeStep = (i: number) =>
    setForm((p) => ({ ...p, campaignSteps: p.campaignSteps.filter((_, idx) => idx !== i) }));

  const validationError = useMemo(() => {
    if (!form.name.trim()) return 'Le nom est requis';
    if (!form.slug.trim()) return 'Le slug est requis';
    if (!form.liveStart || !form.eventStart || !form.liveEnd)
      return 'Les dates (début, événement, fin) sont requises';
    return null;
  }, [form]);

  const submit = async () => {
    if (validationError) throw new Error(validationError);
    if (isEdit && id) return updateMutation.mutateAsync({ id, data: form });
    return createMutation.mutateAsync(form);
  };

  return {
    form,
    isEdit,
    isLoading: isEdit && isLoading,
    isSaving: createMutation.isPending || updateMutation.isPending,
    validationError,
    setField,
    setTheme,
    addRule,
    updateRule,
    removeRule,
    addStep,
    updateStep,
    removeStep,
    submit,
  };
};
