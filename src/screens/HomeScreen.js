import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { User, Entry } from "../classes";
import constantStyles from "../constants/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

const clearAsyncStorage = async () => {
	const asyncStorageKeys = await AsyncStorage.getAllKeys();
	if (asyncStorageKeys.length > 0) {
		if (Platform.OS === "android") {
			await AsyncStorage.clear();
		}
		if (Platform.OS === "ios") {
			await AsyncStorage.multiRemove(asyncStorageKeys);
		}
	}
};

function HomeScreen() {
	const [user, setUser] = useState();
	const [weight, setWeight] = useState(0);
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleOnPress = async () => {
		try {
			let selectedWeight = weight + 1;
			let selectedDate = moment(date).format("MM-DD-YYYY");
			let entry = new Entry(selectedWeight, selectedDate);
			user.addEntry(entry);
			console.log(user);
			setUser(user);
			setWeight(selectedWeight);
			let data = JSON.stringify({ weight: selectedWeight });
			await AsyncStorage.setItem("bodyScale_user", data);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDateChange = (e, selectedDate) => {
		setDate(selectedDate);
		setShowDatePicker(false);
	};

	const clearAsyncStorage = async () => {
		clearAsyncStorage();
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
			<TouchableOpacity onPress={handleOnPress}>
				<Text>{weight} lbs</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setShowDatePicker(true)}>
				<Text>{moment(date).format("MM-DD-YYYY")}</Text>
				{showDatePicker && (
					<DateTimePicker
						style={{
							marginBottom: "auto",
						}}
						value={date}
						mode={"date"}
						display={"spinner"}
						onChange={handleDateChange}
					/>
				)}
			</TouchableOpacity>
			<TouchableOpacity onPress={clearAsyncStorage}>
				<Text>Clear Async Storage</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
	flexGrow: 1,
});

export default HomeScreen;
