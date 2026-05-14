import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Form from "@src/components/Form/Form";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import * as yup from "yup";
import AutoCalculateTotal from "../../orders/components/AutoCalculateTotal";
import { EditOrderImages } from "../components/EditOrderImages";
import { EditOrderForm } from "../components/EditOrderForm";
import { useEditOrderScreen } from "../hooks/useEditOrderScreen";
import { useStyles } from "./EditOrder.styles";

export { mapRange, MapRangeOptions } from "../lib/mapRange";

const signupSchema = yup.object({
  clientName: yup.string().required("Nom du client est requis"),
  clientPhone: yup.string().required("Numero de telephone est requis"),
  packageWeight: yup.string(),
  priceTotal: yup.number(),
  quantity: yup.number().required("Nombre de colis est requis"),
  packageCBM: yup.string(),
  contenairNumber: yup.string(),
  unitPrice: yup.number(),
});

const EditOrder = ({ navigation, route }: RootStackScreenProps<"EditOrder">) => {
  const { colors } = useAppTheme();
  const styles = useStyles();
  const hook = useEditOrderScreen({ navigation, route });

  return (
    <Form initialValues={hook.initialValues} onSubmit={hook.handleSubmit} validationSchema={signupSchema}>
      <SafeAreaView style={styles.safeArea}>
        <AutoCalculateTotal shippingMode="sea" />
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.keyboardAvoiding} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Snackbar visible={hook.visible} onDismiss={hook.onDismissSnackBar} style={[styles.snackbar, { backgroundColor: colors.background.card }]} duration={3000}>
              <View style={styles.snackbarContent}>
                <Text style={styles.snackbarText}>Woah Product is Added !</Text>
                <AntDesign name={"checkcircle" as any} size={24} color={colors.status.success} />
              </View>
            </Snackbar>
            <EditOrderImages selectedImages={hook.images.selectedImages} isLoading={hook.images.isLoading} onPickImage={hook.images.pickImage} onTakePhoto={hook.images.takePhoto} onDeleteImage={hook.handleDeleteImage} />
            <EditOrderForm shippingMode={hook.shippingMode} onShippingModeChange={hook.setShippingMode} pickerValue={hook.pickerValue} onPickerValueChange={(value) => { hook.setPickerValue(value); hook.setCategory(value); }} date={hook.date} onDatePress={() => hook.setOpen(true)} open={hook.open} onDismissDate={() => hook.setOpen(false)} onConfirmDate={(params) => { hook.setOpen(false); hook.setDate(params.date); }} categories={hook.categories} />
            <SubmitBtn title="Add" busy={hook.isPending} />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </Form>
  );
};

export default EditOrder;
