import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Theme.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  gradient: {
    padding: 20,
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
  content: {
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Theme.colors.background.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Theme.primary[200],
    elevation: 2,
  },
  image: {
    width: 200,
    height: 200,
  },
  hint: {
    marginTop: 12,
    fontSize: 13,
    color: Theme.neutral[500],
    fontStyle: 'italic',
  },
  shareButton: {
    marginTop: 16,
    borderColor: Theme.primary[600],
    borderRadius: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: Theme.neutral[500],
  },
});
