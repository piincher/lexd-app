import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * INTEGRATION_EXAMPLE.tsx
 * 
 * This file shows how to integrate the notification feature into your app.
 * Copy and adapt the code as needed for your specific screens.
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import notification components
import { 
  NotificationBell, 
  NotificationDropdown,
  NotificationProvider,
} from './index';

import type { RootStackParamList } from '@src/navigations/type';
import type { InAppNotification } from './types';

// ============================================
// 1. WRAP YOUR APP WITH NotificationProvider
// ============================================

// In your App.tsx or main entry point:
/*
import { NotificationProvider } from '@src/features/notifications';

export default function App() {
  return (
    <NotificationProvider>
      <YourAppNavigator />
    </NotificationProvider>
  );
}
*/

// ============================================
// 2. ADD NotificationBell TO HEADER
// ============================================

// Option A: Using React Native Paper Appbar
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HeaderWithNotifications: React.FC = () => {
  const navigation = useNavigation<NavigationProp>;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleNotificationPress = (notification: InAppNotification) => {
    // Handle navigation based on notification type
    setDropdownVisible(false);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="ChinaLink Express" />
        <Appbar.Action 
          icon="bell" 
          onPress={() => setDropdownVisible(true)}
        />
      </Appbar.Header>

      {/* Dropdown */}
      <NotificationDropdown
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        onSeeAll={() => {
          setDropdownVisible(false);
          navigation.navigate('Notifications');
        }}
        onNotificationPress={handleNotificationPress}
      />
    </>
  );
};

// Option B: Custom Header with NotificationBell
export const CustomHeaderWithBell: React.FC<{ title: string }> = ({ title }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<NavigationProp>();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <View style={styles.customHeader}>
        <View style={styles.headerContent}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={title} />
          <NotificationBell 
            onPress={() => setDropdownVisible(true)}
          />
        </View>
      </View>

      <NotificationDropdown
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        onSeeAll={() => {
          setDropdownVisible(false);
          navigation.navigate('Notifications');
        }}
        onNotificationPress={(notification) => {
          setDropdownVisible(false);
          // Navigate based on type
          if (notification.data?.orderId) {
            navigation.navigate('OrderDetail', { id: notification.data.orderId });
          }
        }}
      />
    </>
  );
};

// ============================================
// 3. ADD NotificationsScreen TO NAVIGATOR
// ============================================

// In your navigator file:
/*
import { NotificationsScreen, NotificationDetailScreen } from '@src/features/notifications';

<Stack.Screen 
  name="Notifications" 
  component={NotificationsScreen}
  options={{ title: 'Notifications' }}
/>
<Stack.Screen 
  name="NotificationDetail" 
  component={NotificationDetailScreen}
  options={{ title: 'Détail' }}
/>
*/

// ============================================
// 4. USE IN SPECIFIC SCREENS
// ============================================

// Example: HomeScreen with NotificationBell in header
export const HomeScreenHeaderExample: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  // Add this to your screen options or render in your custom header
  return (
    <NotificationBell 
      onPress={() => navigation.navigate('Notifications')}
    />
  );
};

// Example: CustomerDashboard with NotificationBell
export const CustomerDashboardHeaderExample: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <NotificationBell 
        onPress={() => setDropdownVisible(true)}
      />
      
      <NotificationDropdown
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        onSeeAll={() => {
          setDropdownVisible(false);
          navigation.navigate('Notifications');
        }}
        onNotificationPress={(notification) => {
          setDropdownVisible(false);
          // Handle navigation
        }}
      />
    </>
  );
};

// ============================================
// 5. SHOW TOAST NOTIFICATION PROGRAMMATICALLY
// ============================================

/*
import { useShowNotification } from '@src/features/notifications';

const MyComponent = () => {
  const showNotification = useShowNotification();

  const handleSomething = () => {
    showNotification({
      _id: 'temp-id',
      notificationId: 'temp-notif',
      type: 'ORDER_UPDATE',
      category: 'SUCCESS',
      title: 'Commande confirmée',
      message: 'Votre commande #12345 a été confirmée',
      priority: 'NORMAL',
      isRead: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
      data: {
        orderId: '12345',
      },
    });
  };

  return (...);
};
*/

const createStyles = (colors: any) => StyleSheet.create({
  customHeader: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
  },
});

export default INTEGRATION_EXAMPLE;
