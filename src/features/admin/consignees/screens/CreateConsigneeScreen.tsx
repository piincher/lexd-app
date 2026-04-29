import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { navigationProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCreateConsigneeForm } from "../hooks";
import { CreateConsigneeHeader, CreateConsigneeForm } from "../components";

const CreateConsigneeScreen: React.FC = () => {
   const navigation = useNavigation<navigationProps>();
   const { colors } = useAppTheme();
   const { formData, errors, isPending, handlers } = useCreateConsigneeForm();

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
         >
            <CreateConsigneeHeader onBack={() => navigation.goBack()} />

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

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   keyboardView: {
      flex: 1,
   },
   scrollView: {
      flex: 1,
   },
});

export default CreateConsigneeScreen;
