import {
	deleteImage,
	editOrder,
	getActiveOrdersAdmin,
	getOrderBasedOnDate,
	placeOrder,
	sendNotificationSms,
	updateOrder,
	updateOrderToDelivered,
} from '@src/api/order';
import { LIMIT } from '@src/constants/Dimensions';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { queryKey, SMSKEY } from '@src/constants/queryKey';
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

export const useEditOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: editOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
		},
	});
};

export const useGetActiveOrdersAdmin = (Status: string, departureDate: Date) => {
	return useInfiniteQuery({
		queryKey: [ORDER_KEY],
		queryFn: ({ pageParam = 1 }) => getActiveOrdersAdmin(pageParam, Status, departureDate),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
			return nextPage;
		},
		initialPageParam: 1,
	});
};

export const useDeleteImage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteImage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
		},
	});
};
export const useUpdateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
			// queryClient.invalidateQueries({ queryKey: [SMSKEY] });
		},
	});
};

export const useUpdateStatusDelivery = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateOrderToDelivered,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
		},
	});
};

export const useSendNotificationSms = () => {
	const queryClient = useQueryClient();

	const navigation = useNavigation();
	return useMutation({
		mutationFn: sendNotificationSms,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [SMSKEY] });
			navigation.navigate('HomeTab', { screen: 'Home' });
		},
	});
};

export const useGetOrderBaseonDate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: getOrderBasedOnDate,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
			// queryClient.invalidateQueries({ queryKey: [SMSKEY] });
		},
	});
};
