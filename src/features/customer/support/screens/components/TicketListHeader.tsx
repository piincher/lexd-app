/**
 * Ticket List Header
 * Appbar with title, filter button with badge, and search toggle
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketListHeaderProps {
  onBack: () => void;
  onToggleSearch: () => void;
  onOpenFilters: () => void;
  activeFilterCount: number;
  showSearch: boolean;
}

export const TicketListHeader: React.FC<TicketListHeaderProps> = ({
  onBack,
  onToggleSearch,
  onOpenFilters,
  activeFilterCount,
  showSearch,
}) => {
  const { colors } = useAppTheme();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.background.default }]}>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title="Support" titleStyle={[styles.title, { color: colors.text.primary }]} />
      <Appbar.Action
        icon={showSearch ? 'close' : 'magnify'}
        onPress={onToggleSearch}
        color={colors.text.primary}
      />
      <View>
        <Appbar.Action
          icon="filter-variant"
          onPress={onOpenFilters}
          color={colors.text.primary}
        />
        {activeFilterCount > 0 && (
          <Badge style={[styles.badge, { backgroundColor: colors.primary.main }]}>
            {activeFilterCount}
          </Badge>
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 4,
    fontSize: 10,
  },
});

export default TicketListHeader;
