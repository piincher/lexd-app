/**
 * RecipientSelector
 * SRP: Recipient selection with two modes, search filtering, select all, and compact recipient list
 */

import React, { useMemo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './RecipientSelector.styles';
import { ModeToggle } from './ModeToggle';
import { DatePickerRow } from './DatePickerRow';
import { RecipientItem } from './RecipientItem';
import { RecipientEmptyState } from './RecipientEmptyState';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const filtered = useMemo(
    () =>
      recipients.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.phone.includes(search),
      ),
    [recipients, search],
  );

  const allSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id));

  const renderRecipient = useCallback(
    ({ item, index }: { item: Recipient; index: number }) => (
      <RecipientItem
        item={item}
        index={index}
        isSelected={selectedIds.has(item.id)}
        onToggle={onToggle}
      />
    ),
    [selectedIds, onToggle],
  );

  return (
    <View style={styles.container}>
      <ModeToggle mode={mode} onModeChange={onModeChange} />

      {mode === 'date' && (
        <DatePickerRow
          dateLabel={dateLabel}
          onOpenCalendar={onOpenCalendar}
          onFetchByDate={onFetchByDate}
          isFetchingByDate={isFetchingByDate}
        />
      )}

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={colors.neutral[400]} />
          <TextInput
            placeholder="Rechercher un client..."
            placeholderTextColor={colors.neutral[400]}
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
          <Text style={styles.selectAllText}>{allSelected ? 'Aucun' : 'Tous'}</Text>
        </TouchableOpacity>
      </View>

      {selectedIds.size > 0 && (
        <View style={styles.selectedBar}>
          <Ionicons name="people-circle" size={16} color={colors.primary[500]} />
          <Text style={styles.selectedText}>
            {selectedIds.size} destinataire{selectedIds.size > 1 ? 's' : ''} selectionne
            {selectedIds.size > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={onDeselectAll}>
            <Text style={styles.clearText}>Effacer</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlashList
        data={filtered}
        renderItem={renderRecipient}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<RecipientEmptyState isLoading={isLoading} mode={mode} />}
      />
    </View>
  );
};
