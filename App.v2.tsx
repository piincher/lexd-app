/**
 * App.tsx - V2 Architecture
 * 
 * Updated root component with clean separation of public/authenticated flows.
 * 
 * Architecture:
 * - RootNavigator: Decides between Public and Authenticated flows
 * - PublicNavigator: Screens accessible without login
 * - AuthenticatedNavigator: Screens requiring authentication
 */

import "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat-expo";

import { RootNavigator } from "@src/navigation";
import { chatClient } from "@src/config/ChatConfig";
import { initMixpanel } from "@src/config/Analytic";
import { initSentry } from "@src/services/sentry";
import { ChatProvider } from "@src/context/ChatContext";
import { UpdateProvider } from "@src/context/UpdateProvider";
import { NotificationProvider } from "@src/app/providers";

// Register translations
registerTranslation("en", enGB);
registerTranslation("fr", {
  ...enGB,
  save: 'Enregistrer',
  selectSingle: 'Sélectionner une date',
  selectMultiple: 'Sélectionner des dates',
  selectRange: 'Sélectionner une période',
  notAccordingToDateFormat: (inputFormat: string) =>
    `Le format de date doit être ${inputFormat}`,
  mustBeHigherThan: (date: string) => `Doit être après ${date}`,
  mustBeLowerThan: (date: string) => `Doit être avant ${date}`,
  mustBeBetween: (startDate: string, endDate: string) =>
    `Doit être entre ${startDate} et ${endDate}`,
  dateIsDisabled: 'Date non disponible',
  previous: 'Précédent',
  next: 'Suivant',
  typeInDate: 'Entrer une date',
  pickDateFromCalendar: 'Choisir dans le calendrier',
  close: 'Fermer',
  hour: 'Heure',
  minute: 'Minute',
});

// Initialize services
initSentry();
initMixpanel();

// Prevent auto hide splash screen
SplashScreen.preventAutoHideAsync();

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * App Content Component
 * Handles font loading and splash screen
 */
const AppContent: React.FC = () => {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          black: require("./assets/fonts/Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });

        // Warm up browser (for OAuth)
        await WebBrowser.warmUpAsync();
      } catch (error) {
        console.warn("Error loading app resources:", error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayout}>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

/**
 * Main App Component
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ChatProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
              <UpdateProvider>
                <StreamChat client={chatClient}>
                  <AppContent />
                </StreamChat>
              </UpdateProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </ChatProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
