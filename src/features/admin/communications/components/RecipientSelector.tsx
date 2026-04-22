/**
 * RecipientSelector
 * SRP: Recipient selection with two modes (all clients / by departure date),
 *      search filtering, select all, and compact recipient list
 */

import React, { useMemo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export interface Recipient {
  id: string;
  name: string;
  phone: string;
}

type SourceMode = 'all' | 'date';

interface RecipientSelectorProps {
  mode: SourceMode;
  onModeChange: (mode: SourceMode) => void;
  recipients: Recipient[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  search: string;
  onSearchChange: (text: string) => void;
  isLoading: boolean;
  // Date mode props
  dateLabel?: string;
  onOpenCalendar?: () => void;
  onFetchByDate?: () => void;
  isFetchingByDate?: boolean;
}

export const RecipientSelector: React.FC<RecipientSelectorProps> = ({
  mode,
  onModeChange,
  recipients,
  selectedIds,
  onToggle,
  onSelectAll,
  onDeselectAll,
  search,
  onSearchChange,
  isLoading,
  dateLabel,
  onOpenCalendar,
  onFetchByDate,
  isFetchingByDate,
}) => {
  const filtered = useMemo(
    () =>
      recipients.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.phone.includes(search)
      ),
    [recipients, search]
  );

  const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));

  const renderRecipient = useCallback(
    ({ item, index }: { item: Recipient; index: number }) => {
      const isSelected = selectedIds.has(item.id);
      return (
        <Animated.View entering={FadeInDown.delay(Math.min(index * 20, 150)).springify().damping(18)}>
          <Pressable
            onPress={() => onToggle(item.id)}
            style={[styles.recipientRow, isSelected && styles.recipientRowSelected]}
          >
            <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
              <Text style={[styles.avatarText, isSelected && styles.avatarTextSelected]}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.recipientPhone}>{item.phone}</Text>
            </View>
            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
              {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </View>
          </Pressable>
        </Animated.View>
      );
    },
    [selectedIds, onToggle]
  );

  return (
    <View style={styles.container}>
      {/* Mode Toggle */}
      <View style={styles.modeRow}>
        <TouchableOpacity
          onPress={() => onModeChange('all')}
          style={[styles.modeTab, mode === 'all' && styles.modeTabActive]}
          activeOpacity={0.7}
        >
          <Ionicons
            name="people"
            size={16}
            color={mode === 'all' ? '#FFF' : Theme.neutral[500]}
          />
          <Text style={[styles.modeText, mode === 'all' && styles.modeTextActive]}>
            Tous les clients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onModeChange('date')}
          style={[styles.modeTab, mode === 'date' && styles.modeTabActive]}
          activeOpacity={0.7}
        >
          <Ionicons
            name="calendar"
            size={16}
            color={mode === 'date' ? '#FFF' : Theme.neutral[500]}
          />
          <Text style={[styles.modeText, mode === 'date' && styles.modeTextActive]}>
            Par date depart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date picker row (only in date mode) */}
      {mode === 'date' && (
        <View style={styles.dateRow}>
          <TouchableOpacity onPress={onOpenCalendar} style={styles.datePicker} activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={18} color={Theme.primary[500]} />
            <Text style={styles.dateText}>
              {dateLabel || 'Choisir une date'}
            </Text>
            <Ionicons name="chevron-down" size={16} color={Theme.neutral[400]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onFetchByDate}
            disabled={isFetchingByDate || !dateLabel}
            style={[styles.fetchButton, (!dateLabel || isFetchingByDate) && styles.fetchButtonDisabled]}
            activeOpacity={0.7}
          >
            <Text style={styles.fetchButtonText}>
              {isFetchingByDate ? 'Chargement...' : 'Chercher'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search + Select All */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Theme.neutral[400]} />
          <TextInput
            placeholder="Rechercher un client..."
            placeholderTextColor={Theme.neutral[400]}
            value={search}
            onChangeText={onSearchChange}
            style={styles.searchInput}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            dense
          />
        </View>
        <TouchableOpacity
          onPress={allSelected ? onDeselectAll : onSelectAll}
          style={styles.selectAllButton}
          activeOpacity={0.7}
        >
          <Text style={styles.selectAllText}>
            {allSelected ? 'Aucun' : 'Tous'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selected count */}
      {selectedIds.size > 0 && (
        <View style={styles.selectedBar}>
          <Ionicons name="people-circle" size={16} color={Theme.primary[500]} />
          <Text style={styles.selectedText}>
            {selectedIds.size} destinataire{selectedIds.size > 1 ? 's' : ''} selectionne{selectedIds.size > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={onDeselectAll}>
            <Text style={styles.clearText}>Effacer</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recipient list */}
      <FlashList
        data={filtered}
        renderItem={renderRecipient}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name={isLoading ? 'hourglass-outline' : 'people-outline'}
              size={40}
              color={Theme.neutral[300]}
            />
            <Text style={styles.emptyText}>
              {isLoading
                ? 'Chargement des clients...'
                : mode === 'date'
                  ? 'Choisissez une date et appuyez sur "Chercher"'
                  : 'Aucun client trouve'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 10,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Theme.neutral[100],
  },
  modeTabActive: {
    backgroundColor: Theme.primary[500],
  },
  modeText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  modeTextActive: {
    color: '#FFF',
  },
  dateRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  datePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: Theme.primary[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.primary[200],
  },
  dateText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Theme.neutral[700],
  },
  fetchButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Theme.primary[500],
    borderRadius: 12,
    justifyContent: 'center',
  },
  fetchButtonDisabled: {
    backgroundColor: Theme.neutral[200],
  },
  fetchButtonText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: '#FFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    backgroundColor: 'transparent',
    height: 42,
    marginLeft: 4,
  },
  selectAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Theme.neutral[100],
  },
  selectAllText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.primary[500],
  },
  selectedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Theme.primary[50],
    borderRadius: 10,
    gap: 6,
  },
  selectedText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.primary[600] || Theme.primary[500],
  },
  clearText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: '#EF4444',
  },
  list: {
    flex: 1,
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderRadius: 12,
    backgroundColor: Theme.colors.background.card,
    borderWidth: 1,
    borderColor: Theme.neutral[100],
  },
  recipientRowSelected: {
    backgroundColor: Theme.primary[50],
    borderColor: Theme.primary[200],
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Theme.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarSelected: {
    backgroundColor: Theme.primary[500],
  },
  avatarText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[600],
  },
  avatarTextSelected: {
    color: '#FFF',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  recipientPhone: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Theme.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Theme.primary[500],
    borderColor: Theme.primary[500],
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    textAlign: 'center',
    maxWidth: 240,
  },
});
