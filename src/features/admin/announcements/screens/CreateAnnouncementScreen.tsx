import React from "react";
import { Alert } from "react-native";
import { Screen } from "@src/shared/ui/Screen";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useCreateAnnouncement } from "../hooks/useCreateAnnouncement";
import { AnnouncementForm } from "../components/AnnouncementForm";

const CreateAnnouncementScreen: React.FC<RootStackScreenProps<"CreateAnnouncement">> = ({
  navigation,
}) => {
  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement();

  const handleSubmit = (data: Parameters<typeof createAnnouncement>[0]) => {
    createAnnouncement(data, {
      onSuccess: () => {
        Alert.alert("Succès", "L'annonce a été publiée avec succès.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      },
      onError: (error) => {
        Alert.alert("Erreur", error.message || "Impossible de publier l'annonce.");
      },
    });
  };

  return (
    <Screen
      header={{ title: "Nouvelle Annonce", showBack: true, onBackPress: () => navigation.goBack() }}
      variant="card"
    >
      <AnnouncementForm onSubmit={handleSubmit} isLoading={isPending} />
    </Screen>
  );
};

export default CreateAnnouncementScreen;
