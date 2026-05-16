import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  closeButton: {
    padding: 4,
  },
  body: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    backgroundColor: Theme.neutral[50],
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[700],
  },
  dateChipRow: {
    flexDirection: 'row',
  },
  dateChip: {
    backgroundColor: Theme.primary[50],
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  clearButton: {
    flex: 1,
    borderColor: Theme.neutral[300],
  },
  applyButton: {
    flex: 1,
  },
});
