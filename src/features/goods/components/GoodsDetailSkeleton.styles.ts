import { StyleSheet } from 'react-native';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  statusHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    borderWidth: HAIRLINE,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: RADIUS.card,
    paddingVertical: 16,
    borderWidth: HAIRLINE,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statGap: {
    marginTop: 4,
    marginBottom: 2,
  },
  statDivider: {
    width: 1,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    marginVertical: 0,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  timelineLabelGap: {
    marginTop: 6,
  },
  containerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.card,
    padding: 16,
  },
  containerBoxInfo: {
    marginLeft: 12,
    flex: 1,
  },
  bottomPadding: {
    height: 32,
  },
});
