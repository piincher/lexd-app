import { useState, useCallback, useEffect } from 'react';
import type { Goods } from '../api/types';

export interface EditGoodsFormData {
  description: string;
  quantity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  unitPrice: string;
  location: string;
  shippingMode: 'AIR' | 'SEA';
  receivedByName: string;
  useDimensions: boolean;
}

const initialFormData: EditGoodsFormData = {
  description: '',
  quantity: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  cbm: '',
  unitPrice: '',
  location: '',
  shippingMode: 'SEA',
  receivedByName: '',
  useDimensions: true,
};

export const useEditGoodsForm = (goods?: Goods) => {
  const [formData, setFormData] = useState<EditGoodsFormData>(initialFormData);

  useEffect(() => {
    if (goods) {
      const hasDimensions = !!(goods.dimensions?.length && goods.dimensions?.width && goods.dimensions?.height);
      setFormData({
        description: goods.description || '',
        quantity: goods.quantity?.toString() || '1',
        weight: goods.weight?.toString() || '',
        length: goods.dimensions?.length?.toString() || '',
        width: goods.dimensions?.width?.toString() || '',
        height: goods.dimensions?.height?.toString() || '',
        cbm: goods.actualCBM?.toString() || goods.cbm?.toString() || '',
        unitPrice: goods.unitPrice?.toString() || '',
        location: goods.warehouseLocation || '',
        shippingMode: goods.shippingMode || 'SEA',
        receivedByName: goods.receivedByName || '',
        useDimensions: hasDimensions,
      });
    }
  }, [goods]);

  const updateField = useCallback((field: keyof EditGoodsFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { formData, updateField };
};
