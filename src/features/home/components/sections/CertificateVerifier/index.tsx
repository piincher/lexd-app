/**
 * CertificateVerifier
 * Public certificate verification with refined input UX
 * and beautiful result cards.
 */
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAuth } from '@src/store/Auth';
import { SectionHeader } from '../../SectionHeader';
import { CertificateSuccessResult, CertificateErrorResult } from '../CertificateResult';
import { LoginPromptCard } from '../LoginPromptCard';
import { createStyles } from './CertificateVerifier.styles';
import { CertificateVerifierHeader } from './CertificateVerifierHeader';
import { CertificateVerifierInput } from './CertificateVerifierInput';
import { useCertificateVerification } from './useCertificateVerification';

export const CertificateVerifier: React.FC = () => {
  const { colors } = useAppTheme();
  const token = useAuth((state) => state.token);
  const styles = createStyles(colors);
  const { code, state, handleVerify, handleReset, handleChangeText } = useCertificateVerification();

  return (
    <View style={styles.container}>
      {!token && <LoginPromptCard />}

      <SectionHeader
        title="Verifier un Certificat"
        subtitle="Entrez le code de verification pour confirmer l'authenticite"
      />

      <Animated.View
        entering={FadeInDown.delay(200).duration(500).springify()}
        style={[styles.verifyCard, { backgroundColor: colors.background.card }]}
      >
        <CertificateVerifierHeader />
        <CertificateVerifierInput
          code={code}
          onChangeText={handleChangeText}
          onVerify={handleVerify}
          onReset={handleReset}
          state={state}
        />
        {state.kind === 'success' && <CertificateSuccessResult data={state.data} />}
        {state.kind === 'error' && <CertificateErrorResult message={state.message} />}
      </Animated.View>
    </View>
  );
};
