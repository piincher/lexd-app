import { useState, useMemo, useCallback } from "react";
import { Linking } from "react-native";
import { openWhatsApp } from "@src/shared/lib/openWhatsApp";
import type { AtRiskCustomer } from "../types";

export function useAtRiskScreen(customers: AtRiskCustomer[]) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [detailCustomer, setDetailCustomer] = useState<AtRiskCustomer | null>(null);
  const [winBackCustomer, setWinBackCustomer] = useState<AtRiskCustomer | null>(null);

  const filtered = useMemo(() => {
    let result = customers;

    if (activeFilter === "never") {
      result = result.filter((c) => c.neverShipped);
    } else if (activeFilter !== "all") {
      const days = parseInt(activeFilter, 10);
      result = result.filter((c) => !c.neverShipped && c.daysInactive >= days);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          (c.phoneNumber?.toLowerCase().includes(q) ?? false)
      );
    }

    return result;
  }, [customers, search, activeFilter]);

  const handleWhatsApp = useCallback((customer: AtRiskCustomer) => {
    if (customer.phoneNumber) {
      openWhatsApp(customer.phoneNumber, `Bonjour ${customer.firstName || ""}, ChinaLink Express vous remercie pour votre fidélité.`);
    }
  }, []);

  const handleCall = useCallback((customer: AtRiskCustomer) => {
    if (customer.phoneNumber) {
      Linking.openURL(`tel:${customer.phoneNumber}`);
    }
  }, []);

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filtered,
    detailCustomer,
    setDetailCustomer,
    winBackCustomer,
    setWinBackCustomer,
    handleWhatsApp,
    handleCall,
  };
}
