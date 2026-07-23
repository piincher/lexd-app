import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
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
  const { colors } = useAppTheme();

  if (!signature?.signed) return null;

  return (
    <View style={[styles.signatureRow, { borderTopColor: colors.border }]}>
      <View style={[styles.sigIconWrap, { backgroundColor: colors.primary[50] }]}>
        <MaterialCommunityIcons name="signature-freehand" size={16} color={colors.primary[600]} />
      </View>
      <View style={styles.sigContent}>
        <Text style={[styles.signatureText, { color: colors.text.primary }]}>
          {signature.signatureLabel || `Signé par ${signature.signedBy || 'LEXD'}`}
        </Text>
        <Text style={[styles.signatureMeta, { color: colors.text.muted }]}>
          {signature.signerName || 'Service Logistique'} · {' '}
          {formatDateTime ? formatDateTime(signature.signedAt) : formatDate(signature.signedAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 10,
  },
  sigIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sigContent: {
    flex: 1,
  },
  signatureText: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
  },
  signatureMeta: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
