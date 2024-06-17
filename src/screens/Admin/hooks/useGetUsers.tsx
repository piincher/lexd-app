import { fetchAllUsers } from '@src/api/auth';
import { USER_KEY } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
	return useQuery({
		queryKey: [USER_KEY],
		queryFn: fetchAllUsers,
	});
};
