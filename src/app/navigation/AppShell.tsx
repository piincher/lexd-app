import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppTheme } from "@src/providers";
import { StatusBar as ThemeStatusBar } from "@src/components/StatusBar";
import { AppAnnouncementHost } from "@src/features/announcements";
import { UpdateProvider } from "@src/context/UpdateProvider";
import { ThemedApp } from "./ThemedApp";

export const AppShell: React.FC = () => {
   const { isDark } = useAppTheme();

   return (
      <SafeAreaProvider>
         <ThemeStatusBar style={isDark ? "light" : "dark"} />
         <AppAnnouncementHost />
         <UpdateProvider>
            <ThemedApp />
         </UpdateProvider>
      </SafeAreaProvider>
   );
};
