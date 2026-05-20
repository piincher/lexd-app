import React, { useRef } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Screen } from "@src/shared/ui/Screen";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAdminAnnouncement } from "../hooks/useAnnouncements";
import { useCreateAnnouncement, useUpdateAnnouncement } from "../hooks/useCreateAnnouncement";
import { AnnouncementForm } from "../components/AnnouncementForm";
import type { CreateAnnouncementInput } from "../types/announcement.types";

const CreateAnnouncementScreen: React.FC<RootStackScreenProps<"CreateAnnouncement">> = ({
  navigation,
  route,
}) => {
  const announcementId = route.params?.announcementId;
  const isEditing = Boolean(announcementId);
  const detail = useAdminAnnouncement(announcementId);
  const create = useCreateAnnouncement();
  const update = useUpdateAnnouncement();
  const isPending = create.isPending || update.isPending;

  const handleSubmit = (data: CreateAnnouncementInput) => {
    const options = {
      onSuccess: () => {
        const message = isEditing
          ? "L'annonce a été mise à jour avec succès."
          : "L'annonce a été publiée avec succès.";
        Alert.alert("Succès", message, [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      },
      onError: (error: Error) => {
        Alert.alert("Erreur", error.message || "Impossible d'enregistrer l'annonce.");
      },
    };

    if (isEditing && announcementId) {
      update.mutate({ id: announcementId, data }, options);
      return;
    }

    create.mutate(data, options);
  };

  if (isEditing && detail.isLoading) {
    return (
      <Screen header={{ title: "Modifier l'annonce", showBack: true }} variant="card">
        <ActivityIndicator />
      </Screen>
    );
  }

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <Screen
      header={{
        title: isEditing ? "Modifier l'annonce" : "Nouvelle Annonce",
        showBack: true,
        onBackPress: () => navigation.goBack(),
      }}
      variant="card"
      scrollable={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AnnouncementForm
            key={announcementId || "new"}
            initialValues={detail.data}
            onSubmit={handleSubmit}
            isLoading={isPending}
            submitLabel={isEditing ? "Enregistrer les changements" : "Publier l'annonce"}
            onInputFocus={scrollToEnd}
          />
          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default CreateAnnouncementScreen;
