import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  idBadge: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  idText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary[600],
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: colors.neutral[500],
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  descriptionBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  descriptionLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: colors.neutral[700],
    lineHeight: 22,
  },
});
