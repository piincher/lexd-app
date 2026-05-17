import { useCallback } from 'react';
import type { CountryCode } from '../components/types';
import { COUNTRIES } from './loginFormHelpers';

interface AutoDetectResult {
  country: CountryCode;
  nationalNumber: string;
}

/**
 * Detect country from phone number prefix.
 * Sorts country codes by length (longest first) to avoid prefix collisions.
 * Example: "225" matches Côte d'Ivoire before "22" could be considered.
 */
export const useAutoDetectCountry = () => {
  const detect = useCallback((phone: string, currentCountry: CountryCode): AutoDetectResult | null => {
    if (!phone || phone.length < 2) return null;

    const sorted = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);

    for (const country of sorted) {
      if (phone.startsWith(country.code) && country.code !== currentCountry.code) {
        const nationalNumber = phone.slice(country.code.length);
        return { country, nationalNumber };
      }
    }

    return null;
  }, []);

  return { detect };
};
