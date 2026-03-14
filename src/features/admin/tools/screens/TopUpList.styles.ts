import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  statusContainer: {
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  user: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    marginTop: 48,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray,
  },
});
