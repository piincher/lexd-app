/**
 * ClientNavigator
 * 
 * Navigation stack for Client features.
 * Contains screens for client orders and order tracking.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthenticatedStackParamList } from '@src/navigation/types';

import { ClientOrdersListScreen } from '../orders/screens/ClientOrdersListScreen';
import { ClientOrderDetailScreen } from '../orders/screens/ClientOrderDetailScreen';
import { TrackOrderScreen } from '../orders/screens/TrackOrderScreen';

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
