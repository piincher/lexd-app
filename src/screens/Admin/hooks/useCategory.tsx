import { getCategories } from '@src/api/category';
import { queryKey } from '@src/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
	return useQuery({
		queryKey: [queryKey.CATEGORY_KEY],
		queryFn: getCategories,
	});
};
