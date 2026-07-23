import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const getPaymentHistoryCardStyles = (colors: any) =>
  StyleSheet.create({
    card: { borderRadius: RADIUS.card, borderWidth: HAIRLINE, borderColor: colors.border, backgroundColor: colors.background.card, marginBottom: 12 },
    content: { padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    iconContainer: { width: 40, height: 40, borderRadius: RADIUS.control, justifyContent: 'center', alignItems: 'center' },
    chip: { height: 28, borderRadius: RADIUS.badge },
    amount: { fontFamily: Fonts.bold, fontSize: 18, fontWeight: '700', color: colors.text.primary, marginBottom: 12 },
    details: { gap: 8, marginBottom: 16 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    label: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.secondary, minWidth: 90 },
    value: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.primary, flex: 1 },
    actions: { gap: 8, borderTopWidth: HAIRLINE, borderTopColor: colors.border, paddingTop: 12 },
    actionBtn: { alignSelf: 'flex-start' },
    secondaryActions: { flexDirection: 'row', gap: 8 },
    outlinedBtn: { flex: 1, borderColor: colors.status.success },
  });
