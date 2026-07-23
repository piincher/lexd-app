import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import * as Sentry from "@sentry/react-native";
import React from "react";
import { initSentry } from "@src/services/sentry";
import { OfflineProvider } from "@src/app/providers/OfflineProvider";
import { getQueryClient } from "@src/shared/lib/queryClient";
import { ThemeProvider, useAppTheme } from "@src/providers";
import { SessionGuard } from "@src/app/providers/SessionGuard";
import { ScrollDirectionProvider } from "@src/providers/ScrollDirectionProvider";
import { AppShell } from "@src/app/navigation/AppShell";
import { useAppBootstrap } from "@src/app/bootstrap/useAppBootstrap";
import { useProactiveRefresh } from "@src/features/auth/hooks/useProactiveRefresh";
import { useAuth } from "@src/store/Auth";
import { runSecurityChecks } from "@src/shared/utils/securityCheck";

const queryClient = getQueryClient();

initSentry();

const AppContent: React.FC<{ isAuthenticated: boolean; onLayout: () => void }> = ({
   isAuthenticated,
   onLayout,
}) => {
   const { paperTheme } = useAppTheme();

   return (
      <ScrollDirectionProvider>
         <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
            <PaperProvider theme={paperTheme}>
               {/* Side-effect-only — subscribes to session-expired events and runs
                   the logout flow. Mounted inside PaperProvider so native Alert works. */}
               <SessionGuard />
               <AppShell />
            </PaperProvider>
         </GestureHandlerRootView>
      </ScrollDirectionProvider>
   );
};

const App = () => {
   const [stableQueryClient] = React.useState(() => queryClient);
   const { appIsLoaded, onLayout } = useAppBootstrap();
   const authToken = useAuth((state) => state.token);
   const isAuthenticated = Boolean(authToken?.trim());

   useProactiveRefresh();

   React.useEffect(() => {
      runSecurityChecks();
   }, []);

   if (!appIsLoaded) {
      return null;
   }

   return (
      <OfflineProvider queryClient={stableQueryClient}>
         <ThemeProvider>
            <AppContent isAuthenticated={isAuthenticated} onLayout={onLayout} />
         </ThemeProvider>
      </OfflineProvider>
   );
};

export default Sentry.wrap(App);
