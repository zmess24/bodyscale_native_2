import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constantStyles from "../constants/styles";

function HomeScreen() {
	const [weight, setWeight] = useState(0);

	const handleOnPress = async () => {
		try {
			let entry = weight + 1;
			setWeight(entry);
			let value = JSON.stringify({ weight: entry });
			await AsyncStorage.setItem("bodyScale_logs", value);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const log = await AsyncStorage.getItem("bodyScale_logs");
				let weight = JSON.parse(log).weight;
				if (weight !== null) {
					setWeight(weight);
				}
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();
	}, []);

	return (
		<View style={styles}>
			<Text>HomeScreen</Text>
			<TouchableOpacity onPress={handleOnPress}>
				<Text>Click here to Log Count!!!!</Text>
			</TouchableOpacity>
			<Text>{weight} lbs</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default HomeScreen;
