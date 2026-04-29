import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useCreatePromo, useUpdatePromo } from "./usePromoAdmin";
import type { PromoRecord, PromoType, PromoApplicableTo, PromoTargetAudience, CreatePromoInput } from "../api/promoAdminApi";

export type PromoFormData = {
  code: string; name: string; description: string; type: PromoType; value: string;
  maxDiscount: string; minOrderAmount: string; validFrom: string; validUntil: string;
  maxUsages: string; maxPerUser: string; applicableTo: PromoApplicableTo; targetAudience: PromoTargetAudience;
};

const EMPTY_FORM: PromoFormData = {
  code: "", name: "", description: "", type: "PERCENTAGE", value: "",
  maxDiscount: "", minOrderAmount: "", validFrom: "", validUntil: "",
  maxUsages: "", maxPerUser: "1", applicableTo: "ALL", targetAudience: "ALL",
};

const promoToForm = (promo: PromoRecord): PromoFormData => ({
  code: promo.code, name: promo.name, description: promo.description || "",
  type: promo.type, value: String(promo.value),
  maxDiscount: promo.maxDiscount != null ? String(promo.maxDiscount) : "",
  minOrderAmount: promo.minOrderAmount != null ? String(promo.minOrderAmount) : "",
  validFrom: promo.validFrom ? promo.validFrom.split("T")[0] : "",
  validUntil: promo.validUntil ? promo.validUntil.split("T")[0] : "",
  maxUsages: promo.maxUsages != null ? String(promo.maxUsages) : "",
  maxPerUser: String(promo.maxPerUser),
  applicableTo: promo.applicableTo,
  targetAudience: promo.targetAudience,
});

export const usePromoForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoRecord | null>(null);
  const [form, setForm] = useState<PromoFormData>(EMPTY_FORM);
  const createMutation = useCreatePromo();
  const updateMutation = useUpdatePromo();

  const openCreateForm = useCallback(() => { setEditingPromo(null); setForm(EMPTY_FORM); setShowForm(true); }, []);
  const openEditForm = useCallback((promo: PromoRecord) => { setEditingPromo(promo); setForm(promoToForm(promo)); setShowForm(true); }, []);
  const closeForm = useCallback(() => { setShowForm(false); setEditingPromo(null); setForm(EMPTY_FORM); }, []);
  const handleFormChange = useCallback((field: keyof PromoFormData, value: string) => { setForm((prev) => ({ ...prev, [field]: value })); }, []);
  const handleOptionChange = useCallback(<K extends keyof PromoFormData>(field: K, value: PromoFormData[K]) => { setForm((prev) => ({ ...prev, [field]: value })); }, []);

  const handleSubmit = useCallback(() => {
    if (!form.code.trim() || !form.name.trim() || !form.value || !form.validFrom || !form.validUntil) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const payload: CreatePromoInput = {
      code: form.code.trim(), name: form.name.trim(), description: form.description.trim() || undefined,
      type: form.type, value: Number(form.value),
      maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : undefined,
      minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : undefined,
      validFrom: form.validFrom, validUntil: form.validUntil,
      maxUsages: form.maxUsages ? Number(form.maxUsages) : undefined,
      maxPerUser: form.maxPerUser ? Number(form.maxPerUser) : undefined,
      applicableTo: form.applicableTo, targetAudience: form.targetAudience,
    };
    if (editingPromo) {
      updateMutation.mutate({ id: editingPromo._id, data: payload }, {
        onSuccess: () => { Alert.alert("Succès", "Promotion mise à jour."); closeForm(); },
        onError: (error: Error) => Alert.alert("Erreur", error.message || "Impossible de mettre à jour la promotion."),
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => { Alert.alert("Succès", "Promotion créée avec succès."); closeForm(); },
        onError: (error: Error) => Alert.alert("Erreur", error.message || "Impossible de créer la promotion."),
      });
    }
  }, [form, editingPromo, createMutation, updateMutation, closeForm]);

  return {
    showForm, editingPromo, form,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    openCreateForm, openEditForm, closeForm, handleFormChange, handleOptionChange, handleSubmit,
  };
};
