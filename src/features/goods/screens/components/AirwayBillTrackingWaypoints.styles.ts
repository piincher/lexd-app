import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  progress: {
    fontSize: 13,
    fontWeight: '800',
    color: Theme.primary[500],
    marginBottom: Theme.spacing.md,
  },
  card: {
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
  },
  progressTrack: {
    height: 6,
    borderRadius: 99,
    backgroundColor: Theme.neutral[200],
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: Theme.primary[500],
  },
  item: {
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: Theme.spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  body: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  location: {
    fontSize: 14,
    fontWeight: '800',
    color: Theme.neutral[800],
    flex: 1,
  },
  status: {
    fontSize: 11,
    fontWeight: '800',
  },
  description: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 3,
    lineHeight: 17,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  meta: {
    fontSize: 11,
    color: Theme.neutral[400],
    fontWeight: '600',
  },
  etaMeta: {
    fontSize: 11,
    color: Theme.primary[500],
    fontWeight: '800',
  },
  current: {
    fontSize: 11,
    fontWeight: '800',
  },
  connector: {
    position: 'absolute',
    left: 19,
    top: 40,
    bottom: 0,
    width: 2,
    backgroundColor: Theme.neutral[200],
  },
});
