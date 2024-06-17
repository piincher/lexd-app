import { fetchSmsBalance, getActiveOrders } from '@src/api/order';
import { LIMIT } from '@src/constants/Dimensions';
import { SMSKEY } from '@src/constants/queryKey';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const ORDERKEY = 'order';
export const useGetActiveOrder = (Status: string) => {
	return useInfiniteQuery({
		queryKey: [Status, ORDERKEY],
		queryFn: ({ pageParam = 1 }) => getActiveOrders(pageParam, Status),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
			return nextPage;
		},
		initialPageParam: 1,
	});
};
export const useViewSmsBalance = () => {
	return useQuery({
		queryKey: [SMSKEY],
		queryFn: fetchSmsBalance,
	});
};
