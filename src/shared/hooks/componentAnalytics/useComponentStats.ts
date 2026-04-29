import { useCallback } from 'react';

export function useComponentStats(
  componentName: string,
  mountTime: React.MutableRefObject<number>,
  renderCount: React.MutableRefObject<number>,
  interactionCount: React.MutableRefObject<number>
) {
  const getStats = useCallback(() => ({
    componentName,
    mountTime: mountTime.current,
    renderCount: renderCount.current,
    interactionCount: interactionCount.current,
    lifetime: Date.now() - mountTime.current,
  }), [componentName, mountTime, renderCount, interactionCount]);

  return {
    getStats,
    renderCount: renderCount.current,
    interactionCount: interactionCount.current,
  };
}
