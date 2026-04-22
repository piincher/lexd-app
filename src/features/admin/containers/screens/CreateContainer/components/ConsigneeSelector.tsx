import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Searchbar, HelperText, ActivityIndicator } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Consignee } from '../../../../consignees';
import { createStyles } from './ConsigneeSelector.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ConsigneeSelectorProps {
  selectedConsigneeId: string;
  selectedConsigneeName: string;
  consignees: Consignee[];
  searchQuery: string;
  showDropdown: boolean;
  isLoading?: boolean;
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
  isLoading = false,
  error,
  onSearchChange,
  onToggleDropdown,
  onSelectConsignee,
  onClearConsignee,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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
        {!!item.warehouseAddress && (
          <Text style={styles.consigneeItemAddress} numberOfLines={1}>
            {item.warehouseAddress}
          </Text>
        )}
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
      {showDropdown && (
        <View style={styles.dropdownCard}>
          {isLoading ? (
            <View style={styles.dropdownState}>
              <ActivityIndicator size="small" color={Theme.primary[500]} />
              <Text style={styles.dropdownStateText}>Recherche en cours...</Text>
            </View>
          ) : consignees.length > 0 ? (
            <FlashList
              data={consignees}
              keyExtractor={(item) => item._id}
              renderItem={renderConsigneeItem}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.resultsList}
            />
          ) : (
            <View style={styles.dropdownState}>
              <Ionicons name="search-outline" size={20} color={Theme.neutral[400]} />
              <Text style={styles.dropdownStateText}>
                {searchQuery.trim()
                  ? 'Aucun destinataire trouvé pour cette recherche'
                  : 'Commencez à saisir un nom ou un téléphone'}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
