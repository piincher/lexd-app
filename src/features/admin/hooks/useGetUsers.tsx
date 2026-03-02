import { fetchAllUsers } from "@src/api/auth";
import { useQuery } from "@tanstack/react-query";

const USERSKEY = "users";

export const useGetUsers = () => {
	return useQuery({
		queryKey: [USERSKEY],
		queryFn: fetchAllUsers,
	});
};
