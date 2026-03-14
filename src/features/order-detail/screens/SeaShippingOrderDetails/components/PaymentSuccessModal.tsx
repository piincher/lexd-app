import React from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface PaymentSuccessModalProps {
  visible: boolean;
  fadeAnim: Animated.Value;
  priceTotal?: number;
  onClose: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  fadeAnim,
  priceTotal,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <MaterialCommunityIcons name="check-circle" size={60} color={COLORS.success} />
          <Text style={styles.modalTitle}>Paiement Réussi!</Text>
          <Text style={styles.modalText}>
            Votre paiement de {priceTotal?.toLocaleString()} FCFA a été traité avec succès.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>RETOUR À LA COMMANDE</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: COLORS.success,
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: COLORS.white,
  },
});
