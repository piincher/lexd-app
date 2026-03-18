import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import { COLORS } from "@src/constants/Colors";

import { Header } from "@src/components/Header/Header";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import { ShippingModeSelector } from "../components/ShippingModeSelector";
import { useUpdateManualOrder } from "../hooks/useUpdateManualOrder";

const editSchema = yup.object({
  clientName: yup.string().required("Nom requis").min(2, "Min 2 caractères"),
  clientPhone: yup.string().matches(/^[0-9]{8}$/, "8 chiffres requis"),
  estimatedCbm: yup.string(),
});

interface FormValues {
  clientName: string;
  clientPhone: string;
  shippingMode: "air" | "sea";
  estimatedCbm: string;
  note: string;
}

export const EditManualOrderScreen: React.FC<
  AuthenticatedStackScreenProps<"EditManualOrder">
> = ({ navigation, route }) => {
  const { order } = route.params || {};
  const { mutate, isPending } = useUpdateManualOrder({
    onSuccess: () => navigation.goBack(),
  });

  const handleSubmit = (values: FormValues) => {
    mutate({
      orderId: order._id,
      updates: {
        clientName: values.clientName,
        clientPhone: values.clientPhone,
        shippingMode: values.shippingMode,
        estimatedCbm: values.estimatedCbm ? parseFloat(values.estimatedCbm) : 0,
        note: values.note,
      },
    });
  };

  const initialValues: FormValues = {
    clientName: order?.clientName || "",
    clientPhone: order?.clientPhone || "",
    shippingMode: order?.shippingMode || "sea",
    estimatedCbm: order?.estimatedCbm?.toString() || "",
    note: order?.note || "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Modifier la commande" navigation={navigation} />
      
      <Formik
        initialValues={initialValues}
        validationSchema={editSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <ScrollView contentContainerStyle={styles.content}>
            <AuthInputField
              label="Nom du client"
              name="clientName"
              autoCapitalize="words"
            />
            
            <AuthInputField
              label="Téléphone"
              name="clientPhone"
              keyboardType="phone-pad"
              maxLength={8}
            />
            
            <ShippingModeSelector
              value={values.shippingMode}
              onChange={(mode) => setFieldValue("shippingMode", mode)}
            />
            
            <AuthInputField
              label="CBM estimé"
              name="estimatedCbm"
              keyboardType="decimal-pad"
            />
            
            <AuthInputField
              label="Notes"
              name="note"
            />
            
            <SubmitBtn
              title="Enregistrer"
              busy={isPending}
            />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
