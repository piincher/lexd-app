/**
 * ReceiveGoodsScreen Types - Form validation with Zod
 * Strict type safety for form handling
 */

import { z } from 'zod';
import { userData } from '@src/constants/types';

// ============================================
// ZOD SCHEMAS
// ============================================

/**
 * Schema for dimensions input (cm)
 */
export const dimensionsSchema = z.object({
  length: z.string()
    .min(1, 'La longueur est requise')
    .refine((val) => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, { message: 'Longueur invalide' }),
  width: z.string()
    .min(1, 'La largeur est requise')
    .refine((val) => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, { message: 'Largeur invalide' }),
  height: z.string()
    .min(1, 'La hauteur est requise')
    .refine((val) => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, { message: 'Hauteur invalide' }),
});

/**
 * Schema for receive goods form
 * CBM fields are conditionally required based on shipping mode
 */
export const receiveGoodsSchema = z.object({
  description: z.string()
    .min(1, 'La description est requise')
    .min(3, 'La description doit contenir au moins 3 caractères'),
  
  // Shipping mode - determines validation rules
  shippingMode: z.enum(['AIR', 'SEA'])
    .default('SEA'),
  
  // CBM fields - conditionally validated
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  cbm: z.string().optional(),
  
  weight: z.string()
    .min(1, 'Le poids est requis')
    .refine((val) => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, { message: 'Poids invalide' }),
  
  quantity: z.string()
    .min(1, 'La quantité est requise')
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0;
    }, { message: 'Quantité invalide' }),
  
  unitPrice: z.string()
    .min(1, 'Le prix unitaire est requis')
    .refine((val) => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, { message: 'Prix unitaire invalide' }),
  
  location: z.string()
    .min(1, "L'emplacement est requis")
    .min(2, "L'emplacement doit contenir au moins 2 caractères"),
  
  receivedByName: z.string()
    .min(1, 'Le nom du réceptionnaire est requis'),
  
  condition: z.enum(['new', 'used', 'damaged'])
    .default('new'),
}).refine((data) => {
  // For SEA shipping, CBM is required (either via dimensions or direct input)
  if (data.shippingMode === 'SEA') {
    const hasDimensions = data.length && data.width && data.height;
    const hasDirectCBM = data.cbm && parseFloat(data.cbm.replace(',', '.')) > 0;
    return hasDimensions || hasDirectCBM;
  }
  // For AIR shipping, CBM is optional
  return true;
}, {
  message: 'CBM est requis pour le transport maritime (dimensions ou CBM direct)',
  path: ['cbm'], // Error will be associated with cbm field
});

// ============================================
// TYPES
// ============================================

export type ReceiveGoodsFormData = z.infer<typeof receiveGoodsSchema>;

export interface ReceiveGoodsFormSectionProps {
  control: any;
  errors: any;
  setValue: any;
  watch: any;
}

export interface GoodsDimensionsInputProps extends ReceiveGoodsFormSectionProps {
  useDimensions: boolean;
  onToggleMode: (use: boolean) => void;
  calculatedCBM: number;
  shippingMode: 'AIR' | 'SEA';
}

export interface GoodsPhotosUploadProps {
  photoUri: string | null;
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: () => void;
}

export interface GoodsConditionSelectorProps extends ReceiveGoodsFormSectionProps {}

export interface ClientSelectionProps {
  selectedClient: userData | null;
  onSelectClient: (client: userData | null) => void;
  error?: string;
}

export interface CostSummaryProps {
  cbm: number;
  unitPrice: number;
  totalCost: number;
}

export interface SubmitSectionProps {
  isSubmitting: boolean;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface FormDialogsProps {
  errorMessage: string | null;
  showSuccessDialog: boolean;
  onDismissError: () => void;
  onDismissSuccess: () => void;
}
