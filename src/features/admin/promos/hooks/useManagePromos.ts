import { useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useAdminPromos, useDeactivatePromo } from "./usePromoAdmin";
import type { PromoRecord } from "../api/promoAdminApi";

export type FilterChip = { label: string; key: string; value?: string };

export const FILTER_CHIPS: FilterChip[] = [
  { label: "Tous", key: "all" },
  { label: "Actif", key: "active", value: "ACTIVE" },
  { label: "Inactif", key: "inactive", value: "INACTIVE" },
  { label: "Expiré", key: "expired", value: "EXPIRED" },
];

export const useManagePromos = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  const selectedChip = FILTER_CHIPS.find((c) => c.key === activeFilter)!;
  const filters = useMemo(() => (selectedChip.value ? { status: selectedChip.value } : undefined), [selectedChip]);

  const { data, isLoading, isRefetching, refetch } = useAdminPromos(filters, page);
  const deactivateMutation = useDeactivatePromo();

  const promos = data?.promos ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 20, total: 0, totalPages: 1 };

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) setPage((p) => p + 1);
  }, [page, pagination.totalPages]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) setPage((p) => p - 1);
  }, [page]);

  const handleDeactivate = useCallback((promo: PromoRecord) => {
    Alert.alert(
      "Désactiver la promotion",
      `Voulez-vous vraiment désactiver le code "${promo.code}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Désactiver",
          style: "destructive",
          onPress: () => {
            deactivateMutation.mutate(promo._id, {
              onSuccess: () => Alert.alert("Succès", "Promotion désactivée."),
              onError: (error: Error) => Alert.alert("Erreur", error.message || "Impossible de désactiver la promotion."),
            });
          },
        },
      ]
    );
  }, [deactivateMutation]);

  return {
    activeFilter,
    page,
    promos,
    pagination,
    isLoading,
    isRefetching,
    refetch,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
    handleDeactivate,
  };
};
