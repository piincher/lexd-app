import { StyleSheet } from 'react-native';

export const createPaymentImageModalStyles = () => StyleSheet.create({
  modalContent: {
    backgroundColor: '#000',
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    height: 400,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
