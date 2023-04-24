import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { setStorage } from "../../db";
import moment from "moment";
import { Entry } from "../../constants/classes";
import { constantStyles } from "../../constants/styles";
import WeightPicker from "./components/WeightPicker";
import DatePicker from "./components/DatePicker";
import Header from "./components/Header";

function HomeScreen({ userData: { user, setUser, weight, setWeight, date, setDate }, route }) {
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	console.log(weight);

	useEffect(() => {
		if (route.params && route.params.date) handleDateChange(null, route.params.date);
	}, [route.params]);

	const handleWeightChange = async (selectedWeight) => {
		try {
			setShowWeightPicker(false);
			let selectedDate = moment(date).format("YYYY-MM-DD");
			let entry = new Entry(selectedWeight, selectedDate);
			user.createEntry(entry);
			setUser(user);
			setWeight(selectedWeight);
			await setStorage(user);
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

	const togglePicker = (name) => {
		let datePickerStatus = name === "date" ? true : false;
		let weightPickerStatus = name === "date" ? false : true;
		setShowDatePicker(datePickerStatus);
		setShowWeightPicker(weightPickerStatus);
	};

	return (
		<View style={styles}>
			<Header />
			<TouchableOpacity onPress={() => togglePicker("weight")}>
				<Text>{weight} lbs</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => togglePicker("date")}>
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
