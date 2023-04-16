import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "@src/screens/OnBoardingScreen/OnBoardingScreen";
import HomeScreen from "@src/screens/Home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  HomeTabParamList,
  RootStackParamList,
  RootStackScreenProps,
} from "@src/navigations/type";
import { MytabBarone } from "@src/navigations/BottomNavigation/MytabBarone";
const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<HomeTabParamList>();
export default function App() {
  const isAuth = false;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth && (
          <Stack.Screen name='Appartment' component={AppartmentBottomTab} />
        )}
        <Stack.Screen name='OnBoarding' component={OnBoarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppartmentBottomTab = ({
  navigation,
  route,
}: RootStackScreenProps<"Appartment">) => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <MytabBarone {...props} />}
      initialRouteName={"Home"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
