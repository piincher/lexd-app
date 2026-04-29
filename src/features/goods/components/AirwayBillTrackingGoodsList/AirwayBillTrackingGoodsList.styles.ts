import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.neutral[800], marginBottom: Theme.spacing.md, marginTop: Theme.spacing.sm },
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  goodsItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.sm, gap: 10 },
  goodsText: { fontSize: 14, color: Theme.neutral[700], flex: 1 },
  goodsStatus: { fontSize: 12, color: Theme.neutral[400] },
  emptyText: { textAlign: 'center', color: Theme.neutral[400], paddingVertical: 20 },
});
