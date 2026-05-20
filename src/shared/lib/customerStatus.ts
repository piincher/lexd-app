export const CUSTOMER_GOODS_STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: "Reçu à l'entrepôt",
  PACKED: "Préparé pour l'envoi",
  ASSIGNED_TO_CONTAINER: "Assigné à un envoi",
  LOADED_IN_CONTAINER: "Chargé dans l'envoi",
  IN_TRANSIT: "En transit",
  ARRIVED_DESTINATION: "Arrivé à destination",
  READY_FOR_PICKUP: "Prêt pour retrait",
  DELIVERED: "Livré",
};

export const CUSTOMER_GOODS_STEP_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: "Reçu",
  PACKED: "Préparé",
  ASSIGNED_TO_CONTAINER: "Assigné",
  LOADED_IN_CONTAINER: "Chargé",
  IN_TRANSIT: "Transit",
  ARRIVED_DESTINATION: "Arrivé",
  READY_FOR_PICKUP: "Retrait",
  DELIVERED: "Livré",
};

export const CUSTOMER_ORDER_STATUS_LABELS: Record<string, string> = {
  Inactive: "En attente",
  Active: "En préparation",
  "In Transit": "En transit",
  Arrived: "Arrivé",
  Delivered: "Livré",
};

export const CUSTOMER_CONTAINER_STATUS_LABELS: Record<string, string> = {
  BOOKED: "Envoi planifié",
  EMPTY_TO_WAREHOUSE: "Préparation au chargement",
  LOADING: "Chargement en cours",
  LOADED: "Chargé",
  GATE_IN_FULL: "Au port de départ",
  LOADED_ON_VESSEL: "Chargé sur le navire",
  IN_TRANSIT: "En route vers Bamako",
  ARRIVED: "Arrivé à destination",
  DISCHARGED: "Déchargé",
  READY_FOR_PICKUP: "Prêt pour retrait",
  DELIVERED: "Livré",
};

export const CUSTOMER_AIR_STATUS_LABELS: Record<string, string> = {
  CREATED: "Expédition créée",
  PACKING: "Préparation en cours",
  READY_FOR_DEPARTURE: "Prêt au départ",
  IN_TRANSIT: "En transit aérien",
  ARRIVED: "Arrivé à destination",
  READY_FOR_PICKUP: "Prêt pour retrait",
  DELIVERED: "Livré",
};

export const customerStatusLabel = (
  labels: Record<string, string>,
  status?: string | null,
  fallback = "Statut à confirmer",
): string => {
  if (!status) return fallback;
  return labels[status] || status;
};
