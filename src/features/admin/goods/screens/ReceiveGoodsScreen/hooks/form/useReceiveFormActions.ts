import { useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';
import { userData } from '@src/shared/types/user';
import { ReceiveGoodsInput } from '../../../../types';
import { ReceiveGoodsFormData } from '../../types';
import { RECEIVE_FORM_DEFAULT_VALUES } from './defaultValues';

interface Options {
  selectedClient: userData | null;
  watchedValues: ReceiveGoodsFormData;
  useDimensions: boolean;
  calculatedCBM: number;
  reset: UseFormReset<ReceiveGoodsFormData>;
  initialQuantity: number;
  setSelectedClient: (client: userData | null) => void;
  setPhotoUris: (uris: string[]) => void;
  setUseDimensions: (use: boolean) => void;
  /** Threaded into the submit input so a retried request resolves to the original goods. */
  idempotencyKey: string;
  /** Per-receipt WhatsApp opt-out from the form's "Notifier par WhatsApp" toggle. */
  notifyWhatsapp: boolean;
  /** How the goods photos were obtained (camera vs gallery) — for the photo attestation audit trail. */
  photoSource?: 'camera' | 'gallery';
}

export const useReceiveFormActions = (options: Options) => {
  const {
    selectedClient,
    watchedValues,
    useDimensions,
    calculatedCBM,
    reset,
    initialQuantity,
    setSelectedClient,
    setPhotoUris,
    setUseDimensions,
    idempotencyKey,
    notifyWhatsapp,
    photoSource,
  } = options;

  const buildSubmitData = useCallback((): ReceiveGoodsInput | null => {
    const isClientUnknown = watchedValues.exceptionReasons?.includes('CLIENT_UNKNOWN');
    if (!selectedClient && !isClientUnknown) return null;

    const weight = parseFloat(watchedValues.weight.replace(',', '.'));
    const quantity = parseInt(watchedValues.quantity, 10);
    const unitPrice = parseFloat(watchedValues.unitPrice.replace(',', '.'));

    // Guard against NaN so we never send invalid numbers to the backend.
    if (!Number.isFinite(weight) || !Number.isFinite(quantity) || !Number.isFinite(unitPrice)) {
      return null;
    }

    const input: ReceiveGoodsInput = {
      clientId: selectedClient?._id ?? null,
      description: watchedValues.description.trim(),
      weight,
      quantity,
      unitPrice,
      location: watchedValues.location.toUpperCase().trim(),
      receivedByName: watchedValues.receivedByName.trim(),
      expressTrackingNumber:
        watchedValues.expressTrackingNumber?.trim() || undefined,
      receivedDate: watchedValues.receivedDate || undefined,
      shippingMode: watchedValues.shippingMode || 'SEA',
      condition: watchedValues.condition || 'new',
      exceptionReasons: watchedValues.exceptionReasons || [],
      exceptionNotes: watchedValues.exceptionNotes?.trim() || undefined,
      idempotencyKey: idempotencyKey || undefined,
      // Only thread `false` — `true` is the default the backend assumes when
      // the field is absent, so we keep the payload small for the common case.
      notifyWhatsapp: notifyWhatsapp === false ? false : undefined,
      // Photo provenance for the watermark/attestation audit trail.
      source: photoSource,
      capturedAt: photoSource ? new Date().toISOString() : undefined,
    };

    if (
      useDimensions &&
      watchedValues.length &&
      watchedValues.width &&
      watchedValues.height
    ) {
      input.dimensions = {
        length: parseFloat(watchedValues.length.replace(',', '.')),
        width: parseFloat(watchedValues.width.replace(',', '.')),
        height: parseFloat(watchedValues.height.replace(',', '.')),
      };
    }

    if (calculatedCBM > 0) {
      input.actualCBM = calculatedCBM;
    }

    return input;
  }, [selectedClient, watchedValues, useDimensions, calculatedCBM, idempotencyKey, notifyWhatsapp, photoSource]);

  const resetForm = useCallback(() => {
    reset({
      ...RECEIVE_FORM_DEFAULT_VALUES,
      quantity: initialQuantity.toString(),
    });
    setSelectedClient(null);
    setPhotoUris([]);
    setUseDimensions(false);
  }, [reset, initialQuantity, setSelectedClient, setPhotoUris, setUseDimensions]);

  const resetForNext = useCallback(() => {
    reset({
      ...RECEIVE_FORM_DEFAULT_VALUES,
      quantity: initialQuantity.toString(),
      shippingMode: watchedValues.shippingMode || 'SEA',
      location: watchedValues.location || '',
      receivedByName: watchedValues.receivedByName || '',
      receivedDate: watchedValues.receivedDate || '',
      exceptionReasons: [],
      exceptionNotes: '',
    });
    setPhotoUris([]);
    setUseDimensions(false);
    // selectedClient is intentionally preserved.
  }, [reset, initialQuantity, watchedValues, setPhotoUris, setUseDimensions]);

  return { buildSubmitData, resetForm, resetForNext };
};
