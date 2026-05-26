import { useCallback } from 'react';
import { goodsService } from '../../../services/GoodsService';
import type { DuplicateCandidate, ReceiveGoodsInput } from '../../../types';

type DuplicateCandidatesEnvelope = {
  candidates?: DuplicateCandidate[];
  data?: {
    candidates?: DuplicateCandidate[];
    data?: { candidates?: DuplicateCandidate[] };
  };
};

const unwrapCandidates = (response: unknown) => {
  const payload = response as DuplicateCandidatesEnvelope;
  return payload.data?.data?.candidates || payload.data?.candidates || payload.candidates || [];
};

export const useDuplicateCandidates = () => {
  const findCandidates = useCallback(async (
    input: ReceiveGoodsInput,
  ): Promise<DuplicateCandidate[]> => {
    const hasSignal =
      !!input.expressTrackingNumber?.trim() ||
      !!input.clientId ||
      !!input.weight ||
      input.description.trim().length >= 4;

    if (!hasSignal) return [];

    try {
      const response = await goodsService.getDuplicateCandidates({
        tracking: input.expressTrackingNumber,
        clientId: input.clientId || undefined,
        weight: input.weight,
        description: input.description,
      });
      return unwrapCandidates(response);
    } catch {
      return [];
    }
  }, []);

  return { findCandidates };
};
