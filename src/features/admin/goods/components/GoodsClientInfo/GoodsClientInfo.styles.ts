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
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInfo: {
    marginLeft: 16,
  },
  clientName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  clientPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  clientPhone: {
    fontSize: 14,
    color: colors.neutral[500],
    marginLeft: 6,
  },
});
