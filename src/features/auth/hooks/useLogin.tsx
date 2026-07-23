import { loginPhoneOtpApple, sendPhoneOtp } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@src/store/Auth";
import type { userType } from "@src/constants/types";

const hasReviewSession = (data: unknown): data is userType & { reviewLogin: true } => {
   const response = data as Partial<userType> & { reviewLogin?: boolean };
   return Boolean(response.reviewLogin && response.user && (response.accessToken || response.token));
};

export const useLogin = () => {
   const setAuth = useAuth((state) => state.setAuth);

   return useMutation({
      mutationFn: sendPhoneOtp,
      onSuccess: async (data) => {
         if (!hasReviewSession(data)) return;

         setAuth(data);
      },
   });
};

export const useLoginApple = () => {
   const setAuth = useAuth((state) => state.setAuth);
   
   return useMutation({
      mutationFn: loginPhoneOtpApple,
      onError: async (error) => {
         console.log("error from react query", error);
      },
      onSuccess: async (data) => {
         setAuth(data);
      },
   });
};
