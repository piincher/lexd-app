import { useState, useCallback, useMemo } from "react";
import { showMessage } from "react-native-flash-message";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "@src/navigations/type";
import { useCreateCampaign } from "./useCampaigns";
import { useGetAllContainers } from "../../containers/hooks/useContainers";
import type { TargetSegment } from "../api/campaignApi";

type CreateCampaignNav = NavigationProp<RootStackParamList, "CreateCampaign">;

export const useCreateCampaignScreen = (navigation: CreateCampaignNav) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState<TargetSegment>("all");
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date(Date.now() + 60 * 60 * 1000));
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);

  const { mutate: createCampaign, isPending } = useCreateCampaign();
  const { data: containersData, isLoading: isLoadingContainers } = useGetAllContainers();

  const isValid = useMemo(() =>
    title.trim().length > 0 &&
    body.trim().length > 0 &&
    (segment !== "container_customers" || !!selectedContainerId),
  [title, body, segment, selectedContainerId]);

  const handleSegmentChange = useCallback((value: TargetSegment) => {
    setSegment(value);
    if (value !== "container_customers") setSelectedContainerId(null);
  }, []);

  const handleDateConfirm = useCallback(({ date }: { date?: Date }) => {
    if (date) {
      const updated = new Date(scheduledDate);
      updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      setScheduledDate(updated);
    }
    setShowDatePicker(false);
  }, [scheduledDate]);

  const handleSubmit = useCallback(() => {
    if (!title.trim()) { showMessage({ message: "Le titre est requis", type: "warning" }); return; }
    if (!body.trim()) { showMessage({ message: "Le message est requis", type: "warning" }); return; }
    if (segment === "container_customers" && !selectedContainerId) {
      showMessage({ message: "Veuillez sélectionner un conteneur", type: "warning" }); return;
    }
    if (!saveAsDraft && scheduledDate <= new Date()) {
      showMessage({ message: "La date de planification doit être dans le futur", type: "warning" }); return;
    }
    createCampaign(
      { title: title.trim(), body: body.trim(), scheduledAt: scheduledDate.toISOString(), targetSegment: segment, containerId: selectedContainerId || undefined, status: saveAsDraft ? "draft" : "scheduled" },
      {
        onSuccess: () => {
          showMessage({ message: saveAsDraft ? "Brouillon enregistré" : "Campagne planifiée avec succès", type: "success" });
          navigation.goBack();
        },
        onError: (err) => showMessage({ message: err.message, type: "danger" }),
      }
    );
  }, [title, body, segment, scheduledDate, saveAsDraft, selectedContainerId, createCampaign, navigation]);

  return {
    state: { title, body, segment, scheduledDate, saveAsDraft, showDatePicker, selectedContainerId },
    data: { containersData, isLoadingContainers },
    loading: { isPending },
    isValid,
    handlers: {
      setTitle, setBody, handleSegmentChange, setSelectedContainerId,
      setScheduledDate, setSaveAsDraft, setShowDatePicker,
      handleSubmit, handleDateConfirm,
      goBack: () => navigation.goBack(),
      navigateToNotifications: () => navigation.navigate('Notifications' as never),
    },
  };
};
