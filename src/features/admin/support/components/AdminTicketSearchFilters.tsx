import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ADMIN_TICKET_STATUSES,
  ADMIN_TICKET_STATUS_COLORS,
  ADMIN_TICKET_STATUS_LABELS,
  AdminTicketStatus,
} from '../types';

interface AdminTicketSearchFiltersProps {
  search: string;
  status?: AdminTicketStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status?: AdminTicketStatus) => void;
}

export const AdminTicketSearchFilters: React.FC<AdminTicketSearchFiltersProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <View style={[styles.search, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Rechercher un ticket, sujet ou description"
          placeholderTextColor={colors.text.secondary}
          value={search}
          onChangeText={onSearchChange}
          returnKeyType="search"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Pressable
          style={[
            styles.chip,
            { backgroundColor: !status ? colors.primary.main : colors.background.card },
            { borderColor: !status ? colors.primary.main : colors.border },
          ]}
          onPress={() => onStatusChange(undefined)}
        >
          <Text style={[styles.chipText, { color: !status ? colors.text.inverse : colors.text.primary }]}>
            Tous
          </Text>
        </Pressable>
        {ADMIN_TICKET_STATUSES.map((item) => {
          const active = item === status;
          return (
            <Pressable
              key={item}
              style={[
                styles.chip,
                { borderColor: active ? ADMIN_TICKET_STATUS_COLORS[item] : colors.border },
                { backgroundColor: active ? `${ADMIN_TICKET_STATUS_COLORS[item]}20` : colors.background.card },
              ]}
              onPress={() => onStatusChange(active ? undefined : item)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: active ? ADMIN_TICKET_STATUS_COLORS[item] : colors.text.primary },
                ]}
              >
                {ADMIN_TICKET_STATUS_LABELS[item]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  search: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    paddingVertical: 8,
  },
  chips: {
    gap: 8,
    paddingVertical: 12,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
});
