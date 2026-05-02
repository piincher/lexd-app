import { StyleSheet, StatusBar } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
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
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    lineHeight: 18,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressBar: {
    height: '100%',
    width: '100%',
  },
});
