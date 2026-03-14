/**
 * Payment Validation Utilities
 */

// Luhn algorithm for card number validation
export const validateCardNumber = (cardNumber: string): string | undefined => {
  const clean = cardNumber.replace(/\s/g, '');
  
  if (!clean) return 'Le numéro de carte est requis';
  if (!/^\d+$/.test(clean)) return 'Le numéro de carte doit contenir uniquement des chiffres';
  if (clean.length < 13 || clean.length > 19) return 'Le numéro de carte doit contenir entre 13 et 19 chiffres';
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) return 'Numéro de carte invalide';
  
  return undefined;
};

export const validateExpiry = (expiry: string): string | undefined => {
  if (!expiry) return "La date d'expiration est requise";
  
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return 'Format invalide (MM/AA)';
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);
  
  if (month < 1 || month > 12) return 'Mois invalide';
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return "La carte a expiré";
  }
  
  return undefined;
};

export const validateCVV = (cvv: string): string | undefined => {
  if (!cvv) return 'Le CVV est requis';
  if (!/^\d+$/.test(cvv)) return 'Le CVV doit contenir uniquement des chiffres';
  if (cvv.length < 3 || cvv.length > 4) return 'Le CVV doit contenir 3 ou 4 chiffres';
  
  return undefined;
};

export const validateCardHolder = (name: string): string | undefined => {
  if (!name.trim()) return 'Le nom du titulaire est requis';
  if (name.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
  if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Le nom contient des caractères invalides';
  
  return undefined;
};

// Format helpers
export const formatCardNumber = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  const parts = [];
  for (let i = 0; i < clean.length; i += 4) {
    parts.push(clean.slice(i, i + 4));
  }
  return parts.join(' ');
};

export const formatExpiry = (value: string): string => {
  const clean = value.replace(/\D/g, '');
  if (clean.length >= 2) {
    return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
  }
  return clean;
};

// Detect card type
export const detectCardType = (cardNumber: string): string | undefined => {
  const clean = cardNumber.replace(/\D/g, '');
  
  if (clean.startsWith('4')) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  if (/^6(?:011|5)/.test(clean)) return 'discover';
  
  return undefined;
};
