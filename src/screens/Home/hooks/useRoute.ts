import { getRoutes } from '@src/api/route';
import { ROUTES, SMSKEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetRoutes = () => {
	return useQuery({
		queryKey: [ROUTES],
		queryFn: getRoutes,
	});
};
