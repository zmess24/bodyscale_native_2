import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
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

	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{ tabBarShowLabel: true }}>
				<Tab.Screen
					name="Home"
					options={{
						headerShown: false,
						tabBarActiveTintColor: "black",
						tabBarInactiveTintColor: "lightgrey",
						tabBarLabel: "Home",
						tabBarIcon: ({ focused }) => <AntDesign name="home" size={21} color={focused ? "black" : "silver"} />,
					}}
				>
					{(props) => <HomeScreen {...props} userData={{ user, setUser, weight, setWeight, date, setDate, week, setWeek }} />}
				</Tab.Screen>
				<Tab.Screen
					name="Charts"
					options={{
						tabBarLabel: "Charts",
						tabBarIcon: ({ focused }) => <AntDesign name="areachart" size={21} color={focused ? "black" : "silver"} />,
					}}
				>
					{(props) => <ChartScreen {...props} userData={user} />}
				</Tab.Screen>
				<Tab.Screen
					name="History"
					options={{
						tabBarLabel: "History",
						headerShown: false,
						tabBarActiveTintColor: "black",
						tabBarInactiveTintColor: "lightgrey",
						tabBarIcon: ({ focused }) => <AntDesign name="calendar" size={21} color={focused ? "black" : "silver"} />,
					}}
				>
					{(props) => <HistoryScreen {...props} userData={user} />}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
