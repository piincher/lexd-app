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
}
