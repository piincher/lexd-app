/**
 * Route Feature Types - Phase 3
 * Domain types for shipping route management
 */

// ============================================
// DOMAIN ENTITIES
// ============================================

/**
 * Shipping mode for routes
 */
export type ShippingMode = 'SEA' | 'AIR';

/**
 * Available shipping lines for SEA mode
 */
export type ShippingLine = 'MSC' | 'MAERSK' | 'CMA_CGM' | 'HAPAG_LLOYD' | 'ETHIOPIAN_AIRLINES';

/**
 * Core Route entity
 */
export interface Route {
  _id: string;
  name: string;
  shippingMode: ShippingMode;
  origin: {
    city: string;
    country: string;
    warehouse?: string;
  };
  destination: {
    city: string;
    country: string;
    warehouse?: string;
  };
  shippingLine: string;
  estimatedTransitDays: number;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  waypoints: RouteWaypoint[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

/**
 * Input for creating a route
 */
export type CreateRouteInput = Omit<Route, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>;

/**
 * Input for updating a route
 */
export type UpdateRouteInput = Partial<CreateRouteInput>;

// ============================================
// FILTER & QUERY TYPES
// ============================================

/**
 * Route filters
 */
export interface RouteFilters {
  shippingMode?: ShippingMode;
  isActive?: boolean;
  shippingLine?: string;
}

// ============================================
// UI STATE TYPES
// ============================================

/**
 * Route form data
 */
export interface RouteFormData {
  name: string;
  shippingMode: ShippingMode | '';
  origin: string;
  destination: string;
  shippingLine: ShippingLine | '';
  estimatedTransitDays: string;
  description: string;
  isActive: boolean;
}

// ============================================
// DISPLAY CONSTANTS
// ============================================

/**
 * Shipping mode display labels
 */
export const SHIPPING_MODE_LABELS: Record<ShippingMode, string> = {
  SEA: 'Maritime',
  AIR: 'Aérien',
};

/**
 * Shipping mode colors for UI
 */
export const SHIPPING_MODE_COLORS: Record<ShippingMode, string> = {
  SEA: '#3B82F6', // Blue
  AIR: '#8B5CF6', // Purple
};

/**
 * Shipping line display names
 */
export const SHIPPING_LINE_LABELS: Record<ShippingLine, string> = {
  MSC: 'MSC - Mediterranean Shipping',
  MAERSK: 'Maersk Line',
  CMA_CGM: 'CMA CGM',
  HAPAG_LLOYD: 'Hapag-Lloyd',
  ETHIOPIAN_AIRLINES: 'Ethiopian Airlines',
};

/**
 * Available shipping lines by mode
 */
export const SHIPPING_LINES_BY_MODE: Record<ShippingMode, ShippingLine[]> = {
  SEA: ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'],
  AIR: [], // Air routes don't use shipping lines
};

/**
 * Common origins
 */
export const COMMON_ORIGINS = [
  'Chine (Guangzhou)',
  'Chine (Shenzhen)',
  'Chine (Shanghai)',
  'Chine (Ningbo)',
  'Chine (Qingdao)',
];

/**
 * Common destinations
 */
export const COMMON_DESTINATIONS = [
  'Mali (Bamako)',
  'Sénégal (Dakar)',
  'Côte d\'Ivoire (Abidjan)',
  'Burkina Faso (Ouagadougou)',
  'Niger (Niamey)',
  'Guinée (Conakry)',
  'Bénin (Cotonou)',
  'Togo (Lomé)',
];

// ============================================
// ROUTE FORM STEP TYPES
// ============================================

/**
 * Route form step identifiers
 */
export type RouteFormStep =
  | 'basic-info'
  | 'origin'
  | 'destination'
  | 'schedule'
  | 'pricing'
  | 'waypoints'
  | 'review';

/**
 * Configuration for a form step
 */
export interface RouteFormStepConfig {
  id: RouteFormStep;
  title: string;
  description: string;
  icon: string;
  isOptional?: boolean;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  name?: string;
  shippingMode?: string;
  origin?: string;
  destination?: string;
  shippingLine?: string;
  estimatedTransitDays?: string;
  baseRate?: string;
}

/**
 * Props for route form step components
 */
export interface RouteFormStepProps {
  formData: RouteFormData;
  errors: FormErrors;
  onUpdateField: <K extends keyof RouteFormData>(field: K, value: RouteFormData[K]) => void;
  onClearError: (field: keyof FormErrors) => void;
  isEditMode: boolean;
}

/**
 * Props for form navigation component
 */
export interface RouteFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isEditMode: boolean;
}

/**
 * Props for form stepper component
 */
export interface RouteFormStepperProps {
  steps: RouteFormStepConfig[];
  currentStep: number;
  onStepPress?: (stepIndex: number) => void;
  allowNavigation?: boolean;
}

/**
 * Route waypoint for intermediate stops
 */
export interface RouteWaypoint {
  id: string;
  order: number;
  location: {
    city: string;
    country: string;
  };
  estimatedDaysFromStart: number;
  description: string;
  type: 'PORT' | 'AIRPORT' | 'CUSTOMS' | 'ROAD' | 'WAREHOUSE' | 'BORDER';
}

/**
 * Navigation prop type for route screens
 */
export type NavigationProp = {
  navigate: (screen: string, params?: object) => void;
  goBack: () => void;
};

/**
 * Form step configurations
 */
export const ROUTE_FORM_STEPS: RouteFormStepConfig[] = [
  {
    id: 'basic-info',
    title: 'Informations',
    description: 'Nom et description',
    icon: 'information-circle',
  },
  {
    id: 'origin',
    title: 'Origine',
    description: 'Entrepôt de départ',
    icon: 'location',
  },
  {
    id: 'destination',
    title: 'Destination',
    description: 'Point d\'arrivée',
    icon: 'flag',
  },
  {
    id: 'schedule',
    title: 'Planning',
    description: 'Dates et délais',
    icon: 'calendar',
  },
  {
    id: 'pricing',
    title: 'Tarifs',
    description: 'Coûts et taux',
    icon: 'cash',
  },
  {
    id: 'waypoints',
    title: 'Étapes',
    description: 'Arrêts intermédiaires',
    icon: 'map',
    isOptional: true,
  },
  {
    id: 'review',
    title: 'Révision',
    description: 'Vérification finale',
    icon: 'checkmark-circle',
  },
];
