import { useState, useCallback } from "react";
import { useValidatePromo } from "./usePromos";
import type { ValidationResult } from "../api";

interface UsePromoCodeInputOptions {
  goodsIds?: string[];
  amount?: number;
  onPromoApplied?: (result: {
    code: string;
    discountAmount: number;
    finalAmount: number;
  }) => void;
  onPromoRemoved?: () => void;
}

export const usePromoCodeInput = (options: UsePromoCodeInputOptions) => {
  const { goodsIds, amount, onPromoApplied, onPromoRemoved } = options;
  const [code, setCode] = useState("");
  const [appliedResult, setAppliedResult] = useState<ValidationResult | null>(null);
  const [appliedCode, setAppliedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePromo = useValidatePromo();

  const handleCodeChange = useCallback((text: string) => {
    setCode(text.toUpperCase());
    setErrorMessage("");
  }, []);

  const handleApply = useCallback(() => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setErrorMessage("");

    validatePromo.mutate(
      { code: trimmed, goodsIds, amount },
      {
        onSuccess: (result) => {
          if (result.valid) {
            setAppliedResult(result);
            setAppliedCode(trimmed);
            setErrorMessage("");
            onPromoApplied?.({
              code: trimmed,
              discountAmount: result.discountAmount ?? 0,
              finalAmount: result.finalAmount ?? 0,
            });
          } else {
            setErrorMessage(result.reason ?? "Code promo invalide");
          }
        },
        onError: (error) => {
          setErrorMessage(error.message || "Erreur lors de la validation");
        },
      }
    );
  }, [code, goodsIds, amount, validatePromo, onPromoApplied]);

  const handleRemove = useCallback(() => {
    setAppliedResult(null);
    setAppliedCode("");
    setCode("");
    setErrorMessage("");
    onPromoRemoved?.();
  }, [onPromoRemoved]);

  return {
    code,
    handleCodeChange,
    appliedResult,
    appliedCode,
    errorMessage,
    isPending: validatePromo.isPending,
    handleApply,
    handleRemove,
  };
};
