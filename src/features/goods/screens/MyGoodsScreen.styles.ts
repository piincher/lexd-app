import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
});
