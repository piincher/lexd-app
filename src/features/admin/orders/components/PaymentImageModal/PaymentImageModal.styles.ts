import { StyleSheet } from 'react-native';

export const createPaymentImageModalStyles = (colors: any) => StyleSheet.create({
  modalContent: {
    backgroundColor: colors.background.overlay,
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
    backgroundColor: colors.background.overlay,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
