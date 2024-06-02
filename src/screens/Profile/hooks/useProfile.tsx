import { getCurrentUser } from '@src/api/auth';
import { useQuery } from '@tanstack/react-query';

const USERKEY = 'CURRENT_USER';
export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [USERKEY],
		queryFn: getCurrentUser,
	});
};
