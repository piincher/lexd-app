import {
  Control,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  UseFormReset,
  FormState,
} from 'react-hook-form';
import { userData } from '@src/shared/types/user';
import { ReceiveGoodsInput } from '../../../../types';
import { ReceiveGoodsFormData } from '../../types';

export interface UseReceiveGoodsFormReturn {
  control: Control<ReceiveGoodsFormData>;
  handleSubmit: UseFormHandleSubmit<ReceiveGoodsFormData>;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
  watch: UseFormWatch<ReceiveGoodsFormData>;
  reset: UseFormReset<ReceiveGoodsFormData>;
  formState: FormState<ReceiveGoodsFormData>;
  selectedClient: userData | null;
  setSelectedClient: (client: userData | null) => void;
  photoUris: string[];
  setPhotoUris: (uris: string[]) => void;
  addPhotoUri: (uri: string) => void;
  removePhotoUri: (uri: string) => void;
  useDimensions: boolean;
  setUseDimensions: (use: boolean) => void;
  calculatedCBM: number;
  totalCost: number;
  isFormValid: boolean;
  buildSubmitData: () => ReceiveGoodsInput | null;
  resetForm: () => void;
  /** Batch intake: reset per-item fields, keep session-sticky fields + client. */
  resetForNext: () => void;
  /** Remember the warehouse location used, to default it on the next intake. */
  persistLocation: (loc?: string) => void;
  /** Idempotency key — included in every submit so a retried request returns the
   *  already-saved goods instead of creating a duplicate. */
  idempotencyKey: string;
  /** Generate a fresh idempotency key — called after a successful save so the next
   *  parcel in a batch intake gets its own key. */
  regenerateIdempotencyKey: () => void;
  /** Wipe the persisted form draft from AsyncStorage. Called after a successful save. */
  clearDraft: () => Promise<void>;
}
