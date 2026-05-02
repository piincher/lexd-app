/**
 * Auth Components Types
 * Shared types for authentication UI components
 */

export interface CountryCode {
  code: string;
  flag: string;
  country: string;
  minLength: number;
  maxLength: number;
  inputMaxLength?: number;
  placeholder: string;
  validationLabel: string;
}
