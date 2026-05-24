import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { AppTheme } from '@src/constants/Theme';

export const createStyles = (colors: AppTheme['colors'], isDark?: boolean) => StyleSheet.create({
  container: {
    marginTop: 34,
    paddingHorizontal: 12,
  },
  timeline: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 38,
    marginRight: 10,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: colors.neutral[900],
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
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
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
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndexText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
});
