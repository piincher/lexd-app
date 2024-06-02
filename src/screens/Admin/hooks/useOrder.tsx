import { placeOrder, getActiveOrders, updateOrder, getActiveOrdersAdmin } from '@src/api/order';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { LIMIT } from '@src/constants/Dimensions';
const ORDER_KEY = 'order';
export const usePlaceOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: placeOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
		},
	});
};

export const useGetActiveOrdersAdmin = () => {
	return useInfiniteQuery({
		queryKey: [ORDER_KEY],
		queryFn: ({ pageParam = 1 }) => getActiveOrdersAdmin(pageParam),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
			return nextPage;
		},
		initialPageParam: 1,
	});
};
export const useUpdateOrder = () => {
	const queryClient = useQueryClient();
	const navigation = useNavigation();
	return useMutation({
		mutationFn: updateOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
		},
	});
};
