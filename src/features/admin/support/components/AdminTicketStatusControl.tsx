import React from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import {
  ADMIN_TICKET_STATUSES,
  getAdminTicketStatusColors,
  ADMIN_TICKET_STATUS_LABELS,
  AdminTicketStatus,
} from '../types';

interface AdminTicketStatusControlProps {
  status: AdminTicketStatus;
  isPending: boolean;
  onChangeStatus: (status: AdminTicketStatus) => void;
}

export const AdminTicketStatusControl: React.FC<AdminTicketStatusControlProps> = ({
  status,
  isPending,
  onChangeStatus,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>
        {ADMIN_TICKET_STATUSES.map((item) => {
          const active = item === status;
          const accent = getAdminTicketStatusColors(colors)[item];

          return (
            <Pressable
              key={item}
              disabled={active || isPending}
              onPress={() => onChangeStatus(item)}
              style={[
                styles.chip,
                { borderColor: active ? accent : colors.border },
                { backgroundColor: active ? `${accent}20` : colors.background.card },
                isPending && styles.disabled,
              ]}
            >
              <Text style={[styles.label, { color: active ? accent : colors.text.primary }]}>
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
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingVertical: 8,
  },
  content: {
    gap: 8,
    paddingHorizontal: 12,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
});
