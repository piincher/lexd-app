/**
 * Auth Components Constants
 * Shared constants for authentication UI components
 */

import type { CountryCode } from './types';

export const COUNTRY_CODES: CountryCode[] = [
  { code: '223', flag: '🇲🇱', country: 'Mali', minLength: 8, maxLength: 8, placeholder: 'XX XX XX XX', validationLabel: '8 chiffres' },
  { code: '225', flag: '🇨🇮', country: "Côte d'Ivoire", minLength: 8, maxLength: 10, placeholder: 'XX XX XX XX', validationLabel: '8 à 10 chiffres' },
  { code: '86', flag: '🇨🇳', country: 'Chine', minLength: 11, maxLength: 11, placeholder: '1XX XXXX XXXX', validationLabel: '11 chiffres' },
  { code: '33', flag: '🇫🇷', country: 'France', minLength: 9, maxLength: 9, inputMaxLength: 10, placeholder: '6 XX XX XX XX', validationLabel: '9 chiffres sans le 0 initial' },
];
