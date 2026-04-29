import { getOrderDetails } from '@src/features/orders/api';
import { ORDERKEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderDetails = (id: string) => {
	return useQuery({
		queryKey: [ORDERKEY, id],
		queryFn: () => getOrderDetails(id),
	});
};
