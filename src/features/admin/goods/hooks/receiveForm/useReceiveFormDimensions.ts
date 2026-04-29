/**
 * useReceiveFormDimensions - Manages dimension input mode state
 */

import { useState } from 'react';

export const useReceiveFormDimensions = () => {
  const [useDimensions, setUseDimensions] = useState(true);
  return { useDimensions, setUseDimensions };
};
