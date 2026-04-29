import { useMutation } from '@tanstack/react-query';
import { checkRoute, CheckRouteRequest, CheckRouteResponse } from '../api';

export const useCheckRoute = () => {
  return useMutation<CheckRouteResponse, Error, CheckRouteRequest>({
    mutationFn: checkRoute,
  });
};
