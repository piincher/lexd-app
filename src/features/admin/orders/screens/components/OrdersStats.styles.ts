import { StyleSheet } from 'react-native';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.grey,
    marginBottom: 10,
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '23%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderLeftWidth: 3,
    elevation: 1,
  },
  statIconContainer: {
    marginRight: 8,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: Fonts.bold,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    marginTop: 1,
  },
  revenueCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  revenueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  revenueContent: {
    flex: 1,
  },
  revenueLabel: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
  },
  revenueValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    fontFamily: Fonts.bold,
  },
});

export default styles;
