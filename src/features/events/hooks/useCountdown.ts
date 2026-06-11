import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isExpired: boolean;
}

const computeRemaining = (target: number): Countdown => {
  const totalMs = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMs,
    isExpired: totalMs <= 0,
  };
};

/**
 * Ticking countdown to an ISO/Date target. Recomputes from the absolute
 * target each tick (no drift), so it stays correct across backgrounding and
 * clock changes. Pass null to disable (no interval is created).
 */
export const useCountdown = (target: string | Date | null): Countdown | null => {
  const targetMs = target ? new Date(target).getTime() : null;
  const [countdown, setCountdown] = useState<Countdown | null>(() =>
    targetMs != null ? computeRemaining(targetMs) : null
  );

  useEffect(() => {
    if (targetMs == null) {
      setCountdown(null);
      return;
    }
    setCountdown(computeRemaining(targetMs));
    if (targetMs <= Date.now()) return; // already expired — no ticking

    const id = setInterval(() => {
      const next = computeRemaining(targetMs);
      setCountdown(next);
      if (next.isExpired) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [targetMs]);

  return countdown;
};
