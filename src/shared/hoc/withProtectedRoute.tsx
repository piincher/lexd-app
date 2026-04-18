import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { useAuthCheck } from "@src/shared/hooks/useAuthCheck";
import { AuthRequiredScreen } from "@src/shared/components/AuthRequiredScreen";

export const withProtectedRoute = <P extends object>(
   Component: React.ComponentType<P>
): React.FC<P> => {
   return (props: P) => {
      const { isAuthenticated } = useAuthCheck();
      const navigation = useNavigation();

      const handleLogin = useCallback(() => {
         navigation.navigate("Login" as never);
      }, [navigation]);

      if (!isAuthenticated) {
         return <AuthRequiredScreen onLoginPress={handleLogin} />;
      }

      return <Component {...props} />;
   };
};

export default withProtectedRoute;
