import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { setStorageData } from "../../db";
import moment from "moment";
import { Entry } from "../../constants/classes";
import { constantStyles } from "../../constants/styles";
import WeightPicker from "./components/WeightPicker";
import DatePicker from "./components/DatePicker";
import Header from "./components/Header";
import Footer from "./components/Footer";

function HomeScreen({ userData: { user, setUser, weight, setWeight, date, setDate, week, setWeek }, route }) {
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		if (route.params && route.params.date) handleDateChange(null, route.params.date);
	}, [route.params]);

	const handleWeightChange = async (selectedWeight) => {
		try {
			setShowWeightPicker(false);
			let selectedDate = moment(date).format("YYYY-MM-DD");
			let entry = new Entry(selectedWeight, selectedDate);
			user.createEntry(entry);
			await setStorageData(user);
			setUser(user);
			setWeight(selectedWeight);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDateChange = (e, selectedDate) => {
		let entry = user.findEntry(selectedDate);
		let week = user.findWeek(selectedDate);
		entry ? setWeight(entry.weight) : setWeight(0);
		setDate(selectedDate);
		setWeek(week);
		setShowDatePicker(false);
	};

	const togglePicker = (name) => {
		let datePickerStatus = name === "date" ? true : false;
		let weightPickerStatus = name === "date" ? false : true;
		setShowDatePicker(datePickerStatus);
		setShowWeightPicker(weightPickerStatus);
	};

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.center}>
				<TouchableOpacity onPress={() => togglePicker("weight")}>
					<Text>{weight} lbs</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => togglePicker("date")}>
					<Text>{moment(date).format("MM-DD-YYYY")}</Text>
				</TouchableOpacity>
			</View>
			{week && <Footer week={week} />}
			{showDatePicker && <DatePicker date={date} handleDateChange={handleDateChange} />}
			{showWeightPicker && (
				<WeightPicker handleWeightChange={handleWeightChange} weight={weight !== 0 ? weight : user.entries.at(-1).data.at(-1).weight} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...constantStyles.screenStyles,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-between",
		padding: 20,
	},
	center: {
		display: "flex",
		alignItems: "center",
	},
});

export default HomeScreen;
