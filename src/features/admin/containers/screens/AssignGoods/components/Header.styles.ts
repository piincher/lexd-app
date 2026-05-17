import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primary[500],
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Theme.colors.text.inverse,
    marginTop: 2,
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  modeBadgeText: {
    fontSize: 11,
    color: Theme.colors.text.inverse,
    fontWeight: '600',
  },
  nonAssignableBanner: {
    flexDirection: 'row',
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderWidth: 1,
  },
  nonAssignableContent: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  nonAssignableTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  nonAssignableText: {
    fontSize: 12,
    color: Theme.colors.text.inverse,
    lineHeight: 18,
  },
});
