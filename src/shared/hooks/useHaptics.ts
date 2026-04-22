import {
  hapticLight,
  hapticMedium,
  hapticSuccess,
  hapticError,
  hapticSelection,
} from '@src/shared/lib/haptics';

export const useHaptics = () => {
  return {
    hapticLight,
    hapticMedium,
    hapticSuccess,
    hapticError,
    hapticSelection,
  };
};
