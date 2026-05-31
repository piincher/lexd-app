import { useEffect, useState } from 'react';

/** Returns a debounced copy of `value` that only updates after `delayMs` of quiet. */
export const useDebouncedValue = <T>(value: T, delayMs: number = 350): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
};
