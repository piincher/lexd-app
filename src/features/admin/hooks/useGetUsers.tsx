import { fetchAllUsers } from "@src/features/admin/users/api/userApi";
import { useQuery } from "@tanstack/react-query";

const USERSKEY = "users";

export const useGetUsers = () => {
	return useQuery({
		queryKey: [USERSKEY],
		queryFn: async () => {
			const response = await fetchAllUsers();
			return response.data;
		},
	});
};
