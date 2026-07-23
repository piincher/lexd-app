import React from 'react';
import { View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { useMyContainersFilterChipsStyles } from './MyContainersFilterChips.styles';
import { FilterMode } from '../../hooks/useMyContainersScreen';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

interface FilterOption {
  value: FilterMode;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'ALL', label: 'Tous', icon: 'filter-variant' },
  { value: 'SEA', label: 'Maritime', icon: 'ferry' },
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
];

interface MyContainersFilterChipsProps {
  activeFilter: FilterMode;
  onFilterChange: (filter: FilterMode) => void;
}

export const MyContainersFilterChips: React.FC<MyContainersFilterChipsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();
  const styles = useMyContainersFilterChipsStyles();

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = activeFilter === option.value;
          return (
            <Chip
              key={option.value}
              selected={isSelected}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onFilterChange(option.value);
              }}
              style={[
                styles.filterChip,
                // Selection reads through fill and border alone — no lift.
                isSelected && {
                  backgroundColor: theme.colors.primary,
                  borderWidth: HAIRLINE,
                  borderColor: theme.colors.primary,
                },
              ]}
              textStyle={{
                color: isSelected ? colors.text.inverse : theme.colors.onSurface,
                fontFamily: isSelected ? Fonts.bold : Fonts.meduim,
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={16}
                  color={isSelected ? colors.text.inverse : theme.colors.onSurfaceVariant}
                />
              )}
            >
              {option.label}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};
