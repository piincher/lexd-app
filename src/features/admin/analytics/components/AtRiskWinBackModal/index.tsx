import React from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getStyles } from './AtRiskWinBackModal.styles';
import type { AtRiskCustomer } from '../../types';

const NO_SHIPMENT_TRIGGER = 'NO_SHIPMENT_30D';

interface AtRiskWinBackModalProps {
  visible: boolean;
  customer: AtRiskCustomer | null;
  onClose: () => void;
  onTrigger: (userId: string, triggerType: string) => Promise<void>;
  isPending: boolean;
}

export function AtRiskWinBackModal({ visible, customer, onClose, onTrigger, isPending }: AtRiskWinBackModalProps) {
  const { colors, isDark } = useAppTheme();
  const styles = getStyles(colors, isDark);

  if (!customer) return null;
  const name = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Client';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Programmer une relance</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Fermer">
              <MaterialCommunityIcons name="close" size={22} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle} numberOfLines={2}>Client : {name}</Text>

          <View style={styles.triggerList}>
            <View style={[styles.triggerItem, styles.triggerItemActive]}>
              <MaterialCommunityIcons name="package-variant-closed-remove" size={20} color={colors.primary.main} />
              <View style={styles.triggerCopy}>
                <Text style={[styles.triggerText, styles.triggerTextActive]}>Aucun envoi récent</Text>
                <Text style={styles.triggerDescription}>Utilise la campagne configurée pour les clients sans expédition.</Text>
              </View>
              <MaterialCommunityIcons name="check-circle" size={18} color={colors.primary.main} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.triggerBtn, isPending && styles.triggerBtnDisabled]}
            onPress={() => onTrigger(customer.userId, NO_SHIPMENT_TRIGGER)}
            disabled={isPending}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ busy: isPending }}
          >
            {isPending ? <ActivityIndicator size="small" color={colors.text.inverse} /> : <MaterialCommunityIcons name="send" size={17} color={colors.text.inverse} />}
            <Text style={styles.triggerBtnText}>{isPending ? 'Programmation…' : 'Programmer la relance'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
