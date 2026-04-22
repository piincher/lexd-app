import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: Theme.colors.background.card,
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
  propertyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: Theme.neutral[50],
    borderRadius: 12,
    marginHorizontal: 4,
  },
  propertyItemHighlight: {
    backgroundColor: Theme.primary[50],
    borderWidth: 2,
    borderColor: Theme.primary[200],
  },
  propertyLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 6,
    fontWeight: '500',
  },
  propertyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: 4,
  },
  propertyValueHighlight: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
    marginTop: 4,
  },
  dimensionsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    padding: 14,
    borderRadius: 10,
  },
  dimensionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginLeft: 10,
  },
});
