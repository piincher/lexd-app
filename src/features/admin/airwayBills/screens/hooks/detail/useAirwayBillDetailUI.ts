import { useState, useCallback } from 'react';

export const useAirwayBillDetailUI = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [createBagVisible, setCreateBagVisible] = useState(false);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  return {
    menuVisible,
    createBagVisible,
    setCreateBagVisible,
    openMenu,
    closeMenu,
  };
};
