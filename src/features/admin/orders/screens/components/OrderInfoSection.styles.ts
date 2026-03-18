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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.grey,
    fontFamily: Fonts.semiBold,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  grid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: Fonts.medium,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: Fonts.semiBold,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#F0F0F0',
  },
  notesSection: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 12,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  notesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F57C00',
    fontFamily: Fonts.semiBold,
  },
  notesText: {
    fontSize: 13,
    color: '#666',
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
});

export default styles;
