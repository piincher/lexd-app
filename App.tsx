import 'react-native-gesture-handler';

import { AntDesign, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Sentry from '@sentry/react-native';
import { chatClient } from '@src/config/ChatConfig';
import { ChatProvider } from '@src/context/ChatContext';
import { HomeTabParamList, RootStackParamList } from '@src/navigations/type';
import ActiveOrders from '@src/screens/Admin/screens/ActiveOrder/ActiveOrders';
import AddOrder from '@src/screens/Admin/screens/AddOrder/AddOrder';
import AddUser from '@src/screens/Admin/screens/AddUser/AddUser';
import AdminPastOrders from '@src/screens/Admin/screens/PastOrder/PastOrder';
import SelectUser from '@src/screens/Admin/screens/SelectUser/SelectUser';
import SendSms from '@src/screens/Admin/screens/SendSms/SendSms';
import Login from '@src/screens/Auth/Login/Login';
import Verification from '@src/screens/Auth/Verification/Verification';
import Chat from '@src/screens/Chat/screens/Chat';
import ChatRoom from '@src/screens/Chat/screens/ChatRoom';
import SelectAdminToChatWith from '@src/screens/Chat/screens/SelectAdmin';
import CheckRoute from '@src/screens/CheckRoute/CheckRoute';
import HomeScreen from '@src/screens/Home/HomeScreen';
import OnBoarding from '@src/screens/OnBoardingScreen/OnBoardingScreen';
import OrderDetails from '@src/screens/OrderDetail/OrderDetails';
import AboutUs from '@src/screens/Profile/screens/AboutUs';
import PastOrders from '@src/screens/Profile/screens/PastOrders';
import Profile from '@src/screens/Profile/screens/Profile';
import { initSentry, routingInstrumentation } from '@src/services/sentry';
import { useAppLaunchStore } from '@src/store/AppLaunch';
import { useAuth } from '@src/store/Auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OverlayProvider, Chat as StreamChat, Streami18n } from 'stream-chat-expo';
import { initMixpanel } from '@src/config/Analytic';
import { UpdateProvider } from '@src/context/UpdateProvider';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();

initSentry();
initMixpanel();
function AppWrapper() {
	const [appIsLoaded, setAppIsLoaded] = useState(false);
	const navigation = useRef();
	const appLaunch = useAppLaunchStore((state) => state.isAppLaunchFirst);
	const token = useAuth((state) => state.token);
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
					{appLaunch && <Stack.Screen name='OnBoarding' component={OnBoarding} />}

					{token ? (
						<>
							<Stack.Screen name='HomeTab' component={HomeBottomTab} />
							<Stack.Screen name='CheckRoute' component={CheckRoute} />
							<Stack.Screen name='AddOrder' component={AddOrder} />
							<Stack.Screen name='ActiveOrder' component={ActiveOrders} />
							<Stack.Screen name='OrderDetail' component={OrderDetails} />
							<Stack.Screen name='ChatRoom' component={ChatRoom} />
							<Stack.Screen name='SelectAdminToChatWith' component={SelectAdminToChatWith} />
							<Stack.Screen name='SelectUser' component={SelectUser} />
							<Stack.Screen name='PastOrders' component={PastOrders} />
							<Stack.Screen name='AboutUs' component={AboutUs} />
							<Stack.Screen name='UserAdd' component={AddUser} />
							<Stack.Screen name='AdmninPastOrders' component={AdminPastOrders} />
							<Stack.Screen name='SendSms' component={SendSms} />
						</>
					) : (
						<>
							<Stack.Screen name='Login' component={Login} />
							<Stack.Screen name='Verification' component={Verification} />
						</>
					)}
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
			{/* {/* <BottomTab.Screen name='Sav' component={HomeScreen} /> */}
			<BottomTab.Screen
				name='Chat'
				component={Chat}
				options={{
					tabBarIcon: ({ focused, color, size }) => <Entypo name='chat' focused={focused} color={color} size={size} />,
				}}
			/>
			<BottomTab.Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarIcon: ({ focused, color, size }) => <Entypo name='user' focused={focused} color={color} size={size} />,
				}}
			/>
		</BottomTab.Navigator>
	);
};

const client = new QueryClient();
const streami18n = new Streami18n({
	language: 'fr',
});
const App = () => {
	return (
		// <QueryClientProvider client={client}>
		// 	<ChatProvider>
		// 		<OverlayProvider>
		// 			<>
		// 				<StreamChat client={chatClient} i18nInstance={streami18n}>
		// 					<GestureHandlerRootView style={{ flex: 1 }}>
		// 						<MainWrapper />
		// 					</GestureHandlerRootView>
		// 				</StreamChat>
		// 			</>
		// 		</OverlayProvider>
		// 	</ChatProvider>
		// </QueryClientProvider>
		<QueryClientProvider client={client}>
			<ChatProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<PaperProvider>
						<MainWrapper />
					</PaperProvider>
				</GestureHandlerRootView>
			</ChatProvider>
		</QueryClientProvider>
	);
};

// dont forget to add the in app update provider
const MainWrapper = () => {
	return (
		<OverlayProvider>
			<StreamChat client={chatClient} i18nInstance={streami18n}>
				<>
					<AppWrapper />
				</>
			</StreamChat>
		</OverlayProvider>
	);
};

export default Sentry.wrap(App);
