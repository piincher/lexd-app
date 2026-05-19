import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  customerContainer: {
    justifyContent: 'flex-end',
  },
  adminContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  customerBubble: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 4,
  },
  adminBubble: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  lastBubble: {
    marginBottom: 8,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
