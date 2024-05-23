import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '@src/screens/OnBoardingScreen/OnBoardingScreen';
import HomeScreen from '@src/screens/Home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeTabParamList, RootStackParamList, RootStackScreenProps } from '@src/navigations/type';
import { MytabBarone } from '@src/navigations/BottomNavigation/MytabBarone';
import CheckRoute from '@src/screens/CheckRoute/CheckRoute';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { COLORS } from '@src/constants/Colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();
export default function MainWrapper() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const loadFonts = async () => {
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
			setIsLoading(false);
		};

		loadFonts();

		// initializeApp();
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' color={COLORS.yellow} />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{/* {!isAuth && <Stack.Screen name='Appartment' component={AppartmentBottomTab} />} */}
				<Stack.Screen name='CheckRoute' component={CheckRoute} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const AppartmentBottomTab = ({ navigation, route }: RootStackScreenProps<'Appartment'>) => {
	return (
		<BottomTab.Navigator
			tabBar={(props) => <MytabBarone {...props} />}
			initialRouteName={'Home'}
			screenOptions={{ headerShown: false }}
		>
			<BottomTab.Screen name='Home' component={HomeScreen} />
			<BottomTab.Screen name='Sav' component={HomeScreen} />
			<BottomTab.Screen name='Profile' component={HomeScreen} />
			<BottomTab.Screen name='Reservation' component={HomeScreen} />
			<BottomTab.Screen name='try' component={HomeScreen} />
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

export default App;
