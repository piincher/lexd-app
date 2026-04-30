import { deleteOrder } from "@src/api/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@src/constants/queryKey";

export const useDeleteOrder = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: deleteOrder,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [queryKey.ORDERKEY] });
      },
   });
};
