import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { useCreateConsignee } from "./useConsignees";

export interface FormErrors {
   name?: string;
   phone?: string;
   email?: string;
   warehouseAddress?: string;
}

interface FormData {
   name: string;
   phone: string;
   email: string;
   warehouseAddress: string;
}

type UseCreateConsigneeFormReturn = {
   formData: FormData;
   errors: FormErrors;
   isPending: boolean;
   handlers: {
      updateField: (field: keyof FormData, value: string) => void;
      handleSubmit: () => void;
   };
};

export const useCreateConsigneeForm = (): UseCreateConsigneeFormReturn => {
   const navigation = useNavigation<navigationProps>();

   const [formData, setFormData] = useState<FormData>({
      name: "",
      phone: "",
      email: "",
      warehouseAddress: "",
   });

   const [errors, setErrors] = useState<FormErrors>({});

   const { mutate: createConsignee, isPending } = useCreateConsignee();

   const validateForm = useCallback((): boolean => {
      const newErrors: FormErrors = {};

      if (!formData.name.trim()) {
         newErrors.name = "Le nom est requis";
      }

      if (!formData.phone.trim()) {
         newErrors.phone = "Le numéro de téléphone est requis";
      } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone.replace(/\s/g, ""))) {
         newErrors.phone = "Numéro de téléphone invalide";
      }

      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Email invalide";
      }

      if (!formData.warehouseAddress.trim()) {
         newErrors.warehouseAddress = "L'adresse de l'entrepôt est requise";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   }, [formData]);

   const handleSubmit = useCallback(() => {
      if (!validateForm()) return;

      createConsignee(formData, {
         onSuccess: () => {
            navigation.goBack();
         },
      });
   }, [formData, validateForm, createConsignee, navigation]);

   const updateField = useCallback((field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
   }, []);

   return {
      formData,
      errors,
      isPending,
      handlers: {
         updateField,
         handleSubmit,
      },
   };
};
