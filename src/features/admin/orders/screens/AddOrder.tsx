import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "@src/components/Form/Form";
import AutoCalculateTotal from "../../orders/components/AutoCalculateTotal";
import { addOrderSchema } from "../constants/addOrderSchema";
import { useAddOrderForm } from "./hooks/useAddOrderForm";
import { useAddOrderImages } from "./hooks/useAddOrderImages";
import { useStyles } from "./AddOrder.styles";
import { AddOrderSnackbar } from "./AddOrderSnackbar";
import { AddOrderImageSection } from "./AddOrderImageSection";
import { AddOrderFormFields } from "./AddOrderFormFields";
import type { RootStackScreenProps } from "@src/navigations/type";

const AddOrder = ({ navigation, route }: RootStackScreenProps<"AddOrder">) => {
  const styles = useStyles();
  const form = useAddOrderForm({ navigation, route });
  const images = useAddOrderImages();

  return (
    <Form initialValues={form.initialValues} onSubmit={(values) => form.handleSubmit(values, images.selectedImages)} validationSchema={addOrderSchema}>
      <SafeAreaView>
        <AutoCalculateTotal shippingMode="sea" />
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <AddOrderSnackbar visible={form.visible} onDismiss={form.onDismissSnackBar} />
            <AddOrderImageSection
              selectedImages={images.selectedImages}
              isLoading={images.isLoading}
              colors={form.colors}
              onTakePhoto={images.takePhoto}
              onPickImage={images.pickImage}
              onDeleteImage={images.deleteImage}
            />
            <AddOrderFormFields
              shippingMode={form.shippingMode}
              handleShippingModeChange={form.handleShippingModeChange}
              pickerValue={form.pickerValue}
              categories={form.categories}
              setPickerValue={form.setPickerValue}
              setCategory={form.setCategory}
              date={form.date}
              open={form.open}
              setOpen={form.setOpen}
              onDismissSingle={form.onDismissSingle}
              onConfirmSingle={form.onConfirmSingle}
              isPending={form.isPending}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </Form>
  );
};

export default AddOrder;
