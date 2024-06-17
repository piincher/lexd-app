import { register } from '@src/api/auth';
import { USER_KEY } from '@src/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: register,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [USER_KEY] });
		},
	});
};
