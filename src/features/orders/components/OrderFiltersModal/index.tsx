import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, Divider } from "react-native-paper";
import { COLORS } from "@src/constants/Colors";
import { ManualOrderFilters } from "../../hooks/useManualOrderFilters";

interface OrderFiltersModalProps {
  visible: boolean;
  filters: ManualOrderFilters;
  onDismiss: () => void;
  onApply: (filters: ManualOrderFilters) => void;
  onClear: () => void;
}

export const OrderFiltersModal: React.FC<OrderFiltersModalProps> = ({
  visible,
  filters,
  onDismiss,
  onApply,
  onClear,
}) => {
  const [localFilters, setLocalFilters] = React.useState<ManualOrderFilters>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [visible]);

  const handleApply = () => {
    onApply(localFilters);
    onDismiss();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClear();
  };

  const updateLocalFilter = <K extends keyof ManualOrderFilters>(
    key: K,
    value: ManualOrderFilters[K]
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.title}>Filtres avancés</Text>
        
        <ScrollView style={styles.content}>
          {/* Status Filter */}
          <Text style={styles.sectionTitle}>Statut</Text>
          <View style={styles.statusButtons}>
            {["PREBOOKING", "AWAITING_GOODS", "LINKED"].map((status) => (
              <Button
                key={status}
                mode={localFilters.status === status ? "contained" : "outlined"}
                onPress={() =>
                  updateLocalFilter(
                    "status",
                    localFilters.status === status ? undefined : (status as any)
                  )
                }
                style={styles.statusButton}
              >
                {status === "PREBOOKING"
                  ? "Pré-résa"
                  : status === "AWAITING_GOODS"
                  ? "En attente"
                  : "Lié"}
              </Button>
            ))}
          </View>

          <Divider style={styles.divider} />

          {/* Date Range */}
          <Text style={styles.sectionTitle}>Période</Text>
          <Text style={styles.hint}>Date début / fin (à implémenter)</Text>

          <Divider style={styles.divider} />

          {/* CBM Range */}
          <Text style={styles.sectionTitle}>CBM</Text>
          <Text style={styles.hint}>Min / Max CBM (à implémenter)</Text>
        </ScrollView>

        <View style={styles.actions}>
          <Button onPress={handleClear} textColor={COLORS.grey}>
            Effacer
          </Button>
          <Button mode="contained" onPress={handleApply}>
            Appliquer
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    padding: 20,
    paddingBottom: 12,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.darkGrey,
    marginTop: 16,
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusButton: {
    flex: 1,
    minWidth: 100,
  },
  divider: {
    marginVertical: 16,
  },
  hint: {
    fontSize: 14,
    color: COLORS.grey,
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
});
