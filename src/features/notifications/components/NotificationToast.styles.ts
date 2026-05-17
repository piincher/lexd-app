import { StyleSheet, StatusBar } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useMemo } from 'react';

export const useNotificationToastStyles = () => {
  const { colors } = useAppTheme();
  return useMemo(() => StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingTop: (StatusBar.currentHeight || 0) + 8,
    paddingHorizontal: 16,
  },
  toastContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  surface: {
    borderRadius: 16,
    overflow: 'hidden',
    borderLeftWidth: 4,
    backgroundColor: colors.background.overlay,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingRight: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.inverse,
    marginTop: 2,
    lineHeight: 18,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    height: 3,
    backgroundColor: colors.text.inverse + '1A',
  },
  progressBar: {
    height: '100%',
    width: '100%',
  },
  }), [colors]);
};
