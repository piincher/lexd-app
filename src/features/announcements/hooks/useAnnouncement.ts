import { addAnnouncement, fetchAnnouncement } from "@src/api/announcement";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ORDER_KEY = "anoncement";

export const useAddAnoncement = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: addAnnouncement,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [ORDER_KEY] });
      },
   });
};

export const useFetchAnnouncement = () => {
   return useMutation({
      mutationFn: fetchAnnouncement,
   });
};
