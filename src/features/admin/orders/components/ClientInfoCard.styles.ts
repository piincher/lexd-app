import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useClientInfoCardStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.card,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginLeft: 8,
      color: colors.text.primary,
    },
    clientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    clientInfo: {
      marginLeft: 12,
      flex: 1,
    },
    clientName: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      color: colors.text.primary,
    },
    clientPhone: {
      fontSize: 14,
      color: colors.primary.main,
      fontFamily: Fonts.regular,
      marginTop: 2,
      textDecorationLine: 'underline',
    },
    clientActions: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flex: 1,
      borderRadius: 8,
    },
    whatsappButton: {
      flex: 1,
    },
  });
};
