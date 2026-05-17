import React from 'react';
import { useFormikContext } from 'formik';
import { GradientButton } from './GradientButton';

interface Props {
  title: string;
  busy?: boolean;
}

export const SubmitGradientButton: React.FC<Props> = ({ title, busy }) => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <GradientButton
      title={title}
      onPress={handleSubmit}
      busy={busy}
      disabled={!isValid}
    />
  );
};
