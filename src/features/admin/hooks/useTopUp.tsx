import { topUpHistory } from "@src/api/topUp";
import { useQuery } from "@tanstack/react-query";

const TOPUPKEY = "topup";

export const useTopUpHistory = () => {
	return useQuery({
		queryKey: [TOPUPKEY],
		queryFn: topUpHistory,
	});
};
