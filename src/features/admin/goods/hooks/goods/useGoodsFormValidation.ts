/**
 * Goods Form Validation Hook
 */

import { GoodsFormData, GoodsFormErrors } from '../../types';

export const useGoodsFormValidation = () => {
  const validate = (formData: GoodsFormData, useDimensions: boolean): GoodsFormErrors => {
    const errors: GoodsFormErrors = {};

    if (!formData.clientPhone?.trim()) {
      errors.clientPhone = 'Veuillez sélectionner un client';
    }

    if (!formData.description?.trim()) {
      errors.description = 'La description est requise';
    }

    if (useDimensions) {
      const length = parseFloat(formData.length.replace(',', '.'));
      if (!formData.length || isNaN(length) || length <= 0) {
        errors.length = 'Longueur invalide';
      }

      const width = parseFloat(formData.width.replace(',', '.'));
      if (!formData.width || isNaN(width) || width <= 0) {
        errors.width = 'Largeur invalide';
      }

      const height = parseFloat(formData.height.replace(',', '.'));
      if (!formData.height || isNaN(height) || height <= 0) {
        errors.height = 'Hauteur invalide';
      }
    } else {
      const cbm = parseFloat(formData.cbm.replace(',', '.'));
      if (!formData.cbm || isNaN(cbm) || cbm <= 0) {
        errors.cbm = 'CBM invalide';
      }
    }

    if (formData.shippingMode === 'SEA') {
      const weight = parseFloat(formData.weight.replace(',', '.'));
      if (!formData.weight || isNaN(weight) || weight <= 0) {
        errors.weight = 'Poids requis pour le transport maritime';
      }
    } else if (formData.weight) {
      const weight = parseFloat(formData.weight.replace(',', '.'));
      if (isNaN(weight) || weight < 0) {
        errors.weight = 'Poids invalide';
      }
    }

    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity <= 0) {
      errors.quantity = 'Quantité invalide';
    }

    const unitPrice = parseFloat(formData.unitPrice.replace(',', '.'));
    if (!formData.unitPrice || isNaN(unitPrice) || unitPrice <= 0) {
      errors.unitPrice = 'Prix unitaire invalide';
    }

    if (!formData.location?.trim()) {
      errors.location = "L'emplacement est requis (ex: C3)";
    }

    return errors;
  };

  const isValid = (errors: GoodsFormErrors): boolean => {
    return Object.keys(errors).length === 0;
  };

  return { validate, isValid };
};
