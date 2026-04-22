import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { AirwayBillConsignee } from '../../types';

interface ConsigneePickerProps {
  selectedConsignee: AirwayBillConsignee | null;
  consignees: AirwayBillConsignee[];
  searchQuery: string;
  showDropdown: boolean;
  isLoading: boolean;
  onSearchChange: (query: string) => void;
  onToggleDropdown: (show: boolean) => void;
  onSelect: (consignee: AirwayBillConsignee) => void;
  onClear: () => void;
}

export const ConsigneePicker: React.FC<ConsigneePickerProps> = ({
  selectedConsignee,
  consignees,
  searchQuery,
  showDropdown,
  isLoading,
  onSearchChange,
  onToggleDropdown,
  onSelect,
  onClear,
}) => {
  if (selectedConsignee) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Consigné / lieu de retrait</Text>
        <View style={styles.selectedCard}>
          <View style={styles.selectedInfo}>
            <Ionicons name="business" size={22} color={Theme.primary[600]} />
            <View style={styles.selectedText}>
              <Text style={styles.name}>{selectedConsignee.name}</Text>
              <Text style={styles.meta}>{selectedConsignee.phone}</Text>
              {!!selectedConsignee.warehouseAddress && (
                <Text style={styles.meta} numberOfLines={1}>{selectedConsignee.warehouseAddress}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={24} color={Theme.neutral[400]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Consigné / lieu de retrait</Text>
      <Searchbar
        placeholder="Rechercher par nom ou téléphone..."
        value={searchQuery}
        onChangeText={onSearchChange}
        onFocus={() => onToggleDropdown(true)}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />
      {showDropdown && (
        <View style={styles.dropdown}>
          {isLoading ? (
            <View style={styles.state}>
              <ActivityIndicator size="small" color={Theme.primary[500]} />
              <Text style={styles.stateText}>Recherche en cours...</Text>
            </View>
          ) : consignees.length > 0 ? (
            <FlashList
              data={consignees}
              keyExtractor={(item) => item._id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
                  <Ionicons name="business-outline" size={20} color={Theme.primary[500]} />
                  <View style={styles.itemText}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.meta}>{item.phone}</Text>
                    {!!item.warehouseAddress && (
                      <Text style={styles.meta} numberOfLines={1}>{item.warehouseAddress}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.state}>
              <Text style={styles.stateText}>
                {searchQuery.trim() ? 'Aucun consigné trouvé' : 'Commencez à saisir un nom ou un téléphone'}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: Theme.spacing.md },
  label: { fontSize: 14, fontWeight: '600', color: Theme.neutral[800], marginBottom: Theme.spacing.xs },
  searchbar: { backgroundColor: Theme.neutral[100], borderRadius: Theme.radius.md },
  searchInput: { fontSize: 14 },
  dropdown: {
    height: 220,
    marginTop: Theme.spacing.xs,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.colors.background.card,
  },
  item: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  itemText: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: Theme.neutral[800] },
  meta: { fontSize: 12, color: Theme.neutral[500], marginTop: 2 },
  state: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Theme.spacing.md },
  stateText: { color: Theme.neutral[500], fontSize: 13, textAlign: 'center', marginTop: Theme.spacing.xs },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.primary[200],
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
  },
  selectedInfo: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.sm, flex: 1 },
  selectedText: { flex: 1 },
  clearButton: { padding: Theme.spacing.xs },
});

export default ConsigneePicker;
