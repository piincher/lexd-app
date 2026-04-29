import React from 'react';
import { GoodsInfoCard } from './components/GoodsInfoCard';
import { PhysicalPropertiesCard } from './components/PhysicalPropertiesCard';
import { LocationCard } from './components/LocationCard';
import type { FormData, FormErrors } from './components/types';

interface GoodsVerificationFormProps {
  formData: FormData;
  errors: FormErrors;
  useDimensions: boolean;
  calculatedCBM: number;
  onChangeField: (field: string, value: string) => void;
  onToggleDimensions: (use: boolean) => void;
}

export const GoodsVerificationForm: React.FC<GoodsVerificationFormProps> = ({
  formData,
  errors,
  useDimensions,
  calculatedCBM,
  onChangeField,
  onToggleDimensions,
}) => {
  return (
    <>
      <GoodsInfoCard
        description={formData.description}
        length={formData.length}
        width={formData.width}
        height={formData.height}
        cbm={formData.cbm}
        useDimensions={useDimensions}
        calculatedCBM={calculatedCBM}
        errors={errors}
        onChangeField={onChangeField}
        onToggleDimensions={onToggleDimensions}
      />
      <PhysicalPropertiesCard
        weight={formData.weight}
        quantity={formData.quantity}
        unitPrice={formData.unitPrice}
        errors={errors}
        onChangeField={onChangeField}
      />
      <LocationCard
        location={formData.location}
        receivedByName={formData.receivedByName}
        errors={errors}
        onChangeField={onChangeField}
      />
    </>
  );
};
