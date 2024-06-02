import { fetchAllUsers } from '@src/api/auth';
import { useQuery } from '@tanstack/react-query';

const USER_KEY = 'user';
export const useGetUsers = () => {
	return useQuery({
		queryKey: [USER_KEY],
		queryFn: fetchAllUsers,
	});
};
