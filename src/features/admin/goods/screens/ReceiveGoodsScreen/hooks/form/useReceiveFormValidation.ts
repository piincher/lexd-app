import { useMemo } from 'react';
import { FormState } from 'react-hook-form';
import { userData } from '@src/shared/types/user';
import { ReceiveGoodsFormData } from '../../types';

export const useReceiveFormValidation = (
  formState: FormState<ReceiveGoodsFormData>,
  selectedClient: userData | null,
  exceptionReasons: ReceiveGoodsFormData['exceptionReasons'] = [],
) => {
  const isFormValid = useMemo(() => {
    const hasNoErrors = Object.keys(formState.errors).length === 0;
    const isDirty = formState.isDirty;
    const hasClient = selectedClient !== null || exceptionReasons.includes('CLIENT_UNKNOWN');
    return hasNoErrors && isDirty && hasClient;
  }, [exceptionReasons, formState.errors, formState.isDirty, selectedClient]);

  return { isFormValid };
};
