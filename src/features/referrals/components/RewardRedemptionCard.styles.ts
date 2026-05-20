import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    gap: 14,
    backgroundColor: colors.background.card,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 13,
    marginTop: 2,
  },
  values: {
    flexDirection: 'row',
    gap: 10,
  },
  valueBlock: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background.paper,
  },
  value: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  label: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  pendingBox: {
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.status.warning + '14',
  },
  pendingText: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    minHeight: 46,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.status.success,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '700',
  },
});
