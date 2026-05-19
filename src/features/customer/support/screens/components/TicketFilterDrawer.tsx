/**
 * Ticket Filter Drawer
 * Modal with filter options for status, type, and priority
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, Chip } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  TicketStatus, TicketType, TicketPriority,
  TICKET_STATUS_LABELS, TICKET_STATUS_COLORS,
  TICKET_TYPE_LABELS, TICKET_PRIORITY_LABELS, TICKET_PRIORITY_COLORS,
} from '../../types';

interface TicketFilterDrawerProps {
  visible: boolean;
  onDismiss: () => void;
  status: TicketStatus[];
  type: TicketType[];
  priority: TicketPriority[];
  onToggleStatus: (status: TicketStatus) => void;
  onToggleType: (type: TicketType) => void;
  onTogglePriority: (priority: TicketPriority) => void;
  onReset: () => void;
}

const STATUS_ORDER: TicketStatus[] = ['OPEN', 'IN_PROGRESS', 'WAITING_CUSTOMER', 'RESOLVED', 'CLOSED'];
const TYPE_ORDER: TicketType[] = ['ORDER_ISSUE', 'PAYMENT_ISSUE', 'DELIVERY_ISSUE', 'GENERAL'];
const PRIORITY_ORDER: TicketPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export const TicketFilterDrawer: React.FC<TicketFilterDrawerProps> = ({
  visible, onDismiss, status, type, priority,
  onToggleStatus, onToggleType, onTogglePriority, onReset,
}) => {
  const { colors } = useAppTheme();

  const Section = <T extends string>({
    title, items, selected, onToggle, getLabel, getColor, getBgColor,
  }: {
    title: string; items: T[]; selected: T[]; onToggle: (item: T) => void;
    getLabel: (item: T) => string; getColor?: (item: T) => string; getBgColor?: (item: T) => string;
  }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{title}</Text>
      <View style={styles.chipRow}>
        {items.map((item) => {
          const isSelected = selected.includes(item);
          const textColor = getColor?.(item);
          const bgColor = getBgColor?.(item);
          return (
            <Chip
              key={item}
              selected={isSelected}
              onPress={() => onToggle(item)}
              style={[
                styles.chip,
                isSelected && textColor && bgColor
                  ? { backgroundColor: bgColor, borderColor: textColor, borderWidth: 1 }
                  : { backgroundColor: colors.background.paper },
              ]}
              textStyle={{
                color: isSelected && textColor ? textColor : colors.text.primary,
                fontFamily: isSelected ? Fonts.meduim : Fonts.regular,
                fontSize: 12,
              }}
            >
              {getLabel(item)}
            </Chip>
          );
        })}
      </View>
    </View>
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, { backgroundColor: colors.background.default }]}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Filtres</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Section
            title="Statut"
            items={STATUS_ORDER}
            selected={status}
            onToggle={onToggleStatus}
            getLabel={(s) => TICKET_STATUS_LABELS[s as TicketStatus]}
            getColor={(s) => TICKET_STATUS_COLORS[s as TicketStatus]}
            getBgColor={(s) => TICKET_STATUS_COLORS[s as TicketStatus] + '15'}
          />
          <Section
            title="Type"
            items={TYPE_ORDER}
            selected={type}
            onToggle={onToggleType}
            getLabel={(t) => TICKET_TYPE_LABELS[t as TicketType]}
          />
          <Section
            title="Priorité"
            items={PRIORITY_ORDER}
            selected={priority}
            onToggle={onTogglePriority}
            getLabel={(p) => TICKET_PRIORITY_LABELS[p as TicketPriority]}
            getColor={(p) => TICKET_PRIORITY_COLORS[p as TicketPriority]}
            getBgColor={(p) => TICKET_PRIORITY_COLORS[p as TicketPriority] + '20'}
          />
        </ScrollView>
        <View style={styles.actions}>
          <Button mode="outlined" onPress={onReset} style={styles.actionButton} textColor={colors.text.secondary}>
            Réinitialiser
          </Button>
          <Button mode="contained" onPress={onDismiss} style={styles.actionButton} buttonColor={colors.primary.main}>
            Appliquer
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: { margin: 20, borderRadius: 20, maxHeight: '80%', paddingBottom: 16 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  headerTitle: { fontFamily: Fonts.bold, fontSize: 20 },
  section: { paddingHorizontal: 20, paddingVertical: 10 },
  sectionTitle: { fontFamily: Fonts.meduim, fontSize: 14, marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderRadius: 8, marginBottom: 4 },
  actions: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingTop: 16 },
  actionButton: { flex: 1, borderRadius: 12 },
});

export default TicketFilterDrawer;
