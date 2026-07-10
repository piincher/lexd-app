/**
 * ReceiveGoodsScreen Types - Form validation with Zod
 * Strict type safety for form handling
 */

import { z } from 'zod';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { userData } from '@src/shared/types/user';
import type { ReceiveExceptionReason } from '../../types';

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
  
  // Required for SEA, optional for AIR. Mode-aware validation happens below.
  weight: z.string().default(''),
  
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
  
  expressTrackingNumber: z.string()
    .optional(),
  
  receivedDate: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const d = new Date(val);
      return !isNaN(d.getTime());
    }, { message: 'Date de réception invalide' }),
  
  condition: z.enum(['new', 'used', 'damaged'])
    .default('new'),
  
  exceptionReasons: z.array(z.enum([
    'CLIENT_UNKNOWN',
    'TRACKING_DOUBTFUL',
    'DAMAGED',
    'PRICE_TO_CONFIRM',
    'PHOTO_MISSING',
  ])).default([]),
  
  exceptionNotes: z.string().optional(),
}).superRefine((data, ctx) => {
  const weightText = data.weight?.trim() || '';
  const weight = parseFloat(weightText.replace(',', '.'));

  if (data.shippingMode === 'SEA' && (!weightText || isNaN(weight) || weight <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Le poids est requis',
      path: ['weight'],
    });
  }

  if (data.shippingMode === 'AIR' && weightText && (isNaN(weight) || weight < 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Poids invalide',
      path: ['weight'],
    });
  }

  // For SEA shipping, CBM is required (either via dimensions or direct input)
  if (data.shippingMode === 'SEA') {
    const hasDimensions = data.length && data.width && data.height;
    const hasDirectCBM = data.cbm && parseFloat(data.cbm.replace(',', '.')) > 0;
    if (!hasDimensions && !hasDirectCBM) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CBM est requis pour le transport maritime (dimensions ou CBM direct)',
        path: ['cbm'],
      });
    }
  }

  if (data.exceptionReasons.includes('CLIENT_UNKNOWN') && !data.exceptionNotes?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Expliquez pourquoi le client est inconnu',
      path: ['exceptionNotes'],
    });
  }
});

// ============================================
// TYPES
// ============================================

export type ReceiveGoodsFormData = z.infer<typeof receiveGoodsSchema>;

export type { ReceiveExceptionReason };

export interface ReceiveGoodsFormSectionProps {
  control: Control<ReceiveGoodsFormData>;
  errors: FieldErrors<ReceiveGoodsFormData>;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
  watch: UseFormWatch<ReceiveGoodsFormData>;
}

export interface GoodsDimensionsInputProps extends ReceiveGoodsFormSectionProps {
  useDimensions: boolean;
  onToggleMode: (use: boolean) => void;
  calculatedCBM: number;
  shippingMode: 'AIR' | 'SEA';
}

export interface GoodsPhotosUploadProps {
  photoUris: string[];
  onPhotoSelected: (uri: string, source?: 'camera' | 'gallery') => void;
  onPhotoRemoved: (uri: string) => void;
}

export type GoodsConditionSelectorProps = ReceiveGoodsFormSectionProps;

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
