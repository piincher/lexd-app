import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Consignee } from '../../../../consignees';

interface ConsigneeSelectorProps {
  selectedConsigneeId: string;
  selectedConsigneeName: string;
  consignees: Consignee[];
  searchQuery: string;
  showDropdown: boolean;
  error?: string;
  onSearchChange: (query: string) => void;
  onToggleDropdown: (show: boolean) => void;
  onSelectConsignee: (consignee: Consignee) => void;
  onClearConsignee: () => void;
}

export const ConsigneeSelector: React.FC<ConsigneeSelectorProps> = ({
  selectedConsigneeId,
  selectedConsigneeName,
  consignees,
  searchQuery,
  showDropdown,
  error,
  onSearchChange,
  onToggleDropdown,
  onSelectConsignee,
  onClearConsignee,
}) => {
  const renderConsigneeItem = ({ item }: { item: Consignee }) => (
    <TouchableOpacity
      style={styles.consigneeItem}
      onPress={() => onSelectConsignee(item)}
    >
      <View style={styles.consigneeItemIcon}>
        <Ionicons name="business" size={20} color={Theme.primary[500]} />
      </View>
      <View style={styles.consigneeItemContent}>
        <Text style={styles.consigneeItemName}>{item.name}</Text>
        <Text style={styles.consigneeItemPhone}>{item.phone}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
    </TouchableOpacity>
  );

  // Selected mode
  if (selectedConsigneeId) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Destinataire <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.selectedConsigneeContainer}>
          <View style={styles.selectedConsigneeContent}>
            <View style={styles.selectedConsigneeIcon}>
              <Ionicons name="person" size={24} color="#FFF" />
            </View>
            <View style={styles.selectedConsigneeInfo}>
              <Text style={styles.selectedConsigneeName}>{selectedConsigneeName}</Text>
              <Text style={styles.selectedConsigneeLabel}>Consigné sélectionné</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.clearConsigneeButton}
            onPress={onClearConsignee}
          >
            <Ionicons name="close-circle" size={24} color={Theme.neutral[400]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Selection mode
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Destinataire <Text style={styles.required}>*</Text>
      </Text>
      <Searchbar
        placeholder="Rechercher un consigné..."
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
        onFocus={() => onToggleDropdown(true)}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
      {showDropdown && consignees.length > 0 && (
        <View style={styles.dropdownCard}>
          <FlashList
            data={consignees}
            keyExtractor={(item) => item._id}
            renderItem={renderConsigneeItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  required: {
    color: Theme.status.error,
  },
  searchbar: {
    backgroundColor: Theme.neutral[100],
    borderRadius: Theme.radius.md,
  },
  searchbarInput: {
    fontSize: 14,
  },
  dropdownCard: {
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.xs,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  consigneeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  consigneeItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  consigneeItemContent: {
    flex: 1,
  },
  consigneeItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  consigneeItemPhone: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  selectedConsigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.primary[300],
  },
  selectedConsigneeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedConsigneeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  selectedConsigneeInfo: {
    flex: 1,
  },
  selectedConsigneeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  selectedConsigneeLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  clearConsigneeButton: {
    padding: Theme.spacing.sm,
  },
});
