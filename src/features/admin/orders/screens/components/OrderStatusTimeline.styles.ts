import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    left: 11,
    top: -12,
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
  },
  connectorCompleted: {
    backgroundColor: '#4CAF50',
  },
  statusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  statusCircleCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  statusCircleCurrent: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
    transform: [{ scale: 1.1 }],
  },
  statusContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
  },
  statusLabelCompleted: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusLabelCurrent: {
    color: COLORS.blue,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },
  currentBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
    backgroundColor: COLORS.blue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontFamily: Fonts.semiBold,
  },
  locationSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    marginBottom: 8,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    fontFamily: Fonts.semiBold,
  },
});

export default styles;
