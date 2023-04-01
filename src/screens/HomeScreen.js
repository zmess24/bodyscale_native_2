import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { User, Entry } from "../constants/classes";
import constantStyles from "../constants/styles";
import clearAsyncStorage from "../constants/functions/clearAsyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import useLoadUserData from "../constants/hooks/useLoadUserData";

function HomeScreen() {
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { user, setUser, weight, setWeight, date, setDate } = useLoadUserData();
	const maxDate = new Date(moment().add(1, "days").format("YYYY-MM-DD"));

	const handleWeightChange = async () => {
		try {
			// setShowWeightPicker(true);
			let selectedWeight = weight + 1;
			let selectedDate = moment(date).format("YYYY-MM-DD");
			let entry = new Entry(selectedWeight, selectedDate);
			user.createEntry(entry);
			console.log("USER", user);
			setUser(user);
			setWeight(selectedWeight);
			await AsyncStorage.setItem("bodyScale_user", JSON.stringify(user));
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDateChange = (e, selectedDate) => {
		let entry = user.findEntry(moment(selectedDate).format("YYYY-MM-DD"));
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
					maximumDate={maxDate}
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
