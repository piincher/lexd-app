import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  item: {
    width: '48%',
    minHeight: 88,
    borderRadius: 8,
    borderWidth: 1,
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
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
  },
});
