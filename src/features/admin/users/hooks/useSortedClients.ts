import { useMemo } from "react";
import { userData } from "@src/shared/types/user";
import { SortOption } from "./useClientManagement";

/**
 * Hook to sort clients based on selected sort option.
 */
export const useSortedClients = (clients: userData[], sortBy: SortOption): userData[] => {
  return useMemo(() => {
    const list = [...clients];
    switch (sortBy) {
      case "name_asc":
        list.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        );
        break;
      case "name_desc":
        list.sort((a, b) =>
          `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
        );
        break;
      case "status":
        list.sort((a, b) => Number(!!b.blocked?.isBlocked) - Number(!!a.blocked?.isBlocked));
        break;
      case "oldest":
        list.reverse();
        break;
      default:
        break;
    }
    return list;
  }, [clients, sortBy]);
};
