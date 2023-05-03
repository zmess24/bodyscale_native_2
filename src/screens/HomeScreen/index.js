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
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";

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
			<View style={tw.style("w-90 flex flex-row justify-between")}>
				<TouchableOpacity onPress={() => handleDateChange(null, moment(date).subtract(1, "d"))}>
					<MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
				</TouchableOpacity>
				<View style={tw.style("flex flex-col items-center")}>
					<TouchableOpacity onPress={() => togglePicker("weight")}>
						<Text style={tw.style("text-4xl font-bold tracking-tight")}>{weight} lbs</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => togglePicker("date")}>
						<Text style={tw.style("text-base text-gray-600")}>{moment(date).format("MMMM Do, YYYY")}</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					disabled={moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? true : false}
					onPress={() => handleDateChange(null, moment(date).add(1, "d"))}
				>
					<MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
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
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 10,
	},
});

export default HomeScreen;
