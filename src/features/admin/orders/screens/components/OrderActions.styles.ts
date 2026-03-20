import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 24,
  },
  primaryActions: {
    gap: 10,
    marginBottom: 12,
  },
  updateButton: {
    borderRadius: 12,
    paddingVertical: 6,
  },
  deliverButton: {
    borderRadius: 12,
    paddingVertical: 6,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.bold,
  },
});

export default styles;
