import { CheckRoute } from '@src/api/order';
import { getRoutes } from '@src/api/route';
import { ROUTES } from '@src/constants/queryKey';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCheckRoute = () => {
	return useMutation({
		mutationFn: CheckRoute,
	});
};

export const useGetRoutes = () => {
	return useQuery({
		queryKey: [ROUTES],
		queryFn: getRoutes,
	});
};
