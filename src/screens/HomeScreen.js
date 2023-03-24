import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constantStyles from "../constants/styles";

function HomeScreen() {
	const [weight, setWeight] = useState(0);

	const handleOnPress = async () => {
		setWeight(weight + 1);
		var value = JSON.stringify({ weight });
		await AsyncStorage.setItem("bodyScale_logs", value);
	};

	useEffect(async () => {
		try {
			const log = await AsyncStorage.getItem("bodyScale_logs");
			let weight = JSON.parse(log).weight;
			if (weight !== null) {
				setWeight(weight);
			}
		} catch (err) {
			console.log(err.message);
		}
	}, []);

	return (
		<View style={styles}>
			<Text>HomeScreen</Text>
			<TouchableOpacity onPress={handleOnPress}>
				<Text>Click here to Log Count!!!!</Text>
			</TouchableOpacity>
			<Text>{weight}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default HomeScreen;
