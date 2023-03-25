import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { User, Entry } from "../classes";
import constantStyles from "../constants/styles";

function HomeScreen() {
	const [user, setUser] = useState();
	const [weight, setWeight] = useState(0);
	const [date, setDate] = useState(moment(new Date()).format("MM-DD-YYYY"));

	const handleOnPress = async () => {
		try {
			let entry = new Entry(weight + 1, date);
			user.addEntry(entry);
			setUser(user);
			setWeight(weight + 1);
			let data = JSON.stringify({ weight: weight + 1 });
			await AsyncStorage.setItem("bodyScale_user", data);
		} catch (err) {
			console.log(err.message);
		}
	};

	const clearAsyncStorage = async () => {
		await AsyncStorage.clear();
		setWeight(0);
		let user = new User();
		setUser(user);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await AsyncStorage.getItem("bodyScale_user");
				if (data !== null) {
					let weight = JSON.parse(data).weight;
					setWeight(weight);
				} else {
					let user = new User();
					console.log(user);
					setUser = setUser(user);
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
			<TouchableOpacity onPress={clearAsyncStorage}>
				<Text>Clear Async Storage</Text>
			</TouchableOpacity>
			<Text>{weight} lbs</Text>
			{/* <Text>{user.entries}</Text> */}
			<Text>Date: {date}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default HomeScreen;
