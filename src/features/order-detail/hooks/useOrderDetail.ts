import { getOrderDetails } from '@src/api/order';
import { ORDERKEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderDetails = (id: string) => {
	return useQuery({
		queryKey: [ORDERKEY, id],
		queryFn: () => getOrderDetails(id),
		enabled: !!id,
	});
};
