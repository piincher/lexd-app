import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  list: {
    flex: 1,
  },
  footer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  statusBar: {
    width: 4,
    backgroundColor: colors.neutral[300],
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  clientInfo: {
    flex: 1,
    marginLeft: 10,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 10,
  },
  progressSection: {
    marginTop: 10,
  },
});
