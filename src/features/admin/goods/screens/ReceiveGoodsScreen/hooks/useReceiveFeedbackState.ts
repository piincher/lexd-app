import { useCallback, useState } from 'react';

export const useReceiveFeedbackState = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Marchandise enregistrée avec succès!');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [duplicateWarnings, setDuplicateWarnings] = useState(0);

  const dismissError = useCallback(() => setErrorMessage(null), []);
  const dismissInfo = useCallback(() => setInfoMessage(null), []);
  const bumpDuplicateWarnings = useCallback((count: number) => {
    setDuplicateWarnings((current) => current + count);
  }, []);
  const resetFeedback = useCallback(() => {
    setIsSubmitted(false);
    setSessionCount(0);
    setDuplicateWarnings(0);
  }, []);

  return {
    errorMessage,
    infoMessage,
    showSuccessDialog,
    successMessage,
    isSubmitted,
    sessionCount,
    duplicateWarnings,
    setErrorMessage,
    setInfoMessage,
    setShowSuccessDialog,
    setSuccessMessage,
    setIsSubmitted,
    setSessionCount,
    dismissError,
    dismissInfo,
    bumpDuplicateWarnings,
    resetFeedback,
  };
};
