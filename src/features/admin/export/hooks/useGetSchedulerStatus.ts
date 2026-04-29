import { useQuery } from "@tanstack/react-query";
import { exportKeys } from "./exportQueryKeys";
import * as exportApi from "../api/exportApi";

export const useGetSchedulerStatus = () => {
  return useQuery({
    queryKey: exportKeys.scheduler(),
    queryFn: () => exportApi.getSchedulerStatus(),
  });
};
