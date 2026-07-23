/* Hallmark · genre: modern-minimal · macrostructure: Workbench · design-system: app theme · designed-as-app */
/**
 * ContainerPickerSheet
 *
 * No-typing container selector for the AllOrders advanced filters. Renders a
 * searchable, virtualized bottom-sheet of containers so an admin can filter the
 * order list by tapping a container instead of typing its number. Search is
 * optional — every container is one tap away.
 *
 * Single-select: tapping a row selects it and dismisses. The first row clears
 * the selection ("Tous les conteneurs"). The list is a FlatList so it scales to
 * hundreds of containers without jank.
 */
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { ActivityIndicator, IconButton, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getContainerStatusColors } from '@src/features/admin/containers/types';
import type { ContainerOption } from '../hooks/useContainerOptions';
import { createStyles } from './ContainerPickerSheet.styles';

interface ContainerPickerSheetProps {
  visible: boolean;
  onDismiss: () => void;
  options: ContainerOption[];
  selectedId?: string;
  onSelect: (id: string | undefined) => void;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

const modeIcon = (mode?: string): keyof typeof MaterialCommunityIcons.glyphMap => {
  const value = (mode || '').toUpperCase();
  if (value === 'AIR') return 'airplane';
  if (value === 'SEA') return 'ferry';
  return 'cube-outline';
};

export const ContainerPickerSheet: React.FC<ContainerPickerSheetProps> = ({
  visible,
  onDismiss,
  options,
  selectedId,
  onSelect,
  isLoading,
  isError,
  onRetry,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const statusColors = useMemo(() => getContainerStatusColors(colors), [colors]);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) => option.searchText.includes(term));
  }, [options, query]);

  const handleSelect = (id: string | undefined) => {
    onSelect(id);
    setQuery('');
    onDismiss();
  };

  const renderItem = ({ item }: { item: ContainerOption }) => {
    const isSelected = item.id === selectedId;
    const statusColor = statusColors[item.status] ?? colors.text.secondary;

    return (
      <Pressable
        onPress={() => handleSelect(item.id)}
        android_ripple={{ color: colors.action.hover }}
        style={({ pressed }) => [
          styles.row,
          isSelected && styles.rowSelected,
          pressed && { opacity: 0.7 },
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={`Conteneur ${item.virtualNumber}, ${item.statusLabel}`}
      >
        <View style={styles.modeBadge}>
          <MaterialCommunityIcons name={modeIcon(item.shippingMode)} size={20} color={colors.primary.main} />
        </View>

        <View style={styles.rowBody}>
          <View style={styles.rowTitleLine}>
            <Text style={styles.rowTitle} numberOfLines={1}>{item.virtualNumber}</Text>
          </View>
          {item.actualNumber ? (
            <Text style={styles.rowActual} numberOfLines={1}>Réel · {item.actualNumber}</Text>
          ) : null}
          <View style={styles.rowMetaLine}>
            <View style={[styles.statusPill, { backgroundColor: statusColor + '1A' }]}>
              <MaterialIcons name="flag" size={11} color={statusColor} />
              <Text style={[styles.statusPillText, { color: statusColor }]} numberOfLines={1}>
                {item.statusLabel}
              </Text>
            </View>
            {typeof item.goodsCount === 'number' && item.goodsCount > 0 ? (
              <Text style={styles.goodsMeta}>{item.goodsCount} colis</Text>
            ) : null}
          </View>
        </View>

        {isSelected ? (
          <MaterialIcons name="check-circle" size={22} color={colors.primary.main} />
        ) : null}
      </Pressable>
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <View style={styles.stateWrap}>
          <ActivityIndicator color={colors.primary.main} />
          <Text style={styles.stateText}>Chargement des conteneurs…</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.stateWrap}>
          <MaterialCommunityIcons name="alert-circle-outline" size={32} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger les conteneurs.</Text>
          {onRetry ? (
            <Text
              onPress={onRetry}
              style={[styles.stateText, { color: colors.primary.main, fontWeight: '600' }]}
            >
              Réessayer
            </Text>
          ) : null}
        </View>
      );
    }

    if (options.length === 0) {
      return (
        <View style={styles.stateWrap}>
          <MaterialCommunityIcons name="cube-off-outline" size={32} color={colors.text.muted} />
          <Text style={styles.stateText}>Aucun conteneur disponible.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={12}
        windowSize={10}
        ListHeaderComponent={
          <Pressable
            onPress={() => handleSelect(undefined)}
            android_ripple={{ color: colors.action.hover }}
            style={({ pressed }) => [
              styles.clearRow,
              !selectedId && styles.clearRowActive,
              pressed && { opacity: 0.7 },
            ]}
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="layers-triple-outline" size={20} color={colors.text.secondary} />
            <Text style={styles.clearLabel}>Tous les conteneurs</Text>
            {!selectedId ? (
              <MaterialIcons name="check-circle" size={20} color={colors.primary.main} style={{ marginLeft: 'auto' }} />
            ) : null}
          </Pressable>
        }
        ListEmptyComponent={
          <View style={styles.stateWrap}>
            <Text style={styles.stateText}>Aucun conteneur ne correspond à « {query} ».</Text>
          </View>
        }
      />
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <View style={styles.grabber} />
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Filtrer par conteneur</Text>
              <Text style={styles.subtitle}>Sélectionnez un conteneur — sans le taper</Text>
            </View>
            <IconButton icon="close" size={22} onPress={onDismiss} style={styles.closeButton} />
          </View>

          {!isLoading && !isError && options.length > 0 ? (
            <TextInput
              mode="outlined"
              dense
              placeholder="Rechercher un numéro, statut…"
              value={query}
              onChangeText={setQuery}
              left={<TextInput.Icon icon="magnify" />}
              right={query ? <TextInput.Icon icon="close" onPress={() => setQuery('')} /> : undefined}
              style={styles.searchField}
              autoCorrect={false}
            />
          ) : null}

          {renderBody()}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ContainerPickerSheet;
