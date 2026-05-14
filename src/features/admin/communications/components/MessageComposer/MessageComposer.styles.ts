import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
    paddingTop: 14,
    paddingBottom: 24,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 6,
    marginBottom: 10,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Theme.neutral[100],
  },
  categoryTabActive: {
    backgroundColor: Theme.primary[500],
  },
  categoryText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  categoryTextActive: {
    color: 'Theme.colors.text.inverse',
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  templateScroll: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 14,
  },
  templateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.primary[50],
    borderWidth: 1,
    borderColor: Theme.primary[100],
  },
  templateText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Theme.primary[600] || Theme.primary[500],
  },
  inputWrapper: {
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    backgroundColor: Theme.neutral[50],
    overflow: 'hidden',
  },
  input: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    backgroundColor: 'transparent',
    minHeight: 90,
    paddingHorizontal: 14,
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  charCount: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[400],
  },
  charCountOver: {
    color: '#EF4444',
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  smsEstimate: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  sendWrapper: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  sendText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: 'Theme.colors.text.inverse',
  },
});
