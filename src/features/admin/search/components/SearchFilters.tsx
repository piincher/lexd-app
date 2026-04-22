/**
 * SearchFilters - Advanced filter panel for search results
 * Supports date range, status multi-select, shipping line filter, client filter
 */

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@src/constants/Theme";
import { SearchFilters as SearchFiltersType, FilterPreset } from "../api/searchApi";

interface SearchFiltersProps {
  entity: "goods" | "containers" | "clients";
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onReset: () => void;
  presets?: FilterPreset[];
  onPresetSelect?: (preset: FilterPreset) => void;
}

// Status options for each entity
const GOODS_STATUSES = [
  { value: "RECEIVED_AT_WAREHOUSE", label: "Entrepôt", color: "#6366F1" },
  { value: "PACKED", label: "Préparé", color: "#7C4DFF" },
  { value: "ASSIGNED_TO_CONTAINER", label: "Assigné", color: "#8B5CF6" },
  { value: "LOADED_IN_CONTAINER", label: "Chargé", color: "#EC4899" },
  { value: "IN_TRANSIT", label: "Transit", color: "#F59E0B" },
  { value: "ARRIVED_DESTINATION", label: "Arrivé", color: "#10B981" },
  { value: "READY_FOR_PICKUP", label: "À récupérer", color: "#14B8A6" },
  { value: "DELIVERED", label: "Livré", color: "#22C55E" },
];

const GOODS_PAYMENT_STATUSES = [
  { value: "UNPAID", label: "Non payé", color: "#EF4444" },
  { value: "PARTIAL", label: "Partiel", color: "#F59E0B" },
  { value: "PAID", label: "Payé", color: "#10B981" },
];

const CONTAINER_STATUSES = [
  { value: "BOOKED", label: "Réservé", color: "#6366F1" },
  { value: "EMPTY_TO_WAREHOUSE", label: "Vide → Entrepôt", color: "#8B5CF6" },
  { value: "LOADING", label: "Chargement", color: "#EC4899" },
  { value: "LOADED", label: "Chargé", color: "#F59E0B" },
  { value: "IN_TRANSIT", label: "Transit", color: "#3B82F6" },
  { value: "ARRIVED", label: "Arrivé", color: "#10B981" },
  { value: "READY_FOR_PICKUP", label: "À récupérer", color: "#14B8A6" },
];

const SHIPPING_MODES = [
  { value: "SEA", label: "Maritime", icon: "ferry" },
  { value: "AIR", label: "Aérien", icon: "airplane" },
];

const SHIPPING_LINES = [
  { value: "MSC", label: "MSC" },
  { value: "MAERSK", label: "Maersk" },
  { value: "CMA_CGM", label: "CMA CGM" },
  { value: "HAPAG_LLOYD", label: "Hapag-Lloyd" },
];

const CLIENT_ROLES = [
  { value: "user", label: "Client" },
  { value: "staff", label: "Staff" },
  { value: "admin", label: "Admin" },
  { value: "superadmin", label: "Superadmin" },
];

const CLIENT_STATUSES = [
  { value: true, label: "Actif", color: "#10B981" },
  { value: false, label: "Inactif", color: "#EF4444" },
];

