import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing['2xl'],
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  toolbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  modeTabs: {
    marginBottom: Theme.spacing.lg,
  },
  hero: {
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.xl,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  heroCircleLg: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -64,
    right: -44,
  },
  heroCircleSm: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.10)',
    bottom: -34,
    right: 56,
  },
  heroBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroChip: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  heroText: {
    flex: 1,
  },
  heroValue: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroValueSkeleton: {
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginVertical: 2,
  },
  heroLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
});
