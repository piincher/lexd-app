import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  timeline: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 44,
    marginRight: 12,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
    transformOrigin: 'top',
  },
  stepCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    ...Theme.shadows.sm,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 3,
  },
  stepDesc: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  stepIndexBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndexText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
});
