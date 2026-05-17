import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CertificateVerifier.styles';

export const CertificateVerifierHeader: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.verifyHeader}>
      <View style={[styles.shieldCircle, { backgroundColor: `${colors.primary.main}14` }]}>
        <FontAwesome6 name="shield-halved" size={20} color={colors.primary.main} />
      </View>
      <View style={styles.verifyHeaderText}>
        <Text style={[styles.verifyTitle, { color: colors.text.primary }]}>Authentification</Text>
        <Text style={[styles.verifyHint, { color: colors.text.secondary }]}>
          Code inscrit sur le certificat
        </Text>
      </View>
    </View>
  );
};
