import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) => StyleSheet.create({
  section: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  empty: {
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    padding: 16,
    backgroundColor: colors.background.card,
    borderColor: colors.border,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: colors.background.card,
    borderColor: colors.border,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  phone: {
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    borderRadius: RADIUS.badge,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
