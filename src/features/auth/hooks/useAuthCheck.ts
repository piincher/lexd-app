import { useAuth } from "@src/store/Auth";

interface UseAuthCheckReturn {
   isAuthenticated: boolean;
   token: string | null;
   isLoading: boolean;
}

export const useAuthCheck = (): UseAuthCheckReturn => {
   const token = useAuth((state) => state.token);

   return {
      isAuthenticated: !!token && token.length > 0,
      token: token || null,
      isLoading: false,
   };
};
