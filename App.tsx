import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MytabBarone } from '@src/navigations/BottomNavigation/MytabBarone';
import { HomeTabParamList, RootStackParamList, RootStackScreenProps } from '@src/navigations/type';
import CheckRoute from '@src/screens/CheckRoute/CheckRoute';
import HomeScreen from '@src/screens/Home/HomeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AddOrder from '@src/screens/Admin/screens/AddOrder/AddOrder';
import ActiveOrders from '@src/screens/Admin/screens/ActiveOrder/ActiveOrders';
import * as Sentry from '@sentry/react-native';
import { initSentry, routingInstrumentation } from '@src/services/sentry';
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

initSentry();
function MainWrapper() {
	const [appIsLoaded, setAppIsLoaded] = useState(false);
	const navigation = useRef();
	useEffect(() => {
		const prepare = async () => {
			try {
				await Font.loadAsync({
					black: require('./assets/fonts//Roboto-Black.ttf'),
					blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
					bold: require('./assets/fonts/Roboto-Bold.ttf'),
					boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
					italic: require('./assets/fonts/Roboto-Italic.ttf'),
					light: require('./assets/fonts/Roboto-Light.ttf'),
					lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
					medium: require('./assets/fonts/Roboto-Medium.ttf'),
					mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
					regular: require('./assets/fonts/Roboto-Regular.ttf'),
					thin: require('./assets/fonts/Roboto-Thin.ttf'),
					thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
				});
			} catch (error) {
				console.log('error loading fonts', error);
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

	const isAdmin = true;

	return (
		<SafeAreaProvider onLayout={onLayout}>
			<NavigationContainer
				onReady={() => {
					routingInstrumentation.registerNavigationContainer(navigation);
				}}
				ref={navigation}
			>
				<StatusBar style='auto' />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* {!isAuth && <Stack.Screen name='Appartment' component={HomeBottomTab} />} */}
					{isAdmin && <Stack.Screen name='HomeTab' component={HomeBottomTab} />}
					<Stack.Screen name='CheckRoute' component={CheckRoute} />
					<Stack.Screen name='AddOrder' component={AddOrder} />
					<Stack.Screen name='ActiveOrder' component={ActiveOrders} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

const HomeBottomTab = () => {
	return (
		<BottomTab.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
			<BottomTab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<AntDesign name='home' focused={focused} color={color} size={size} />
					),
				}}
			/>
			{/* <BottomTab.Screen name='Sav' component={HomeScreen} />
			<BottomTab.Screen name='Profile' component={HomeScreen} />
			<BottomTab.Screen name='Reservation' component={HomeScreen} />
			<BottomTab.Screen name='try' component={HomeScreen} /> */}
		</BottomTab.Navigator>
	);
};

const client = new QueryClient();
const App = () => {
	return (
		<QueryClientProvider client={client}>
			<MainWrapper />
		</QueryClientProvider>
	);
};

export default Sentry.wrap(App);
