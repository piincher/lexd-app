import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Theme.colors.background.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    fontFamily: Fonts.semiBold,
  },
  divider: {
    marginVertical: 6,
    backgroundColor: Theme.colors.border,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: Theme.colors.feedback.warningBg,
    borderRadius: 10,
    padding: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: Theme.colors.text.secondary,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
});
