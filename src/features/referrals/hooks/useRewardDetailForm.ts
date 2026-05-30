import { useCallback, useMemo, useState } from 'react';
import type { RewardItem } from '../types';

export const useRewardDetailForm = (item: RewardItem | null, userPoints: number) => {
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [remarks, setRemarks] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const totalPoints = (item?.pointsRequired || 0) * quantity;
  const canAfford = userPoints >= totalPoints;
  const phoneError = phone.trim().length === 0;
  const isValid = canAfford && !phoneError && item !== null && item.stock > 0;

  const incQty = useCallback(() => {
    if (item && quantity < item.stock) setQuantity((q) => q + 1);
  }, [item, quantity]);

  const decQty = useCallback(() => {
    setQuantity((q) => Math.max(1, q - 1));
  }, []);

  const openConfirm = useCallback(() => {
    if (isValid) setShowConfirm(true);
  }, [isValid]);

  const closeConfirm = useCallback(() => setShowConfirm(false), []);

  return useMemo(
    () => ({
      quantity,
      phone,
      remarks,
      showConfirm,
      totalPoints,
      canAfford,
      phoneError,
      isValid,
      setPhone,
      setRemarks,
      incQty,
      decQty,
      openConfirm,
      closeConfirm,
    }),
    [quantity, phone, remarks, showConfirm, totalPoints, canAfford, phoneError, isValid, incQty, decQty, openConfirm, closeConfirm]
  );
};
