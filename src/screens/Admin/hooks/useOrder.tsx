import { placeOrder, getActiveOrders, updateOrder } from '@src/api/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
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

export const useGetActiveOrders = () => {
	return useQuery({
		queryKey: [ORDER_KEY],
		queryFn: getActiveOrders,
	});
};
export const useUpdateOrder = () => {
	const queryClient = useQueryClient();
	const navigation = useNavigation();
	return useMutation({
		mutationFn: updateOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
			navigation.navigate('HomeMain');
		},
	});
};
