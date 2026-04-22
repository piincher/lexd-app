import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  consigneeApi,
  Consignee,
  CreateConsigneeInput,
  GetConsigneesParams,
  UpdateConsigneeInput,
} from "../api";

const CONSIGNEE_KEY = "consignee";

export const useGetConsignees = (params?: GetConsigneesParams) => {
   return useQuery<Consignee[], Error>({
      queryKey: [CONSIGNEE_KEY, params],
      queryFn: () => consigneeApi.getAll(params).then(res => {
         // Handle both array response and paginated object response
         const responseData = res.data.data;
         if (Array.isArray(responseData)) {
            return responseData;
         }
         // If it's a paginated response with consignees property
         return responseData?.consignees || [];
      }),
   });
};

export const useGetConsigneeById = (id: string) => {
   return useQuery<Consignee, Error>({
      queryKey: [CONSIGNEE_KEY, id],
      queryFn: () => consigneeApi.getById(id).then(res => res.data.data.consignee),
      enabled: !!id,
   });
};

export const useCreateConsignee = () => {
   const queryClient = useQueryClient();

   return useMutation<Consignee, Error, CreateConsigneeInput>({
      mutationFn: (data) => consigneeApi.create(data).then(res => res.data.data.consignee),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY] });
      },
   });
};

export const useUpdateConsignee = () => {
   const queryClient = useQueryClient();

   return useMutation<Consignee, Error, { id: string; data: UpdateConsigneeInput }>({
      mutationFn: ({ id, data }) => consigneeApi.update(id, data).then(res => res.data.data.consignee),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY] });
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY, data._id] });
      },
   });
};

export const useDeleteConsignee = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, string>({
      mutationFn: (id) => consigneeApi.delete(id).then(res => res.data.data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY] });
      },
   });
};

export const useToggleConsigneeStatus = () => {
   const queryClient = useQueryClient();

   return useMutation<Consignee, Error, { id: string; isActive: boolean }>({
      mutationFn: ({ id, isActive }) => consigneeApi.toggleStatus(id, isActive).then(res => res.data.data.consignee),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY] });
         queryClient.invalidateQueries({ queryKey: [CONSIGNEE_KEY, data._id] });
      },
   });
};
