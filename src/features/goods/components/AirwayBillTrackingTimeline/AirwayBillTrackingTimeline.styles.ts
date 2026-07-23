import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.text.secondary,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  card: {
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    marginBottom: Theme.spacing.md,
  },
  timelineItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.sm },
  // Squared checkpoint node, consistent with the dashboard journey map.
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.control,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: { marginLeft: Theme.spacing.md, flex: 1 },
  timelineLabel: { fontSize: 14, fontWeight: '600' },
  timelineCurrent: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.primary[500],
    marginTop: 3,
  },
  timelineConnector: {
    position: 'absolute',
    left: 20,
    top: 48,
    width: 2,
    height: 24,
  },
});
