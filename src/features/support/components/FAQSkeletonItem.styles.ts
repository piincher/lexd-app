import { StyleSheet } from 'react-native';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  item: {
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  indicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  line: {
    height: 14,
    borderRadius: RADIUS.badge,
    width: '80%',
  },
  lineShort: {
    height: 14,
    borderRadius: RADIUS.badge,
    width: '50%',
  },
});
