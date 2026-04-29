import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPaymentProofImagesStyles = (colors: any) => StyleSheet.create({
  formCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.medium,
    marginBottom: 8,
    color: colors.text.primary,
  },
  hint: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  proofImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background.card,
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
  addImageText: {
    fontSize: 12,
    color: colors.primary.main,
    fontFamily: Fonts.medium,
    marginTop: 4,
  },
  modalContent: {
    backgroundColor: colors.background.card,
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    marginVertical: 8,
  },
});
