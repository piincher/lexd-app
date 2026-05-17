import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  bottomSpacing: {
    height: 40,
  },
});

// Backward compatibility export
export const styles = getStyles({ background: { default: '#FFFFFF' } });
