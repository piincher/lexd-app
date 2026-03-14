import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionBarButton: {
    flex: 1,
    borderColor: COLORS.primary,
  },
  actionBarButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  actionBarButtonLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
  },
  actionBarButtonLabelPrimary: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
