import { getUser } from "@src/api/auth";
import { queryKey } from "@src/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: [queryKey.USER_KEY, userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
