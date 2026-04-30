import React from "react";
import { ActivityIndicator, Alert } from "react-native";
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

  return (
    <Screen
      header={{
        title: isEditing ? "Modifier l'annonce" : "Nouvelle Annonce",
        showBack: true,
        onBackPress: () => navigation.goBack(),
      }}
      variant="card"
    >
      <AnnouncementForm
        key={announcementId || "new"}
        initialValues={detail.data}
        onSubmit={handleSubmit}
        isLoading={isPending}
        submitLabel={isEditing ? "Enregistrer les changements" : "Publier l'annonce"}
      />
    </Screen>
  );
};

export default CreateAnnouncementScreen;
