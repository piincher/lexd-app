/**
 * SendConfirmationModal
 * SRP: Confirmation dialog before sending SMS to prevent accidental sends
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface SendConfirmationModalProps {
  visible: boolean;
  recipientCount: number;
  smsCount: number;
  messagePreview: string;
  isSending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SendConfirmationModal: React.FC<SendConfirmationModalProps> = ({
  visible,
  recipientCount,
  smsCount,
  messagePreview,
  isSending = false,
  onConfirm,
  onCancel,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubbles" size={32} color={Theme.primary[500]} />
        </View>

        <Text style={styles.title}>Confirmer l'envoi</Text>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Ionicons name="people" size={16} color={Theme.neutral[500]} />
            <Text style={styles.summaryLabel}>Destinataires</Text>
            <Text style={styles.summaryValue}>{recipientCount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="chatbubble-ellipses" size={16} color={Theme.neutral[500]} />
            <Text style={styles.summaryLabel}>SMS total</Text>
            <Text style={styles.summaryValue}>{smsCount}</Text>
          </View>
        </View>

        {/* Message preview */}
        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>Apercu du message :</Text>
          <Text style={styles.previewText} numberOfLines={3}>
            {messagePreview}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isSending ? undefined : onConfirm}
            style={[styles.confirmWrapper, isSending && styles.confirmDisabled]}
            activeOpacity={isSending ? 1 : 0.8}
            disabled={isSending}
          >
            <LinearGradient
              colors={isSending ? ['#9ca3af', '#9ca3af'] : Theme.gradients.primary}
              style={styles.confirmButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={isSending ? 'hourglass' : 'send'} size={16} color="#FFF" />
              <Text style={styles.confirmText}>{isSending ? 'Envoi en cours...' : 'Envoyer'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  card: {
    width: '100%',
    backgroundColor: Theme.colors.background.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: 16,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: Theme.neutral[50],
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Theme.neutral[600],
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: 10,
  },
  previewBox: {
    width: '100%',
    backgroundColor: Theme.primary[50],
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  previewLabel: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.neutral[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  previewText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Theme.neutral[700],
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Theme.neutral[100],
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  confirmWrapper: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  confirmDisabled: {
    opacity: 0.7,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  confirmText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: 'Theme.colors.text.inverse',
  },
});
