/**
 * useReceiveIdempotencyKey - Per-form-session idempotency key for goods receive.
 *
 * Prevents the "same parcel registered twice" bug that bites warehouse operators when:
 *   1. The submit button is double-tapped before the spinner appears.
 *   2. The network drops the response after the backend already committed the save.
 *   3. React Query / axios retries a request that actually succeeded.
 *
 * One key per submit "session" — same key on every retry of the same parcel, regenerated
 * after a successful save so the next parcel gets a fresh key. The backend short-circuits
 * on a match within a 30-min window and returns the existing goods instead of duplicating.
 *
 * Uniqueness only needs to hold inside that window — Math.random + timestamp is more
 * than sufficient (no cryptographic randomness required).
 */

import { useCallback, useState } from 'react';

const generate = (): string => {
  const rand = () => Math.random().toString(36).slice(2, 10);
  return `recv-${Date.now().toString(36)}-${rand()}-${rand()}`;
};

export const useReceiveIdempotencyKey = () => {
  const [idempotencyKey, setKey] = useState<string>(generate);
  const regenerateIdempotencyKey = useCallback(() => {
    setKey(generate());
  }, []);
  /** Restore a specific key — used by the draft-persistence hook so a retried submit
   *  hits the backend dedupe and doesn't create a duplicate. */
  const setIdempotencyKey = useCallback((key: string) => {
    if (key && typeof key === 'string') setKey(key);
  }, []);
  return { idempotencyKey, regenerateIdempotencyKey, setIdempotencyKey };
};
