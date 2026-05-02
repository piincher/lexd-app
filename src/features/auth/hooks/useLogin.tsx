import { loginPhoneOtpApple, sendPhoneOtp } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@src/store/Auth";
import { useNotificationContext } from "@src/app/providers/NotificationProvider";
import type { userType } from "@src/constants/types";

const hasReviewSession = (data: unknown): data is userType & { reviewLogin: true } => {
   const response = data as Partial<userType> & { reviewLogin?: boolean };
   return Boolean(response.reviewLogin && response.user && (response.accessToken || response.token));
};

const schedulePushRegistration = (
   registerDevice: () => Promise<boolean>,
   isRegistered: boolean,
   source: string
) => {
   if (isRegistered) return;

   setTimeout(() => {
      registerDevice()
         .then((success) => {
            if (success) {
               console.log(`[${source}] Push token registered successfully`);
            } else {
               console.log(`[${source}] Push token registration failed or skipped`);
            }
         })
         .catch((error) => {
            console.log(`[${source}] Push token registration failed`, error);
         });
   }, 500);
};

export const useLogin = () => {
   const setAuth = useAuth((state) => state.setAuth);
   const { registerDevice, isRegistered } = useNotificationContext();

   return useMutation({
      mutationFn: sendPhoneOtp,
      onSuccess: async (data) => {
         if (!hasReviewSession(data)) return;

         setAuth(data);
         console.log("[useLogin] App review login successful, registering push token...");
         schedulePushRegistration(registerDevice, isRegistered, "useLogin");
      },
   });
};

export const useLoginApple = () => {
   const setAuth = useAuth((state) => state.setAuth);
   const { registerDevice, isRegistered } = useNotificationContext();
   
   return useMutation({
      mutationFn: loginPhoneOtpApple,
      onError: async (error) => {
         console.log("error from react query", error);
      },
      onSuccess: async (data) => {
         setAuth(data);
         
         // Register push token after successful login
         console.log('[useLoginApple] Login successful, registering push token...');
         schedulePushRegistration(registerDevice, isRegistered, "useLoginApple");
      },
   });
};
