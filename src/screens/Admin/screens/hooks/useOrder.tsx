import { placeOrder } from '@src/api/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
// export const useUpdateProduct = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: updateProduct,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
// 		},
// 	});
// };
