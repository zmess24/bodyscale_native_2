import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Entry } from "../../constants/classes";
import { constantStyles } from "../../constants/styles";
import clearAsyncStorage from "../../constants/functions/clearAsyncStorage";
import WeightPicker from "./components/WeightPicker";
import DatePicker from "./components/DatePicker";
import Header from "./components/Header";
import generateFakeDate from "../../constants/functions/generateFakeDate";

function HomeScreen({ userData: { user, setUser, weight, setWeight, date, setDate }, route }) {
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleWeightChange = async (selectedWeight) => {
		try {
			setShowWeightPicker(false);
			let selectedDate = moment(date).format("YYYY-MM-DD");
			let entry = new Entry(selectedWeight, selectedDate);
			user.createEntry(entry);
			setUser(user);
			setWeight(selectedWeight);
			await AsyncStorage.setItem("bodyScale_user", JSON.stringify(user));
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (route.params && route.params.date) handleDateChange(null, route.params.date);
	}, [route.params]);

	const toggleWeightPicker = () => {
		setShowDatePicker(false);
		setShowWeightPicker(true);
	};

	const toggleDatePicker = () => {
		setShowWeightPicker(false);
		setShowDatePicker(true);
	};

	const handleDateChange = (e, selectedDate) => {
		let entry = user.findEntry(moment(selectedDate).format("YYYY-MM-DD"));
		entry ? setWeight(entry.weight) : setWeight(0);
		setDate(selectedDate);
		setShowDatePicker(false);
	};

	const resetStorage = async () => {
		clearAsyncStorage();
		let user = generateFakeDate();
		console.log("RESET STORAGE", user);
		await AsyncStorage.setItem("bodyScale_user", JSON.stringify(user));
		setUser(user);
		setWeight(0);
	};

	return (
		<View style={styles}>
			<Header />
			<TouchableOpacity onPress={toggleWeightPicker}>
				<Text>{weight} lbs</Text>
			</TouchableOpacity>
			{/* <TouchableOpacity onPress={toggleWeightPicker}>
				<Text>{weight} lbs</Text>
			</TouchableOpacity> */}
			<TouchableOpacity onPress={resetStorage}>
				<Text>Clear Async Storage</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={toggleDatePicker}>
				<Text>{moment(date).format("MM-DD-YYYY")}</Text>
			</TouchableOpacity>
			{showDatePicker && <DatePicker date={date} handleDateChange={handleDateChange} />}
			{showWeightPicker && (
				<WeightPicker handleWeightChange={handleWeightChange} weight={weight !== 0 ? weight : user.entries.at(-1).data.at(-1).weight} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles.screenStyles,
	alignItems: "center",
	justifyContent: "center",
	padding: 20,
});

export default HomeScreen;
