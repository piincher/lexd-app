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
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 4,
  },
  routePoint: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    fontFamily: Fonts.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  routeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
    borderStyle: 'dashed',
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#F0F0F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: Fonts.medium,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
    maxWidth: '45%',
    textAlign: 'right',
  },
});

export default styles;
