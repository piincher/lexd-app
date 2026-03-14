import { getRoutes } from '@src/api/route';
import { getSeaRoutes } from '@src/api/seaRoutes';
import { ROUTES } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetRoutes = () => {
	return useQuery({
		queryKey: [ROUTES],
		queryFn: getRoutes,
	});
};

export const useGetSeaRoutes = () => {
	return useQuery({
		queryKey: [ROUTES],
		queryFn: getSeaRoutes,
	});
};
