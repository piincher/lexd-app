import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { Text, Button } from "react-native-paper";
import { AuthenticatedStackScreenProps } from "@src/navigation/types";
import { COLORS } from "@src/constants/Colors";
import { Header } from "@src/components/Header/Header";

import { manualOrderSchema, ManualOrderFormValues } from "../validation/manualOrderSchema";
import { useCreateManualOrder } from "../hooks/useCreateManualOrder";
import { ShippingModeSelector } from "../components/ShippingModeSelector";
import { OrderTypeSelector } from "../components/OrderTypeSelector";
import { EstimatedCbmInput } from "../components/EstimatedCbmInput";
import { UserSearch } from "../../users/components/UserSearch";
import { User } from "../../users/api/searchUsers";

const initialValues: ManualOrderFormValues = {
  clientName: "",
  clientPhone: "",
  userId: "",
  shippingMode: "sea",
  shipmentLine: "SEA_ML_DAKAR",
  estimatedCbm: "",
  orderType: "standard",
  notes: "",
};

export const ManualOrderScreen: React.FC<AuthenticatedStackScreenProps<"ManualOrder">> = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { mutate, isPending } = useCreateManualOrder({
    onSuccess: () => navigation.goBack(),
  });

  const handleSubmit = (values: ManualOrderFormValues) => {
    if (__DEV__) {
      console.log("[ManualOrderScreen] Submitting:", values);
    }
    mutate({
      ...values,
      userId: selectedUser?._id,
      estimatedCbm: values.orderType === "prebooking" ? parseFloat(values.estimatedCbm) || 0 : 0,
      manualOrderStatus: values.orderType === "prebooking" ? "PREBOOKING" : "AWAITING_GOODS",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Créer une commande manuelle" navigation={navigation} />
      <Formik
        initialValues={initialValues}
        validationSchema={manualOrderSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ 
          values, 
          errors, 
          setFieldValue, 
          setFieldTouched,
          validateForm,
          handleSubmit, 
          isValid,
        }) => {
          // Check if required fields have values (custom validation check)
          const hasRequiredFields = 
            values.clientName && 
            values.clientName.length >= 2 &&
            values.clientPhone && 
            values.clientPhone.length >= 8;
          
          const canSubmit = hasRequiredFields && !isPending;
          
          if (__DEV__) {
            console.log("[Formik] canSubmit:", canSubmit, "values:", values);
          }
          
          const handleSelectUser = async (user: User | null) => {
            setSelectedUser(user);
            if (user) {
              // Set values and mark as touched
              await setFieldValue("clientName", `${user.firstName} ${user.lastName}`, true);
              await setFieldValue("clientPhone", user.phoneNumber, true);
              await setFieldValue("userId", user._id, true);
              
              // Mark fields as touched
              setFieldTouched("clientName", true);
              setFieldTouched("clientPhone", true);
              
              // Trigger validation
              validateForm();
            }
          };
          
          return (
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <OrderTypeSelector 
                value={values.orderType} 
                onChange={(type) => setFieldValue("orderType", type)} 
              />
              
              <UserSearch
                onSelectUser={handleSelectUser}
                selectedUser={selectedUser}
              />
              
              {/* Show validation errors */}
              {errors.clientName && (
                <Text style={styles.error}>{errors.clientName}</Text>
              )}
              {errors.clientPhone && (
                <Text style={styles.error}>{errors.clientPhone}</Text>
              )}

              <ShippingModeSelector
                value={values.shippingMode}
                onChange={(mode) => {
                  setFieldValue("shippingMode", mode);
                  setFieldValue("shipmentLine", mode === "air" ? "AIR_ML_STANDARD" : "SEA_ML_DAKAR");
                }}
              />

              <EstimatedCbmInput visible={values.orderType === "prebooking"} />
              
              {values.orderType === "prebooking" && errors.estimatedCbm && (
                <Text style={styles.error}>{errors.estimatedCbm}</Text>
              )}

              <View style={styles.submitContainer}>
                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isPending}
                  disabled={!canSubmit}
                  style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
                  contentStyle={styles.submitButtonContent}
                  buttonColor={canSubmit ? undefined : COLORS.grey}
                >
                  CRÉER LA COMMANDE
                </Button>
                
                {__DEV__ && !canSubmit && (
                  <View style={styles.debugContainer}>
                    <Text style={styles.debugText}>Champs requis:</Text>
                    {!values.clientName && (
                      <Text style={styles.debugError}>❌ Nom du client manquant</Text>
                    )}
                    {!values.clientPhone && (
                      <Text style={styles.debugError}>❌ Téléphone manquant</Text>
                    )}
                    {values.clientName && values.clientPhone && (
                      <Text style={styles.debugSuccess}>✅ Tous les champs sont remplis</Text>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.white 
  },
  scrollContent: { 
    padding: 16 
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  submitContainer: { 
    marginTop: 24, 
    marginBottom: 32 
  },
  submitButton: {
    borderRadius: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  debugContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#e65100",
    marginBottom: 8,
  },
  debugError: {
    fontSize: 11,
    color: "#c62828",
    marginTop: 2,
  },
  debugSuccess: {
    fontSize: 11,
    color: "#2e7d32",
    marginTop: 2,
  },
});
