import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Theme.colors.background.card,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.primary,
    fontFamily: Fonts.bold,
  },
  statLabel: {
    fontSize: 10,
    color: Theme.colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Theme.colors.border,
  },
});
