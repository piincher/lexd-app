import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardItem } from '../types';
import { createStyles } from './RewardDetailConfirmModal.styles';

interface RewardDetailConfirmModalProps {
  visible: boolean;
  item: RewardItem | null;
  quantity: number;
  totalPoints: number;
  phone: string;
  remarks: string;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export const RewardDetailConfirmModal: React.FC<RewardDetailConfirmModalProps> = ({
  visible,
  item,
  quantity,
  totalPoints,
  phone,
  remarks,
  onClose,
  onConfirm,
  isSubmitting,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.title}>Confirmer l'échange</Text>
                <TouchableOpacity style={styles.iconButton} onPress={onClose} disabled={isSubmitting}>
                  <MaterialCommunityIcons name="close" size={20} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <MaterialCommunityIcons name="gift-outline" size={18} color={colors.primary.main} />
                <Text style={styles.rowLabel}>Produit</Text>
                <Text style={styles.rowValue} numberOfLines={1}>{item.name}</Text>
              </View>

              <View style={styles.row}>
                <MaterialCommunityIcons name="numeric" size={18} color={colors.primary.main} />
                <Text style={styles.rowLabel}>Quantité</Text>
                <Text style={styles.rowValue}>{quantity}</Text>
              </View>

              <View style={styles.row}>
                <MaterialCommunityIcons name="ticket-percent-outline" size={18} color={colors.primary.main} />
                <Text style={styles.rowLabel}>Total points</Text>
                <Text style={[styles.rowValue, { color: colors.primary.main }]}>{totalPoints} pts</Text>
              </View>

              <View style={styles.row}>
                <MaterialCommunityIcons name="store-outline" size={18} color={colors.primary.main} />
                <Text style={styles.rowLabel}>Méthode</Text>
                <Text style={styles.rowValue}>
                  {item.pickupMethod === 'PICKUP' ? 'Retrait' : 'Livraison'}
                </Text>
              </View>

              <View style={styles.row}>
                <MaterialCommunityIcons name="phone-outline" size={18} color={colors.primary.main} />
                <Text style={styles.rowLabel}>Téléphone</Text>
                <Text style={styles.rowValue}>{phone}</Text>
              </View>

              {remarks ? (
                <View style={styles.noteBox}>
                  <Text style={styles.noteLabel}>Remarques</Text>
                  <Text style={styles.noteText}>{remarks}</Text>
                </View>
              ) : null}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  <Text style={[styles.cancelText, { color: colors.text.secondary }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.confirmButton,
                    { backgroundColor: colors.primary.main },
                    isSubmitting && styles.confirmDisabled,
                  ]}
                  onPress={onConfirm}
                  disabled={isSubmitting}
                >
                  <Text style={styles.confirmText}>
                    {isSubmitting ? 'Envoi...' : 'Confirmer'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: 120 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
