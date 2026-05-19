import { useEffect, useMemo, useState, useCallback } from "react";
import { Keyboard } from "react-native";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useGetUser } from "@src/shared/hooks/useGetUser";
import { useUpdateUser } from "./useUserManagement";
import { useSignupStore } from "@src/shared/store/signupStore";
import * as yup from "yup";
import {
  PHONE_COUNTRIES,
  getCountryCode,
  getCountry,
  normalizeNationalPhone,
} from "./useAddUserHelpers";

export interface EditClientFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

const VALID_ROLES = [
  { value: "user", label: "Client" },
  { value: "admin", label: "Admin" },
  { value: "superadmin", label: "Superadmin" },
];

const detectCountryCodeFromPhone = (phone: string): string => {
  if (!phone) return "223";
  const sorted = [...PHONE_COUNTRIES].sort((a, b) => b.code.length - a.code.length);
  const match = sorted.find((c) => phone.startsWith(c.code));
  return match?.code || "223";
};

const pickerValueFromCode = (code: string): string => {
  const country = PHONE_COUNTRIES.find((c) => c.code === code);
  return country?.pickerValue || "🇲🇱  +223";
};

const buildEditSchema = (selectedCountry: typeof PHONE_COUNTRIES[0]) =>
  yup.object({
    firstName: yup.string().trim().min(2, "Min 2 caractères").required("Prénom requis"),
    lastName: yup.string().trim().min(2, "Min 2 caractères").required("Nom requis"),
    phoneNumber: yup
      .string()
      .required("Numéro de téléphone requis")
      .test(
        "valid-country-phone",
        `Le numéro ${selectedCountry.country} doit contenir ${selectedCountry.minLength === selectedCountry.maxLength ? selectedCountry.minLength : `${selectedCountry.minLength} à ${selectedCountry.maxLength}`} chiffres.`,
        (value) => {
          const normalized = normalizeNationalPhone(value || "", selectedCountry.code);
          return normalized.length >= selectedCountry.minLength && normalized.length <= selectedCountry.maxLength;
        }
      )
      .test("valid-china-phone", "Le numéro Chine doit commencer par 1.", (value) => {
        if (selectedCountry.code !== "86") return true;
        return normalizeNationalPhone(value || "", selectedCountry.code).startsWith("1");
      }),
    email: yup.string().trim().email("Email invalide"),
    role: yup.string().oneOf(["user", "admin", "superadmin"], "Rôle invalide").required("Rôle requis"),
  });

export const useEditClient = (
  id: string,
  navigation: RootStackScreenProps<"EditClient">["navigation"]
) => {
  const { data: user, isLoading: isLoadingUser } = useGetUser(id);
  const { mutate, isPending, isSuccess } = useUpdateUser();
  const [visible, setVisible] = useState(false);

  const detectedCountryCode = useMemo(() => detectCountryCodeFromPhone(user?.phoneNumber || ""), [user?.phoneNumber]);
  const [selectedCode, setSelectedCode] = useState<string>(pickerValueFromCode(detectedCountryCode));

  useEffect(() => {
    if (user?.phoneNumber) {
      setSelectedCode(pickerValueFromCode(detectedCountryCode));
    }
  }, [user?.phoneNumber, detectedCountryCode]);

  const signUpData = useSignupStore((state) => state.updateCode);
  const signUpDataCode = useSignupStore((state) => state.signupState?.code || []);

  useEffect(() => {
    signUpData(getCountryCode(selectedCode));
  }, [selectedCode, signUpData]);

  const selectedCountry = useMemo(() => getCountry(selectedCode), [selectedCode]);
  const phoneMaxLength = selectedCountry.inputMaxLength || selectedCountry.maxLength;

  const initialValues: EditClientFormValues = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber ? user.phoneNumber.replace(detectedCountryCode, "") : "",
      email: user?.email || "",
      role: user?.role || "user",
    }),
    [user, detectedCountryCode]
  );

  const validationSchema = useMemo(() => buildEditSchema(selectedCountry), [selectedCountry]);

  useEffect(() => {
    if (isSuccess) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        navigation.goBack();
      }, 1200);
    }
  }, [isSuccess, navigation]);

  const handleSubmit = useCallback(
    async (values: EditClientFormValues) => {
      try {
        Keyboard.dismiss();
        const countryCode = getCountryCode(selectedCode);
        const nationalPhone = normalizeNationalPhone(values.phoneNumber, countryCode);
        mutate({
          id,
          user: {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            phoneNumber: countryCode + nationalPhone,
            email: values.email.trim() || undefined,
            role: values.role,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [selectedCode, mutate, id]
  );

  const onDismissSnackBar = useCallback(() => setVisible(false), []);

  return {
    initialValues,
    validationSchema,
    selectedCode,
    setSelectedCode,
    signUpDataCode,
    phoneMaxLength,
    isPending,
    isLoadingUser,
    visible,
    onDismissSnackBar,
    handleSubmit,
    roleOptions: VALID_ROLES,
  };
};
