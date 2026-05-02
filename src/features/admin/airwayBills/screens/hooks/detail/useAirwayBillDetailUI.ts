import { useState, useCallback } from 'react';

export const useAirwayBillDetailUI = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuKey, setMenuKey] = useState(0);
  const [createBagVisible, setCreateBagVisible] = useState(false);

  const openMenu = useCallback(() => {
    setMenuKey((key) => key + 1);
    setMenuVisible(false);
    requestAnimationFrame(() => setMenuVisible(true));
  }, []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  return {
    menuVisible,
    menuKey,
    createBagVisible,
    setCreateBagVisible,
    openMenu,
    closeMenu,
  };
};
