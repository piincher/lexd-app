import { getSeaRoutes } from '@src/api/seaRoutes';
import { ROUTES, SMSKEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetSeaRoutes = () => {
	return useQuery({
		queryKey: [ROUTES],
		queryFn: getSeaRoutes,
	});
};
