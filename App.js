import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ChartScreen from "./src/screens/ChartScreen";
import { AntDesign } from "@expo/vector-icons";
import useLoadUserData from "./src/hooks/useLoadUserData";

const Tab = createBottomTabNavigator();

export default function App() {
	const { user, setUser, weight, setWeight, date, setDate } = useLoadUserData();
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					options={{
						tabBarLabel: "Home",
						tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
					}}
				>
					{(props) => <HomeScreen {...props} userData={{ user, setUser, weight, setWeight, date, setDate }} />}
				</Tab.Screen>
				<Tab.Screen
					name="Charts"
					options={{
						tabBarLabel: "Charts",
						tabBarIcon: () => <AntDesign name="areachart" size={24} color="black" />,
					}}
				>
					{(props) => <ChartScreen {...props} userData={user} />}
				</Tab.Screen>
				<Tab.Screen
					name="History"
					component={HistoryScreen}
					options={{
						tabBarLabel: "History",
						tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" />,
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarLabel: "Settings",
						tabBarIcon: () => <AntDesign name="setting" size={24} color="black" />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
