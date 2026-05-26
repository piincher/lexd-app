import { useForm, Control, UseFormHandleSubmit, UseFormSetValue, UseFormWatch, UseFormReset, FormState, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { receiveGoodsSchema, ReceiveGoodsFormData } from '../../types';
import { RECEIVE_FORM_DEFAULT_VALUES } from './defaultValues';

interface Options {
  initialQuantity?: number;
  /** Smart defaults (receiver, date, …) merged over the static defaults at form init. */
  defaults?: Partial<ReceiveGoodsFormData>;
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
  const { initialQuantity = 1, defaults } = options;

  const { control, handleSubmit, setValue, watch, reset, formState } =
    useForm<ReceiveGoodsFormData>({
      resolver: zodResolver(receiveGoodsSchema) as Resolver<ReceiveGoodsFormData>,
      mode: 'onChange',
      defaultValues: {
        ...RECEIVE_FORM_DEFAULT_VALUES,
        quantity: initialQuantity.toString(),
        ...defaults,
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
