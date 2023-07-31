import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import ChartScreen from "./src/screens/ChartScreen";
import { AntDesign } from "@expo/vector-icons";
import useLoadUserData from "./src/hooks/useLoadUserData";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
const Tab = createBottomTabNavigator();

// Keep the splash screen visible while fetching resources from AsyncStorage
SplashScreen.preventAutoHideAsync();

export default function App() {
	const { user, setUser, weight, setWeight, date, setDate, week, setWeek, appIsReady } = useLoadUserData();

	useEffect(() => {
		const checkDataLoaded = () => {
			if (appIsReady) {
				setTimeout(async () => {
					await SplashScreen.hideAsync();
				}, 500);
			}
		};

		checkDataLoaded();
	}, [appIsReady]);

	const loadOptions = ({ tabBarLabel, iconName }) => {
		return {
			tabBarLabel,
			headerShown: false,
			tabBarActiveTintColor: "black",
			tabBarInactiveTintColor: "lightgrey",
			tabBarIcon: ({ focused }) => <AntDesign name={iconName} size={21} color={focused ? "black" : "silver"} />,
		};
	};
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{ tabBarShowLabel: true }}>
				<Tab.Screen name="Home" options={loadOptions({ tabBarLabel: "Home", iconName: "home" })}>
					{(props) => <HomeScreen {...props} userData={{ user, setUser, weight, setWeight, date, setDate, week, setWeek }} />}
				</Tab.Screen>
				<Tab.Screen name="Charts" options={loadOptions({ tabBarLabel: "Charts", iconName: "areachart" })}>
					{(props) => <ChartScreen {...props} userData={user} />}
				</Tab.Screen>
				<Tab.Screen name="History" options={loadOptions({ tabBarLabel: "History", iconName: "calendar" })}>
					{(props) => <HistoryScreen {...props} userData={user} />}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
