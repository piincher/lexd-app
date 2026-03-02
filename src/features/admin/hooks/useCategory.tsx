import { getCategories } from "@src/api/category";
import { useQuery } from "@tanstack/react-query";

const CATEGORYKEY = "category";

export const useGetCategory = () => {
	return useQuery({
		queryKey: [CATEGORYKEY],
		queryFn: getCategories,
	});
};
