import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    borderWidth: HAIRLINE,
    borderRadius: RADIUS.card,
    padding: 16,
    backgroundColor: colors.background.card,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  codeBox: {
    borderWidth: HAIRLINE,
    borderRadius: RADIUS.control,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderStyle: 'dashed',
    marginBottom: 14,
  },
  code: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
