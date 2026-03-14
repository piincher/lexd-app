import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  assignedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Theme.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  containerNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  shippingLine: {
    fontSize: 14,
    color: Theme.neutral[600],
    marginTop: 2,
  },
  status: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 4,
  },
  unassignedContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  unassignedText: {
    marginTop: 12,
    fontSize: 14,
    color: Theme.neutral[500],
    marginBottom: 16,
  },
  assignButton: {
    backgroundColor: Theme.primary[600],
    borderRadius: 10,
  },
  actionButton: {
    borderRadius: 10,
    borderColor: Theme.status.error,
  },
});
