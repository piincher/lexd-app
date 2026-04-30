import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const usePaymentMethodSelectorStyles = () => {
  const { colors } = useAppTheme();
  return useMemo(() => StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 20, fontFamily: Fonts.bold, color: colors.text.primary, marginBottom: 16 },
    loadingContainer: { padding: 40, alignItems: 'center' },
    loadingText: { marginTop: 12, fontSize: 14, fontFamily: Fonts.regular, color: colors.text.secondary },
    errorContainer: { padding: 40, alignItems: 'center' },
    errorText: { marginTop: 12, fontSize: 14, fontFamily: Fonts.regular, color: colors.status.error, textAlign: 'center' },
    amountBanner: { backgroundColor: colors.primary.main + '10', borderRadius: 12, padding: 16, marginBottom: 16, alignItems: 'center' },
    amountLabel: { fontSize: 14, fontFamily: Fonts.regular, color: colors.text.secondary },
    amountValue: { fontSize: 24, fontFamily: Fonts.bold, color: colors.primary.main, marginTop: 4 },
    methodsList: { gap: 12 },
    methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background.default, borderRadius: 12, padding: 16, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    methodCardSelected: { borderColor: colors.primary.main, backgroundColor: colors.primary.main + '08' },
    methodCardError: { borderColor: colors.status.error },
    methodCardDisabled: { opacity: 0.5 },
    methodIconContainer: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    methodInfo: { flex: 1 },
    methodName: { fontSize: 16, fontFamily: Fonts.bold, color: colors.text.primary },
    methodDescription: { fontSize: 12, fontFamily: Fonts.regular, color: colors.text.secondary, marginTop: 2 },
    feeText: { fontSize: 11, fontFamily: Fonts.medium, color: colors.accent.goldDark, marginTop: 4 },
    methodRight: { marginLeft: 12 },
    selectedIndicator: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
    unselectedIndicator: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.neutral[200] },
    feeBreakdown: { marginTop: 24, padding: 16, backgroundColor: colors.background.default, borderRadius: 12 },
    feeBreakdownTitle: { fontSize: 14, fontFamily: Fonts.bold, color: colors.text.primary, marginBottom: 12 },
    feeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    feeLabel: { fontSize: 14, fontFamily: Fonts.regular, color: colors.text.secondary },
    feeValue: { fontSize: 14, fontFamily: Fonts.medium, color: colors.text.primary },
    totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.neutral[200] },
    totalLabel: { fontSize: 16, fontFamily: Fonts.bold, color: colors.text.primary },
    totalValue: { fontSize: 16, fontFamily: Fonts.bold, color: colors.primary.main },
  }), [colors]);
};
