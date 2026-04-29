import React from "react";
import { usePromoCodeInput } from "../../hooks";
import { PromoCodeInputForm } from "./components/PromoCodeInputForm";
import { PromoCodeSuccessCard } from "./components/PromoCodeSuccessCard";

interface PromoCodeInputProps {
  goodsIds?: string[];
  amount?: number;
  onPromoApplied?: (result: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  }) => void;
  onPromoRemoved?: () => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  goodsIds,
  amount,
  onPromoApplied,
  onPromoRemoved,
}) => {
  const {
    code,
    handleCodeChange,
    appliedResult,
    appliedCode,
    errorMessage,
    isPending,
    handleApply,
    handleRemove,
  } = usePromoCodeInput({ goodsIds, amount, onPromoApplied, onPromoRemoved });

  if (appliedResult && appliedCode) {
    return (
      <PromoCodeSuccessCard
        appliedCode={appliedCode}
        appliedResult={appliedResult}
        onRemove={handleRemove}
      />
    );
  }

  return (
    <PromoCodeInputForm
      code={code}
      onChangeCode={handleCodeChange}
      onApply={handleApply}
      isPending={isPending}
      errorMessage={errorMessage}
    />
  );
};

export default PromoCodeInput;
