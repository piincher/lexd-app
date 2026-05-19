import { useCallback } from "react";
import { Alert } from "react-native";
import { userData } from "@src/shared/types/user";
import { useHaptics } from "./useHaptics";

export const useClientCardActions = (
  onToggleBlock: (id: string) => void,
  onDelete: (id: string) => void,
  onNavigate: (id: string) => void
) => {
  const { trigger } = useHaptics();

  const handleNavigate = useCallback(
    (client: userData) => {
      trigger("light");
      onNavigate(client._id);
    },
    [onNavigate, trigger]
  );

  const handleBlockToggle = useCallback(
    (client: userData) => {
      const isBlocked = client.blocked?.isBlocked ?? false;
      trigger("medium");
      Alert.alert(
        isBlocked ? "Débloquer le client ?" : "Bloquer le client ?",
        isBlocked
          ? `Êtes-vous sûr de vouloir débloquer ${client.firstName} ${client.lastName} ?`
          : `Êtes-vous sûr de vouloir bloquer ${client.firstName} ${client.lastName} ? Il ne pourra plus passer de commandes.`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: isBlocked ? "Débloquer" : "Bloquer",
            style: isBlocked ? "default" : "destructive",
            onPress: () => onToggleBlock(client._id),
          },
        ]
      );
    },
    [onToggleBlock, trigger]
  );

  const handleDelete = useCallback(
    (client: userData) => {
      trigger("heavy");
      Alert.alert(
        "Supprimer l'utilisateur ?",
        `Êtes-vous sûr de vouloir supprimer ${client.firstName} ${client.lastName} ? Cette action est irréversible.`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: () => onDelete(client._id),
          },
        ]
      );
    },
    [onDelete, trigger]
  );

  return { handleNavigate, handleBlockToggle, handleDelete };
};
