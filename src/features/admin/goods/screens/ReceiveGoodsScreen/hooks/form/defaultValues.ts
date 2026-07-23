import { ReceiveGoodsFormData } from '../../types';

export const RECEIVE_FORM_DEFAULT_VALUES: ReceiveGoodsFormData = {
  description: '',
  shippingMode: 'SEA',
  length: '',
  width: '',
  height: '',
  cbm: '',
  weight: '',
  quantity: '1',
  packageCount: '1',
  unitPrice: '',
  location: '',
  receivedByName: '',
  expressTrackingNumber: '',
  receivedDate: '',
  condition: 'new',
  exceptionReasons: [],
  exceptionNotes: '',
};
