import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button, Chip, Menu, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdvancedOrderFilters } from '../hooks/useAllOrdersAdvancedFilters';
import { useContainerOptions } from '../hooks/useContainerOptions';
import { createStyles } from '../screens/AllOrdersScreen.styles';
import { AllOrdersDateRangeFields } from './AllOrdersDateRangeFields';
import { ContainerPickerSheet } from './ContainerPickerSheet';
import { linkOptions, paymentOptions, shippingOptions, sortLabels } from './AllOrdersAdvancedFilters.constants';

interface AllOrdersAdvancedFiltersProps {
  filters: AdvancedOrderFilters;
  activeCount: number;
  onChange: <K extends keyof AdvancedOrderFilters>(key: K, value: AdvancedOrderFilters[K]) => void;
  onReset: () => void;
}

export const AllOrdersAdvancedFilters: React.FC<AllOrdersAdvancedFiltersProps> = ({
  filters,
  activeCount,
  onChange,
  onReset,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [expanded, setExpanded] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const { options, optionsById, isLoading, isError, refetch } = useContainerOptions();

  const selectedContainer = filters.container ? optionsById.get(filters.container) : undefined;
  const containerLabel = useMemo(() => {
    if (!filters.container) return 'Tous les conteneurs';
    if (selectedContainer) {
      return selectedContainer.actualNumber
        ? `${selectedContainer.virtualNumber} · ${selectedContainer.actualNumber}`
        : selectedContainer.virtualNumber;
    }
    // Selected id no longer in the cached list — show a stable fallback.
    return 'Conteneur sélectionné';
  }, [filters.container, selectedContainer]);

  const hasContainer = Boolean(filters.container);

  return (
    <View style={styles.advancedShell}>
      <View style={styles.advancedHeader}>
        <Button
          mode={expanded ? 'contained' : 'outlined'}
          icon="tune"
          onPress={() => setExpanded((value) => !value)}
          compact
        >
          Filtres avancés{activeCount ? ` (${activeCount})` : ''}
        </Button>
        {activeCount > 0 && <Button onPress={onReset} compact>Réinitialiser</Button>}
      </View>

      {/* Container filter — always visible, no typing required */}
      <Pressable
        onPress={() => setPickerOpen(true)}
        android_ripple={{ color: colors.action.hover }}
        style={({ pressed }) => [
          styles.containerTrigger,
          hasContainer && styles.containerTriggerActive,
          pressed && { opacity: 0.8 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Filtrer par conteneur. Actuel : ${containerLabel}`}
      >
        <View style={[styles.containerTriggerIcon, hasContainer && styles.containerTriggerIconActive]}>
          <MaterialCommunityIcons
            name="shipping-pallet"
            size={18}
            color={hasContainer ? colors.primary.main : colors.text.secondary}
          />
        </View>
        <View style={styles.containerTriggerBody}>
          <Text style={styles.containerTriggerLabel}>Conteneur</Text>
          <Text
            style={[styles.containerTriggerValue, hasContainer && styles.containerTriggerValueActive]}
            numberOfLines={1}
          >
            {containerLabel}
          </Text>
        </View>
        {hasContainer ? (
          <MaterialIcons
            name="close"
            size={20}
            color={colors.text.secondary}
            onPress={() => onChange('container', '')}
            accessibilityLabel="Effacer le filtre conteneur"
          />
        ) : (
          <MaterialIcons name="unfold-more" size={20} color={colors.text.secondary} />
        )}
      </Pressable>

      {expanded && (
        <View style={styles.advancedBody}>
          <View style={styles.chipRow}>
            {shippingOptions.map((option) => (
              <Chip
                key={option.key}
                selected={filters.shippingMethod === option.key}
                onPress={() => onChange('shippingMethod', option.key)}
                compact
              >
                {option.label}
              </Chip>
            ))}
          </View>

          <View style={styles.chipRow}>
            {paymentOptions.map((option) => (
              <Chip
                key={option.key}
                selected={filters.paymentStatus === option.key}
                onPress={() => onChange('paymentStatus', option.key)}
                compact
              >
                {option.label}
              </Chip>
            ))}
          </View>

          <View style={styles.chipRow}>
            {linkOptions.map((option) => (
              <Chip
                key={option.key}
                selected={filters.linkState === option.key}
                onPress={() => onChange('linkState', option.key)}
                compact
              >
                {option.label}
              </Chip>
            ))}
          </View>

          <View style={styles.rangeRow}>
            <TextInput
              mode="outlined"
              label="Min"
              value={filters.minTotal?.toString() || ''}
              keyboardType="numeric"
              onChangeText={(value) => onChange('minTotal', value ? Number(value) : undefined)}
              style={[styles.advancedInput, styles.rangeInput]}
            />
            <TextInput
              mode="outlined"
              label="Max"
              value={filters.maxTotal?.toString() || ''}
              keyboardType="numeric"
              onChangeText={(value) => onChange('maxTotal', value ? Number(value) : undefined)}
              style={[styles.advancedInput, styles.rangeInput]}
            />
          </View>

          <AllOrdersDateRangeFields filters={filters} onChange={onChange} />

          <View style={styles.sortRow}>
            <Menu
              visible={sortOpen}
              onDismiss={() => setSortOpen(false)}
              anchor={<Button icon="sort" mode="outlined" onPress={() => setSortOpen(true)}>{sortLabels[filters.sortBy]}</Button>}
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <Menu.Item
                  key={key}
                  title={label}
                  onPress={() => {
                    onChange('sortBy', key as AdvancedOrderFilters['sortBy']);
                    setSortOpen(false);
                  }}
                />
              ))}
            </Menu>
            <Button
              mode="outlined"
              icon={filters.sortOrder === 'asc' ? 'sort-ascending' : 'sort-descending'}
              onPress={() => onChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </Button>
          </View>
        </View>
      )}

      <ContainerPickerSheet
        visible={pickerOpen}
        onDismiss={() => setPickerOpen(false)}
        options={options}
        selectedId={filters.container || undefined}
        onSelect={(id) => onChange('container', id ?? '')}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />
    </View>
  );
};

export default AllOrdersAdvancedFilters;
