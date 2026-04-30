import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OfflineProvider } from '@src/shared/providers';
import { getQueryClient } from '@src/shared/lib/queryClient';
import { ThemeProvider } from '@src/providers';
import { NotificationProvider } from '@src/app/providers';
import { ScrollDirectionProvider } from '@src/providers/ScrollDirectionProvider';
import { AppShell } from '@src/app/navigation';
import { useAppBootstrap } from '@src/app/bootstrap/useAppBootstrap';

const queryClient = getQueryClient();

const App = () => {
  const [stableQueryClient] = React.useState(() => queryClient);
  const { appIsLoaded } = useAppBootstrap();

  if (!appIsLoaded) {
    return null;
  }

  return (
    <OfflineProvider queryClient={stableQueryClient}>
      <ThemeProvider>
        <NotificationProvider autoRequestPermission={true}>
          <ScrollDirectionProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <AppShell />
            </GestureHandlerRootView>
          </ScrollDirectionProvider>
        </NotificationProvider>
      </ThemeProvider>
    </OfflineProvider>
  );
};

export default Sentry.wrap(App);
