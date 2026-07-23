import { StyleSheet } from 'react-native';
import { RADIUS, HAIRLINE } from '@src/shared/ui/designLanguage';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: RADIUS.card,
    borderWidth: HAIRLINE,
  },
});
