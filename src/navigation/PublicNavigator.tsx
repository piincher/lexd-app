/**
 * PublicNavigator
 * 
 * Navigation stack for PUBLIC (non-authenticated) users.
 * Contains all screens that don't require login.
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import { PublicStackParamList } from './types';

// Public Screens
import { PublicHomeScreen } from '@src/features/public/screens/PublicHomeScreen';
import { PublicTrackingResultScreen } from '@src/features/public/screens/PublicTrackingResultScreen';

// Auth Screens (accessible from public flow)
import { LoginScreen } from '@src/features/auth';
import { VerificationScreen } from '@src/features/auth';

// Info Screens (public)
import { AboutUsScreen } from '@src/features/profile';
import { FAQScreen } from '@src/features/home';

// Placeholder screens that will be implemented
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<PublicStackParamList>();

// Placeholder Contact Screen
const ContactUsScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Contact Us Screen</Text>
    <Text style={styles.subtitle}>Phone, Email, WhatsApp contact info</Text>
  </View>
);

// Placeholder Shipping Info Screen
const ShippingInfoScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Shipping Info Screen</Text>
    <Text style={styles.subtitle}>Detailed shipping method information</Text>
  </View>
);

// Placeholder Services Screen
const ServicesScreen: React.FC = () => (
  <View style={styles.placeholder}>
    <Text>Services Screen</Text>
    <Text style={styles.subtitle}>List of all services offered</Text>
  </View>
);

export const PublicNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="PublicHome"
    >
      {/* Main Public Screens */}
      <Stack.Screen 
        name="PublicHome" 
        component={PublicHomeScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="PublicTracking" 
        component={PublicHomeScreen} // Uses same screen with tracking modal
      />
      <Stack.Screen 
        name="PublicTrackingResult" 
        component={PublicTrackingResultScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />

      {/* Information Screens */}
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="ShippingInfo" component={ShippingInfoScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />

      {/* Auth Entry Points */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="Verification" 
        component={VerificationScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default PublicNavigator;
