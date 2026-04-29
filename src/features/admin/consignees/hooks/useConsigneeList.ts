import { useState, useMemo } from "react";
import { useGetConsignees, useToggleConsigneeStatus } from "./useConsignees";

export const useConsigneeList = () => {
   const [searchQuery, setSearchQuery] = useState("");
   const { data: consignees, isLoading, error, refetch } = useGetConsignees();
   const { mutate: toggleStatus } = useToggleConsigneeStatus();

   const filteredConsignees = useMemo(() => {
      if (!consignees) return [];
      if (!searchQuery.trim()) return consignees;

      const query = searchQuery.toLowerCase();
      return consignees.filter(
         (consignee) =>
            consignee.name.toLowerCase().includes(query) ||
            consignee.phone.toLowerCase().includes(query)
      );
   }, [consignees, searchQuery]);

   const handleToggleStatus = (id: string, currentStatus: boolean) => {
      toggleStatus({ id, isActive: !currentStatus });
   };

   return {
      searchQuery,
      setSearchQuery,
      filteredConsignees,
      isLoading,
      error,
      refetch,
      handleToggleStatus,
   };
};
