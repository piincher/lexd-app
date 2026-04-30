import { SearchFilters } from "../api/searchApi";

export const useSearchFilters = (
  filters: SearchFilters,
  onFiltersChange: (filters: SearchFilters) => void
) => {
  const toggleStatus = (status: string) => {
    const currentStatuses = Array.isArray(filters.status)
      ? filters.status
      : filters.status
      ? [filters.status]
      : [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];
    onFiltersChange({ ...filters, status: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const togglePaymentStatus = (status: string) => {
    const currentStatuses = Array.isArray(filters.paymentStatus)
      ? filters.paymentStatus
      : filters.paymentStatus
      ? [filters.paymentStatus]
      : [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];
    onFiltersChange({ ...filters, paymentStatus: newStatuses.length > 0 ? newStatuses : undefined });
  };

  const setShippingMode = (mode: string) => {
    onFiltersChange({ ...filters, shippingMode: filters.shippingMode === mode ? undefined : mode });
  };

  const setShippingLine = (line: string) => {
    onFiltersChange({ ...filters, shippingLine: filters.shippingLine === line ? undefined : line });
  };

  const setDateRange = (type: "from" | "to", date: string) => {
    onFiltersChange({ ...filters, [type === "from" ? "dateFrom" : "dateTo"]: date });
  };

  const toggleRole = (role: string) => {
    const currentRoles = Array.isArray(filters.role)
      ? filters.role
      : filters.role
      ? [filters.role]
      : [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    onFiltersChange({ ...filters, role: newRoles.length > 0 ? newRoles : undefined });
  };

  const setIsActive = (isActive: boolean | undefined) => {
    onFiltersChange({ ...filters, isActive: filters.isActive === isActive ? undefined : isActive });
  };

  const setHasBalance = (hasBalance: boolean | undefined) => {
    onFiltersChange({ ...filters, hasBalance: filters.hasBalance === hasBalance ? undefined : hasBalance });
  };

  const removeFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return {
    toggleStatus,
    togglePaymentStatus,
    setShippingMode,
    setShippingLine,
    setDateRange,
    toggleRole,
    setIsActive,
    setHasBalance,
    removeFilter,
    hasActiveFilters,
  };
};
