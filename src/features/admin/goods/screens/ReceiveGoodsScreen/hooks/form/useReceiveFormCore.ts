import { useForm, Control, UseFormHandleSubmit, UseFormSetValue, UseFormWatch, UseFormReset, FormState, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { receiveGoodsSchema, ReceiveGoodsFormData } from '../../types';

const DEFAULT_VALUES: ReceiveGoodsFormData = {
  description: '',
  shippingMode: 'SEA',
  length: '',
  width: '',
  height: '',
  cbm: '',
  weight: '',
  quantity: '1',
  unitPrice: '',
  location: '',
  receivedByName: '',
  expressTrackingNumber: '',
  receivedDate: '',
  condition: 'new',
};

interface Options {
  initialQuantity?: number;
}

interface UseReceiveFormCoreReturn {
  control: Control<ReceiveGoodsFormData>;
  handleSubmit: UseFormHandleSubmit<ReceiveGoodsFormData>;
  setValue: UseFormSetValue<ReceiveGoodsFormData>;
  watch: UseFormWatch<ReceiveGoodsFormData>;
  reset: UseFormReset<ReceiveGoodsFormData>;
  formState: FormState<ReceiveGoodsFormData>;
  watchedValues: ReceiveGoodsFormData;
  isAirShipping: boolean;
  initialQuantity: number;
}

export const useReceiveFormCore = (options: Options = {}): UseReceiveFormCoreReturn => {
  const { initialQuantity = 1 } = options;

  const { control, handleSubmit, setValue, watch, reset, formState } =
    useForm<ReceiveGoodsFormData>({
      resolver: zodResolver(receiveGoodsSchema) as Resolver<ReceiveGoodsFormData>,
      mode: 'onChange',
      defaultValues: {
        ...DEFAULT_VALUES,
        quantity: initialQuantity.toString(),
      },
    });

  const watchedValues = watch();
  const shippingMode = watchedValues.shippingMode || 'SEA';
  const isAirShipping = shippingMode === 'AIR';

  return {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState,
    watchedValues,
    isAirShipping,
    initialQuantity,
  };
};
