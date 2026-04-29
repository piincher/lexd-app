import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import {
  useAdminCampaigns,
  useCancelCampaign,
  useSendCampaignNow,
} from "./useCampaigns";
import type { CampaignStatus } from "../api/campaignApi";
import type { FilterKey } from "../lib/campaignHelpers";

export const useCampaignList = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [sendingId, setSendingId] = useState<string | null>(null);

  const statusFilter =
    activeFilter === "all" ? undefined : (activeFilter as CampaignStatus);

  const { data, isLoading, refetch } = useAdminCampaigns(
    statusFilter ? { status: statusFilter } : undefined
  );

  const { mutate: cancel } = useCancelCampaign();
  const { mutate: sendNow } = useSendCampaignNow();

  const handleCancel = useCallback(
    (id: string) => {
      Alert.alert(
        "Annuler la campagne",
        "Êtes-vous sûr de vouloir annuler cette campagne ?",
        [
          { text: "Non", style: "cancel" },
          {
            text: "Oui, annuler",
            style: "destructive",
            onPress: () =>
              cancel(id, {
                onSuccess: () =>
                  showMessage({ message: "Campagne annulée", type: "success" }),
                onError: (err: Error) =>
                  showMessage({ message: err.message, type: "danger" }),
              }),
          },
        ]
      );
    },
    [cancel]
  );

  const handleSendNow = useCallback(
    (id: string) => {
      Alert.alert(
        "Envoyer maintenant",
        "Cette campagne sera envoyée immédiatement à tous les destinataires ciblés.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Envoyer",
            onPress: () => {
              setSendingId(id);
              sendNow(id, {
                onSuccess: (result) => {
                  showMessage({
                    message: `Envoyé à ${result.sentCount} utilisateurs`,
                    type: "success",
                  });
                  setSendingId(null);
                },
                onError: (err: Error) => {
                  showMessage({ message: err.message, type: "danger" });
                  setSendingId(null);
                },
              });
            },
          },
        ]
      );
    },
    [sendNow]
  );

  return {
    campaigns: data?.campaigns ?? [],
    isLoading,
    refetch,
    activeFilter,
    setActiveFilter,
    sendingId,
    handleCancel,
    handleSendNow,
  };
};
