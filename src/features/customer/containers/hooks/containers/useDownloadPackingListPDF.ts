/**
 * Hook to download packing list PDF for a container
 * Returns a Blob that can be saved or shared
 */

import { useMutation } from '@tanstack/react-query';
import { customerContainerApi } from '../../api';

export const useDownloadPackingListPDF = () => {
  return useMutation({
    mutationFn: async (containerId: string) => {
      const response = await customerContainerApi.downloadPackingListPDF(containerId);
      return response.data as Blob;
    },
  });
};
