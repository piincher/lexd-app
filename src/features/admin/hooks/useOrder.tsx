import { getActiveOrders } from "@src/api/order";
import { useQuery } from "@tanstack/react-query";

const ORDERKEY = "adminOrders";

export const useGetOrders = () => {
	return useQuery({
		queryKey: [ORDERKEY],
		queryFn: () => getActiveOrders(1, 'active', 'air'),
	});
};
