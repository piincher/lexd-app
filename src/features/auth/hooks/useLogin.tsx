import { loginPhoneOtpApple, sendPhoneOtp } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@src/store/Auth";
import { useNotificationContext } from "@src/app/providers/NotificationProvider";

export const useLogin = () => {
   return useMutation({
      mutationFn: sendPhoneOtp,
      onSuccess: async (data) => {},
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
         if (!isRegistered) {
            setTimeout(() => {
               registerDevice().then((success) => {
                  if (success) {
                     console.log('[useLoginApple] Push token registered successfully');
                  } else {
                     console.log('[useLoginApple] Push token registration failed or skipped');
                  }
               });
            }, 500);
         }
      },
   });
};