const CLIENT_BALANCE_OPTIONS = [
  { value: true, label: "Avec solde", color: "#6366F1" },
  { value: false, label: "Sans solde", color: "#94A3B8" },
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  entity,
  filters,
  onFiltersChange,
  onReset,
  presets = [],
  onPresetSelect,
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const toggleStatus = (status: string) => {
    const currentStatuses = Array.isArray(filters.status) 
      ? filters.status 
      : filters.status 
      ? [filters.status] 
      : [];
    
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
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

    onFiltersChange({
      ...filters,
      paymentStatus: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const setShippingMode = (mode: string) => {
    onFiltersChange({
      ...filters,
      shippingMode: filters.shippingMode === mode ? undefined : mode,
    });
  };

  const setShippingLine = (line: string) => {
    onFiltersChange({
      ...filters,
      shippingLine: filters.shippingLine === line ? undefined : line,
    });
  };

  const setDateRange = (type: "from" | "to", date: string) => {
    onFiltersChange({
      ...filters,
      [type === "from" ? "dateFrom" : "dateTo"]: date,
    });
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

    onFiltersChange({
      ...filters,
      role: newRoles.length > 0 ? newRoles : undefined,
    });
  };

  const setIsActive = (isActive: boolean | undefined) => {
    onFiltersChange({
      ...filters,
      isActive: filters.isActive === isActive ? undefined : isActive,
    });
  };

  const setHasBalance = (hasBalance: boolean | undefined) => {
    onFiltersChange({
      ...filters,
      hasBalance: filters.hasBalance === hasBalance ? undefined : hasBalance,
    });
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  const renderGoodsFilters = () => (
    <>
      {/* Status Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Statut</Text>
        <View style={styles.chipContainer}>
          {GOODS_STATUSES.map((status) => (
            <Chip
              key={status.value}
              selected={
                Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value
              }
              onPress={() => toggleStatus(status.value)}
              style={[
                styles.chip,
                (Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value) && {
                  backgroundColor: status.color + "20",
                },
              ]}
              textStyle={[
                styles.chipText,
                (Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value) && {
                  color: status.color,
                },
              ]}
            >
              {status.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Payment Status Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Statut de paiement</Text>
        <View style={styles.chipContainer}>
          {GOODS_PAYMENT_STATUSES.map((status) => (
            <Chip
              key={status.value}
              selected={
                Array.isArray(filters.paymentStatus)
                  ? filters.paymentStatus.includes(status.value)
                  : filters.paymentStatus === status.value
              }
              onPress={() => togglePaymentStatus(status.value)}
              style={[
                styles.chip,
                (Array.isArray(filters.paymentStatus)
                  ? filters.paymentStatus.includes(status.value)
                  : filters.paymentStatus === status.value) && {
                  backgroundColor: status.color + "20",
                },
              ]}
              textStyle={[
                styles.chipText,
                (Array.isArray(filters.paymentStatus)
                  ? filters.paymentStatus.includes(status.value)
                  : filters.paymentStatus === status.value) && {
                  color: status.color,
                },
              ]}
            >
              {status.label}
            </Chip>
          ))}
        </View>
      </View>
    </>
  );

  const renderContainerFilters = () => (
    <>
      {/* Status Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Statut</Text>
        <View style={styles.chipContainer}>
          {CONTAINER_STATUSES.map((status) => (
            <Chip
              key={status.value}
              selected={
                Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value
              }
              onPress={() => toggleStatus(status.value)}
              style={[
                styles.chip,
                (Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value) && {
                  backgroundColor: status.color + "20",
                },
              ]}
              textStyle={[
                styles.chipText,
                (Array.isArray(filters.status)
                  ? filters.status.includes(status.value)
                  : filters.status === status.value) && {
                  color: status.color,
                },
              ]}
            >
              {status.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Shipping Mode Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Mode de transport</Text>
        <View style={styles.chipContainer}>
          {SHIPPING_MODES.map((mode) => (
            <Chip
              key={mode.value}
              selected={filters.shippingMode === mode.value}
              onPress={() => setShippingMode(mode.value)}
              style={[
                styles.chip,
                filters.shippingMode === mode.value && styles.chipSelected,
              ]}
              textStyle={[
                styles.chipText,
                filters.shippingMode === mode.value && styles.chipTextSelected,
              ]}
              icon={mode.icon as any}
            >
              {mode.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Shipping Line Filter */}
      {filters.shippingMode !== "AIR" && (
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Compagnie maritime</Text>
          <View style={styles.chipContainer}>
            {SHIPPING_LINES.map((line) => (
              <Chip
                key={line.value}
                selected={filters.shippingLine === line.value}
                onPress={() => setShippingLine(line.value)}
                style={[
                  styles.chip,
                  filters.shippingLine === line.value && styles.chipSelected,
                ]}
                textStyle={[
                  styles.chipText,
                  filters.shippingLine === line.value && styles.chipTextSelected,
                ]}
              >
                {line.label}
              </Chip>
            ))}
          </View>
        </View>
      )}
    </>
  );

  const renderClientFilters = () => (
    <>
      {/* Account Status Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Statut du compte</Text>
        <View style={styles.chipContainer}>
          {CLIENT_STATUSES.map((status) => (
            <Chip
              key={status.label}
              selected={filters.isActive === status.value}
              onPress={() => setIsActive(status.value)}
              style={[
                styles.chip,
                filters.isActive === status.value && {
                  backgroundColor: status.color + "20",
                },
              ]}
              textStyle={[
                styles.chipText,
                filters.isActive === status.value && {
                  color: status.color,
                },
              ]}
            >
              {status.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Balance Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Solde</Text>
        <View style={styles.chipContainer}>
          {CLIENT_BALANCE_OPTIONS.map((option) => (
            <Chip
              key={option.label}
              selected={filters.hasBalance === option.value}
              onPress={() => setHasBalance(option.value)}
              style={[
                styles.chip,
                filters.hasBalance === option.value && {
                  backgroundColor: option.color + "20",
                },
              ]}
              textStyle={[
                styles.chipText,
                filters.hasBalance === option.value && {
                  color: option.color,
                },
              ]}
            >
              {option.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Role Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Rôle</Text>
        <View style={styles.chipContainer}>
          {CLIENT_ROLES.map((role) => (
            <Chip
              key={role.value}
              selected={
                Array.isArray(filters.role)
                  ? filters.role.includes(role.value)
                  : filters.role === role.value
              }
              onPress={() => toggleRole(role.value)}
              style={[
                styles.chip,
                (Array.isArray(filters.role)
                  ? filters.role.includes(role.value)
                  : filters.role === role.value) && styles.chipSelected,
              ]}
              textStyle={[
                styles.chipText,
                (Array.isArray(filters.role)
                  ? filters.role.includes(role.value)
                  : filters.role === role.value) && styles.chipTextSelected,
              ]}
            >
              {role.label}
            </Chip>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Header with Presets */}
      <View style={styles.header}>
        <Text style={styles.title}>Filtres</Text>
        <View style={styles.headerActions}>
          {presets.length > 0 && (
            <TouchableOpacity
              style={styles.presetButton}
              onPress={() => setShowPresets(true)}
            >
              <Ionicons name="bookmark" size={16} color={Theme.primary[500]} />
              <Text style={styles.presetButtonText}>Préréglages</Text>
            </TouchableOpacity>
          )}
          {hasActiveFilters && (
            <TouchableOpacity onPress={onReset}>
              <Text style={styles.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {entity === "goods" && renderGoodsFilters()}
        {entity === "containers" && renderContainerFilters()}
        {entity === "clients" && renderClientFilters()}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Filtres actifs</Text>
            <View style={styles.summaryChips}>
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                return (
                  <Chip
                    key={key}
                    onClose={() => {
                      const newFilters = { ...filters };
                      delete newFilters[key as keyof SearchFiltersType];
                      onFiltersChange(newFilters);
                    }}
                    style={styles.summaryChip}
                  >
                    {key}: {Array.isArray(value) ? value.join(", ") : value.toString()}
                  </Chip>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Apply Button */}
      <LinearGradient
        colors={["transparent", "#FFFFFF"]}
        style={styles.footer}
      >
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.applyButton}
          buttonColor={Theme.primary[500]}
        >
          Appliquer les filtres
        </Button>
      </LinearGradient>

      {/* Presets Modal */}
      <Modal
        visible={showPresets}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPresets(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres prédéfinis</Text>
              <TouchableOpacity onPress={() => setShowPresets(false)}>
                <Ionicons name="close" size={24} color={Theme.neutral[600]} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {presets
                .filter((p) => p.entity === entity)
                .map((preset) => (
                  <TouchableOpacity
                    key={preset.id}
                    style={styles.presetItem}
                    onPress={() => {
                      onPresetSelect?.(preset);
                      setShowPresets(false);
                    }}
                  >
                    <View style={styles.presetIconContainer}>
                      <Ionicons
                        name={preset.icon as any}
                        size={20}
                        color={Theme.primary[500]}
                      />
                    </View>
                    <View style={styles.presetInfo}>
                      <Text style={styles.presetName}>{preset.name}</Text>
                      <Text style={styles.presetDescription}>
                        {preset.description}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={Theme.neutral[400]}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  presetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.md,
  },
  presetButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.primary[500],
  },
  resetText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.status.error,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  filterSection: {
    marginBottom: Theme.spacing.xl,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.sm,
  },
  chip: {
    backgroundColor: Theme.neutral[100],
  },
  chipSelected: {
    backgroundColor: Theme.primary[100],
  },
  chipText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
  chipTextSelected: {
    color: Theme.primary[600],
  },
  summarySection: {
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.neutral[500],
    marginBottom: Theme.spacing.sm,
  },
  summaryChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.sm,
  },
  summaryChip: {
    backgroundColor: Theme.primary[50],
  },
  footer: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  applyButton: {
    borderRadius: Theme.radius.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: Theme.radius["2xl"],
    borderTopRightRadius: Theme.radius["2xl"],
    maxHeight: "70%",
    paddingBottom: Theme.spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  presetItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  presetIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.primary[50],
    justifyContent: "center",
    alignItems: "center",
    marginRight: Theme.spacing.md,
  },
  presetInfo: {
    flex: 1,
  },
  presetName: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.neutral[800],
    marginBottom: 2,
  },
  presetDescription: {
    fontSize: 13,
    color: Theme.neutral[500],
  },
});

export default SearchFilters;
