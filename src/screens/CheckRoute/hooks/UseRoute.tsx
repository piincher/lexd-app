import { CheckRoute } from '@src/api/order';
import { useMutation } from '@tanstack/react-query';

export const useCheckRoute = () => {
	return useMutation({
		mutationFn: CheckRoute,
	});
};
