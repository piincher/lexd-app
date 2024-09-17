import { getNotifications } from '@src/api/notification';
import { queryKey } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetNotification = () => {
	return useQuery({
		queryKey: [queryKey.NOTIFICATION],
		queryFn: getNotifications,
	});
};
