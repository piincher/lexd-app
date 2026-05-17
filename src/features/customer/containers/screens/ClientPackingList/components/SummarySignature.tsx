import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummarySignatureProps {
  signature?: {
    signed?: boolean;
    signedBy?: string;
    signerName?: string;
    signerRole?: string;
    signedAt?: string;
    signatureLabel?: string;
  };
  formatDate: (date?: string) => string;
  formatDateTime?: (date?: string | null) => string;
}

export const SummarySignature: React.FC<SummarySignatureProps> = ({
  signature,
  formatDate,
  formatDateTime,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();

  if (!signature?.signed) return null;

  return (
    <View style={[styles.signatureRow, { borderTopColor: colors.border }]}>
      <MaterialCommunityIcons name="signature-freehand" size={18} color={theme.colors.primary} />
      <View>
        <Text style={[styles.signatureText, { color: colors.text.secondary }]}>
          {signature.signatureLabel || `Signé par ${signature.signedBy || 'ChinaLink Express'}`}
        </Text>
        <Text style={[styles.signatureMeta, { color: colors.status.success }]}>
          {signature.signerName || 'Service Logistique'} ·{' '}
          {formatDateTime ? formatDateTime(signature.signedAt) : formatDate(signature.signedAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  signatureText: {
    flex: 1,
    fontFamily: Fonts.meduim,
    fontSize: 12,
    marginLeft: 8,
  },
  signatureMeta: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    marginTop: 2,
  },
});
