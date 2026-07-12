import { useCallback, useMemo, useState } from 'react';
import type { ShippingMarkClient } from '../api/shippingMarkAdminApi';

export const useShippingMarkSelection = (clients: ShippingMarkClient[]) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const currentPageIds = useMemo(() => clients.map((client) => client._id), [clients]);
  const allCurrentPageSelected = currentPageIds.length > 0
    && currentPageIds.every((id) => selected.has(id));

  const toggleClientSelection = useCallback((clientId: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(clientId)) next.delete(clientId);
      else next.add(clientId);
      return next;
    });
  }, []);

  const toggleCurrentPageSelection = useCallback(() => {
    setSelected((current) => {
      const next = new Set(current);
      const shouldClearPage = currentPageIds.every((id) => next.has(id));
      currentPageIds.forEach((id) => (shouldClearPage ? next.delete(id) : next.add(id)));
      return next;
    });
  }, [currentPageIds]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);
  return { selected, allCurrentPageSelected, toggleClientSelection, toggleCurrentPageSelection, clearSelection };
};
