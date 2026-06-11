import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ContainerStatus, ContainerWaypoint, WaypointStatus } from "../types";
import { useGetWaypoints, useUpdateWaypoint, waypointQueryKeys } from "./useWaypoints";
import { containerQueryKeys } from "./useContainers";

interface UseTransitStatusManagerProps {
  containerId: string;
  containerStatus: ContainerStatus;
  waypoints?: ContainerWaypoint[];
  currentWaypointIndex?: number;
}

export const useTransitStatusManager = ({
  containerId,
  containerStatus,
  waypoints: propWaypoints,
  currentWaypointIndex: propCurrentWaypointIndex,
}: UseTransitStatusManagerProps) => {
  const queryClient = useQueryClient();
  const { data: waypointsData, isLoading: isWaypointsLoading, refetch: refetchWaypoints } = useGetWaypoints(containerId);
  const updateWaypointMutation = useUpdateWaypoint();

  const [selectedStatus, setSelectedStatus] = useState<WaypointStatus | null>(null);
  const [isArrivalAction, setIsArrivalAction] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

  const waypoints = propWaypoints ?? waypointsData?.waypoints ?? [];
  const currentWaypointIndex = propCurrentWaypointIndex ?? waypointsData?.currentWaypointIndex ?? 0;
  const isInTransit = containerStatus === "IN_TRANSIT";

  const completedCount = waypoints.filter((w, i) => i < currentWaypointIndex || w.status === "COMPLETED").length;
  const progressPercentage = waypoints.length > 0 ? Math.round((completedCount / waypoints.length) * 100) : 0;
  const currentWaypoint = waypoints[currentWaypointIndex];
  const completedWaypoints = waypoints.filter((_, index) => index < currentWaypointIndex).length;

  // "Marquer l'arrivée" applies when the container is travelling toward an
  // intermediate waypoint and hasn't been recorded as arrived yet. The origin
  // (index 0) is the start point, so arrival there isn't meaningful.
  const canMarkArrived =
    currentWaypoint?.status === "IN_PROGRESS" &&
    !currentWaypoint?.actualArrival &&
    currentWaypointIndex > 0;

  const handleOpenStatusModal = useCallback((status: WaypointStatus) => {
    setSelectedStatus(status);
    setIsArrivalAction(false);
    setModalVisible(true);
    setNotes("");
  }, []);

  const handleOpenArrivalModal = useCallback(() => {
    setSelectedStatus(null);
    setIsArrivalAction(true);
    setModalVisible(true);
    setNotes("");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedStatus(null);
    setIsArrivalAction(false);
    setNotes("");
  }, []);

  const handleConfirmStatusUpdate = useCallback(async () => {
    if (currentWaypointIndex < 0) return;
    if (!isArrivalAction && !selectedStatus) return;
    try {
      const data = isArrivalAction
        ? { actualArrival: new Date().toISOString() }
        : { status: selectedStatus as WaypointStatus, notes: notes || undefined };
      await updateWaypointMutation.mutateAsync({
        containerId,
        waypointIndex: currentWaypointIndex,
        data,
      });
      await refetchWaypoints();
      queryClient.invalidateQueries({ queryKey: waypointQueryKeys.list(containerId) });
      queryClient.invalidateQueries({ queryKey: containerQueryKeys.detail(containerId) });
      setSnackbar({
        visible: true,
        message: isArrivalAction ? "Arrivée enregistrée avec succès" : "Statut mis à jour avec succès",
        type: "success",
      });
      handleCloseModal();
    } catch (error) {
      setSnackbar({ visible: true, message: "Erreur lors de la mise à jour du statut", type: "error" });
    }
  }, [selectedStatus, isArrivalAction, currentWaypointIndex, containerId, notes, updateWaypointMutation, refetchWaypoints, queryClient, handleCloseModal]);

  const handleDismissSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  }, []);

  return {
    waypoints,
    currentWaypointIndex,
    currentWaypoint,
    completedWaypoints,
    isInTransit,
    isLoading: isWaypointsLoading,
    progressPercentage,
    modalVisible,
    selectedStatus,
    isArrivalAction,
    canMarkArrived,
    notes,
    snackbarVisible: snackbar.visible,
    snackbarMessage: snackbar.message,
    snackbarType: snackbar.type,
    updateWaypointMutation,
    handleOpenStatusModal,
    handleOpenArrivalModal,
    handleCloseModal,
    handleConfirmStatusUpdate,
    handleDismissSnackbar,
    setNotes,
  };
};
