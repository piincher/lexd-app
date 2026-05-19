import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.background.card,
    elevation: 2,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
  },
  routeGroup: {
    marginBottom: 4,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  routeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
    flex: 1,
  },
  routeDivider: {
    marginVertical: 10,
    backgroundColor: colors.border,
  },
  pickerWrapper: {
    marginLeft: 42,
    backgroundColor: colors.background.paper,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 48,
  },
  timelineList: {
    marginLeft: 15,
    paddingLeft: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 8,
    top: -6,
    width: 2,
    height: 16,
    backgroundColor: colors.border,
  },
  connectorActive: {
    backgroundColor: colors.status.success,
  },
  timelineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background.paper,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    zIndex: 1,
  },
  timelineCircleActive: {
    backgroundColor: colors.status.success,
    borderColor: colors.status.success,
  },
  timelineLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
  timelineLabelActive: {
    color: colors.text.primary,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
  },
});
