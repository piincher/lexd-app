import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    minHeight: 56,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
    letterSpacing: 0.5,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 80,
  },
});
