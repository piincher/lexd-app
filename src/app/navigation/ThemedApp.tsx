import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { linking } from "@src/shared/lib/deepLinking";
import { registerSentryNavigationContainer } from "@src/shared/lib/sentry";
import { navigationRef } from "@src/navigations/navigationRef";
import { useAppTheme } from "@src/providers";
import DeepLinkHandler from "@src/app/components/DeepLinkHandler";
import { AppNavigator } from "./AppNavigator";

export const ThemedApp: React.FC = () => {
   const { navigationTheme } = useAppTheme();

   return (
      <NavigationContainer
         ref={navigationRef}
         theme={navigationTheme}
         linking={linking}
         onReady={() => registerSentryNavigationContainer(navigationRef)}
      >
         <DeepLinkHandler />
         <AppNavigator />
      </NavigationContainer>
   );
};
