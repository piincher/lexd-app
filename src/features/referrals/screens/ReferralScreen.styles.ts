import { StyleSheet } from 'react-native';

export const createStyles = () => StyleSheet.create({
  content: {
    padding: 16,
    gap: 18,
    paddingBottom: 32,
  },
  state: {
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stateText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: -8,
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
