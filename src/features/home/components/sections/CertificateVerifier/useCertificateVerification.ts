import { useState, useCallback } from 'react';
import { verifyCertificatePublic, type VerifiedCertificate } from '@src/shared/api/certificates';

export type VerifyState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: VerifiedCertificate }
  | { kind: 'error'; message: string };

export const useCertificateVerification = () => {
  const [code, setCode] = useState('');
  const [state, setState] = useState<VerifyState>({ kind: 'idle' });

  const handleVerify = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setState({ kind: 'loading' });
    try {
      const response = await verifyCertificatePublic(trimmed);
      if (response.success && response.data) {
        setState({ kind: 'success', data: response.data });
      } else {
        setState({ kind: 'error', message: response.message || 'Certificat introuvable' });
      }
    } catch {
      setState({ kind: 'error', message: 'Certificat introuvable ou code invalide' });
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode('');
    setState({ kind: 'idle' });
  }, []);

  const handleChangeText = useCallback((text: string) => {
    setCode(text.toUpperCase());
    setState((prev) => (prev.kind !== 'idle' && prev.kind !== 'loading' ? { kind: 'idle' } : prev));
  }, []);

  return {
    code,
    state,
    handleVerify,
    handleReset,
    handleChangeText,
  };
};
