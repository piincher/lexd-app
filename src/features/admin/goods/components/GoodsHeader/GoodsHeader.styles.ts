import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.background.overlay,
  },
  content: {
    alignItems: 'center',
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.overlay,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.background.overlay,
  },
  badgeIcon: {
    marginRight: 8,
  },
  idText: {
    color: colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusWrapper: {
    transform: [{ scale: 1.1 }],
  },
});
