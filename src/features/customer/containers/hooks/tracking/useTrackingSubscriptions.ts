/**
 * Tracking Subscription Mutations
 */

import { useMutation } from '@tanstack/react-query';
import { customerTrackingService } from '../../services/customerTrackingService';

export const useSubscribeToTrackingUpdates = () => {
  return useMutation({
    mutationFn: async ({
      containerId,
      pushToken,
    }: {
      containerId: string;
      pushToken: string;
    }) => {
      const response = await customerTrackingService.subscribeToTrackingUpdates(
        containerId,
        pushToken
      );
      return response.data;
    },
  });
};

export const useUnsubscribeFromTrackingUpdates = () => {
  return useMutation({
    mutationFn: async ({
      containerId,
      pushToken,
    }: {
      containerId: string;
      pushToken: string;
    }) => {
      const response =
        await customerTrackingService.unsubscribeFromTrackingUpdates(
          containerId,
          pushToken
        );
      return response.data;
    },
  });
};
