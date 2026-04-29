/**
 * useDebouncedValue - Generic debounce hook for any value
 */

import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

export const useDebouncedValue = <T>(value: T, delayMs: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    debounceRef.current = debounce((v: T) => setDebouncedValue(v), delayMs);
    return () => {
      debounceRef.current?.cancel();
    };
  }, [delayMs]);

  useEffect(() => {
    debounceRef.current?.(value);
  }, [value]);

  return debouncedValue;
};
