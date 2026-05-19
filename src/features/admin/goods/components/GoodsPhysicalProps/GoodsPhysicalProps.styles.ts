import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  propertyItemHighlight: {
    backgroundColor: colors.primary[50],
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  propertyLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 6,
    fontWeight: '500',
  },
  propertyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginTop: 4,
  },
  propertyValueHighlight: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
    marginTop: 4,
  },
  dimensionsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    padding: 14,
    borderRadius: 10,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginLeft: 10,
  },
});
