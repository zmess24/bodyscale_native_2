import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ChartScreen from "./src/screens/ChartScreen";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						tabBarLabel: "Home",
						tabBarIcon: () => (
							<AntDesign name="home" size={24} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Charts"
					component={ChartScreen}
					options={{
						tabBarLabel: "Charts",
						tabBarIcon: () => (
							<AntDesign
								name="areachart"
								size={24}
								color="black"
							/>
						),
					}}
				/>
				<Tab.Screen
					name="History"
					component={HistoryScreen}
					options={{
						tabBarLabel: "History",
						tabBarIcon: () => (
							<AntDesign
								name="calendar"
								size={24}
								color="black"
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Settings"
					component={SettingsScreen}
					options={{
						tabBarLabel: "Settings",
						tabBarIcon: () => (
							<AntDesign name="setting" size={24} color="black" />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
