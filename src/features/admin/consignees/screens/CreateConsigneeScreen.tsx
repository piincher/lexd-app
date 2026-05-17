import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCreateConsigneeScreen } from "./hooks/useCreateConsigneeScreen";
import { CreateConsigneeHeader, CreateConsigneeForm } from "../components";
import { createStyles } from "./CreateConsigneeScreen.styles";

const CreateConsigneeScreen: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = createStyles(colors);
   const { formData, errors, isPending, handlers } = useCreateConsigneeScreen();

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
         >
            <CreateConsigneeHeader onBack={handlers.handleBack} />

            <ScrollView
               style={styles.scrollView}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
            >
               <CreateConsigneeForm
                  formData={formData}
                  errors={errors}
                  isPending={isPending}
                  onFieldChange={handlers.updateField}
                  onSubmit={handlers.handleSubmit}
               />
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
};

export default CreateConsigneeScreen;
