import { useMemo } from "react";
import type { DimensionValue } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import type { ContainerTimeline as ContainerTimelineType, CustomerContainerStatus } from "../../types";

const STATUS_ORDER: CustomerContainerStatus[] = [
  "BOOKED",
  "EMPTY_TO_WAREHOUSE",
  "LOADING",
  "LOADED",
  "GATE_IN_FULL",
  "LOADED_ON_VESSEL",
  "IN_TRANSIT",
  "ARRIVED",
  "DISCHARGED",
  "READY_FOR_PICKUP",
  "DELIVERED",
];

const STEP_STATUS_MAP: Record<keyof ContainerTimelineType, CustomerContainerStatus> = {
  bookedAt: "BOOKED",
  emptyDispatchedAt: "EMPTY_TO_WAREHOUSE",
  loadingStartedAt: "LOADING",
  loadingCompletedAt: "LOADED",
  gateInFullAt: "GATE_IN_FULL",
  loadedOnVesselAt: "LOADED_ON_VESSEL",
  departedAt: "IN_TRANSIT",
  arrivedAt: "ARRIVED",
  dischargedAt: "DISCHARGED",
  readyForPickupAt: "READY_FOR_PICKUP",
  deliveredAt: "DELIVERED",
};

const STATUS_STEP_MAP: Record<CustomerContainerStatus, keyof ContainerTimelineType> = {
  BOOKED: "bookedAt",
  EMPTY_TO_WAREHOUSE: "emptyDispatchedAt",
  LOADING: "loadingStartedAt",
  LOADED: "loadingCompletedAt",
  GATE_IN_FULL: "gateInFullAt",
  LOADED_ON_VESSEL: "loadedOnVesselAt",
  IN_TRANSIT: "departedAt",
  ARRIVED: "arrivedAt",
  DISCHARGED: "dischargedAt",
  READY_FOR_PICKUP: "readyForPickupAt",
  DELIVERED: "deliveredAt",
};

export const useTimelineLogic = (currentStatus: CustomerContainerStatus) => {
  return useMemo(() => ({
    isStepCompleted: (stepKey: keyof ContainerTimelineType): boolean => {
      const stepIndex = STATUS_ORDER.indexOf(STEP_STATUS_MAP[stepKey]);
      const currentIndex = STATUS_ORDER.indexOf(currentStatus);
      if (stepIndex < 0 || currentIndex < 0) return false;
      return stepIndex <= currentIndex;
    },
    isCurrentStep: (stepKey: keyof ContainerTimelineType): boolean => STATUS_STEP_MAP[currentStatus] === stepKey,
    formatDate: (dateString?: string): string => {
      if (!dateString) return "En attente";
      try { return format(new Date(dateString), "dd MMM yyyy", { locale: fr }); } catch { return dateString; }
    },
    getStepIcon: (stepKey: keyof ContainerTimelineType): React.ComponentProps<typeof MaterialCommunityIcons>["name"] => {
      const iconMap: Record<keyof ContainerTimelineType, React.ComponentProps<typeof MaterialCommunityIcons>["name"]> = {
        bookedAt: "calendar-check",
        emptyDispatchedAt: "truck-outline",
        loadingStartedAt: "loading",
        loadingCompletedAt: "archive-check",
        gateInFullAt: "gate",
        loadedOnVesselAt: "ferry",
        departedAt: "airplane-takeoff",
        arrivedAt: "map-marker-check",
        dischargedAt: "archive-arrow-down",
        readyForPickupAt: "package-variant",
        deliveredAt: "check-circle",
      };
      return iconMap[stepKey];
    },
    getProgressWidth: (status: CustomerContainerStatus): DimensionValue => {
      const index = STATUS_ORDER.indexOf(status);
      if (index < 0) return "0%";
      return `${(index / (STATUS_ORDER.length - 1)) * 100}%`;
    },
  }), [currentStatus]);
};
