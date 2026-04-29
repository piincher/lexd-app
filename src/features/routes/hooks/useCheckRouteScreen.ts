import { useCallback, useState } from 'react';
import { useCheckRoute } from './useCheckRoute';
import { useRecentSearches } from './useRecentSearches';

const parseErrorMessage = (error: unknown): string => {
  if (!error) return '';
  if (typeof error === 'object' && error !== null) {
    const maybe = error as { response?: { data?: { message?: string } }; message?: string };
    if (maybe.response?.data?.message) return maybe.response.data.message;
    if (maybe.message) return maybe.message;
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
};

export const useCheckRouteScreen = () => {
  const [code, setCode] = useState('');
  const { mutate, data, isPending, isError, error, reset } = useCheckRoute();
  const { recent, push: pushRecent, clear: clearRecent } = useRecentSearches();

  const handleSubmit = useCallback(
    (override?: string) => {
      const payload = (override ?? code).trim().toUpperCase();
      if (!payload) return;
      reset();
      mutate(
        { code: payload },
        {
          onSuccess: (result) => {
            if (result?.route && result.route.length > 0) {
              pushRecent(payload);
            }
          },
        }
      );
    },
    [code, mutate, pushRecent, reset]
  );

  const handleRecentPress = useCallback(
    (value: string) => {
      setCode(value);
      handleSubmit(value);
    },
    [handleSubmit]
  );

  const route = data?.route ?? [];
  const hasResult = route.length > 0;
  const currentStep = route.length;
  const errorMessage = isError ? parseErrorMessage(error) : null;

  return {
    code,
    setCode,
    handleSubmit,
    handleRecentPress,
    recent,
    clearRecent,
    route,
    hasResult,
    currentStep,
    data,
    isPending,
    errorMessage,
  };
};
