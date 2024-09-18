import { getNotifications, updateNotification } from '@src/api/notification';
import { queryKey } from '@src/constants/queryKey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetNotification = () => {
	return useQuery({
		queryKey: [queryKey.NOTIFICATION],
		queryFn: getNotifications,
	});
};

export const useUpdateNotification = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateNotification,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey.NOTIFICATION] });
		},
	});
};
