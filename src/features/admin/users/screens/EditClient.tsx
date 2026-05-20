import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@src/components/Header/Header";
import { Notification } from "@src/components/Notification/Notification";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";

import { FormBackground } from "../components/FormBackground";
import { EditClientForm } from "../components/EditClientForm";
import { useEditClient } from "../hooks/useEditClient";
import { createStyles } from "./EditClient.styles";

const EditClient = ({ route, navigation }: RootStackScreenProps<"EditClient">) => {
  const { id } = route.params;
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
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
    roleOptions,
  } = useEditClient(id, navigation);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <FormBackground />
        <Header title="Modifier le client" navigation={navigation} showNotificationBell />
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <EditClientForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            selectedCode={selectedCode}
            setSelectedCode={setSelectedCode}
            isPending={isPending}
            isLoadingUser={isLoadingUser}
            signUpDataCode={signUpDataCode}
            phoneMaxLength={phoneMaxLength}
            roleOptions={roleOptions}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Notification
        message="Utilisateur mis à jour avec succès"
        type="success"
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
      />
    </SafeAreaView>
  );
};

export default EditClient;
