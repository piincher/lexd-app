import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) => StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    width: '48%',
    minHeight: 88,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    padding: 12,
    backgroundColor: colors.background.card,
    borderColor: colors.border,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    // Waybill tracked uppercase micro-label (stat metadata).
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
  },
});
