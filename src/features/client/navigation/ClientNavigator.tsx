/**
 * ClientNavigator
 * 
 * Navigation stack for Client features.
 * Contains screens for client orders and order tracking.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthenticatedStackParamList } from '@src/navigation/types';

// Import screens (placeholders - actual screens will be created in Phase 4)
// import { ClientOrdersListScreen } from '../screens/ClientOrdersListScreen';
// import { ClientOrderDetailScreen } from '../screens/ClientOrderDetailScreen';
// import { TrackOrderScreen } from '../screens/TrackOrderScreen';

// Placeholder components until actual screens are created
const ClientOrdersListScreen: React.FC = () => null;
const ClientOrderDetailScreen: React.FC = () => null;
const TrackOrderScreen: React.FC = () => null;

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

/**
 * Client Stack Navigator
 * Contains all client order-related screens
 */
export const ClientNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ClientOrdersList"
    >
      <Stack.Screen
        name="ClientOrdersList"
        component={ClientOrdersListScreen}
      />
      <Stack.Screen
        name="ClientOrderDetail"
        component={ClientOrderDetailScreen}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrderScreen}
      />
    </Stack.Navigator>
  );
};

export default ClientNavigator;
