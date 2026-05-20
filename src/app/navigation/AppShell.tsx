import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers";
import { StatusBar as ThemeStatusBar } from "@src/components/StatusBar";
import { AppAnnouncementHost } from "@src/features/announcements";
import { UpdateProvider, useUpdate } from "@src/app/providers/UpdateProvider";
import { ForceUpdateScreen } from "@src/features/update";
import { addVersionUpgradeListener } from "@src/shared/lib/versionEvents";
import { ThemedApp } from "./ThemedApp";

const AppShellInner: React.FC = () => {
   const { isDark } = useAppTheme();
   const { forceUpdate, forceUpdateData, setForceUpdateFromApi, setForceUpdateData } = useUpdate();

   useEffect(() => {
      const sub = addVersionUpgradeListener((data) => {
         setForceUpdateFromApi(true);
         setForceUpdateData({
            message: `Your app version (${data.currentVersion}) is no longer supported. Please upgrade to version ${data.requiredVersion} or later to continue.`,
            storeUrl: data.storeUrl || '',
         });
      });
      return () => sub.remove();
   }, [setForceUpdateFromApi, setForceUpdateData]);

   if (forceUpdate && forceUpdateData) {
      return (
         <>
            <ThemeStatusBar style={isDark ? "light" : "dark"} />
            <ForceUpdateScreen
               message={forceUpdateData.message}
               storeUrl={forceUpdateData.storeUrl}
            />
         </>
      );
   }

   return (
      <>
         <ThemeStatusBar style={isDark ? "light" : "dark"} />
         <AppAnnouncementHost />
         <ThemedApp />
      </>
   );
};

export const AppShell: React.FC = () => {
   return (
      <SafeAreaProvider>
         <UpdateProvider>
            <AppShellInner />
         </UpdateProvider>
      </SafeAreaProvider>
   );
};
