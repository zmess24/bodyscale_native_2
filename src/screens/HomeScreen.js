import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { User, Entry } from "../classes";
import constantStyles from "../constants/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import useLoadUserData from "../hooks/useLoadUserData";

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
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { user, setUser, weight, setWeight, date, setDate } =
		useLoadUserData();

	const handleWeightChange = async () => {
		try {
			// setShowWeightPicker(true);
			let selectedWeight = weight + 1;
			let selectedDate = moment(date).format("MM-DD-YYYY");
			let entry = new Entry(selectedWeight, selectedDate);
			user.addEntry(entry);
			setUser(user);
			setWeight(selectedWeight);
			await AsyncStorage.setItem("bodyScale_user", JSON.stringify(user));
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDateChange = (e, selectedDate) => {
		let entry = user.findEntry(moment(selectedDate).format("MM-DD-YYYY"));
		entry ? setWeight(entry.weight) : setWeight(0);
		setDate(selectedDate);
		setShowDatePicker(false);
	};

	const resetStorage = async () => {
		clearAsyncStorage();
		let user = new User();
		setUser(user);
		setWeight(0);
	};

	return (
		<View style={styles}>
			<TouchableOpacity onPress={handleWeightChange}>
				<Text>{weight} lbs</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={resetStorage}>
				<Text>Clear Async Storage</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setShowDatePicker(true)}>
				<Text>{moment(date).format("MM-DD-YYYY")}</Text>
			</TouchableOpacity>
			{showDatePicker && (
				<DateTimePicker
					style={constantStyles.pickerStyles}
					value={date}
					mode={"date"}
					display={"spinner"}
					onChange={handleDateChange}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles.screenStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default HomeScreen;
