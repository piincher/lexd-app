import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.neutral[800], marginBottom: Theme.spacing.md, marginTop: Theme.spacing.sm },
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  timelineItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.sm },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: { marginLeft: Theme.spacing.md, flex: 1 },
  timelineLabel: { fontSize: 14, fontWeight: '600' },
  timelineCurrent: { fontSize: 12, color: Theme.primary[500], marginTop: 2 },
  timelineConnector: {
    position: 'absolute',
    left: 20,
    top: 48,
    width: 2,
    height: 24,
  },
});
