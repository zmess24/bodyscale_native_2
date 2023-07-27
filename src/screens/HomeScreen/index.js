import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { setStorageData } from "../../db";
import moment from "moment";
import { Entry } from "../../constants/classes";
import WeightPicker from "./components/WeightPicker";
import DatePicker from "./components/DatePicker";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import tw from "twrnc";
import DateChangeTabs from "../../components/DateChangeTabs";
import { BottomDrawerMethods } from "react-native-animated-bottom-drawer";

function HomeScreen({ userData: { user, setUser, weight, setWeight, date, setDate, week, setWeek }, route }) {
	const [showWeightPicker, setShowWeightPicker] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [hideFooter, setHideFooter] = useState(false);
	const bottomDrawerRef = useRef(BottomDrawerMethods);

	useEffect(() => {
		if (route.params && route.params.date) handleDateChange(null, route.params.date);
	}, [route.params]);

	const handleWeightChange = async (selectedWeight) => {
		try {
			let selectedDate = moment(date).format("YYYY-MM-DD");
			let entry = new Entry(selectedWeight, selectedDate);
			user.createEntry(entry);
			await setStorageData(user);
			let week = user.findWeek(date);
			setWeek(week);
			setUser(user);
			setWeight(selectedWeight);
			setShowWeightPicker(false);
			setHideFooter(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleDateChange = (e, selectedDate) => {
		try {
			let entry = user.findEntry(selectedDate);
			let week = user.findWeek(selectedDate);
			entry ? setWeight(entry.weight) : setWeight(0);
			setDate(selectedDate);
			setWeek(week);
			setShowDatePicker(false);
			setHideFooter(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const onPressSettings = () => {
		bottomDrawerRef.current.open();
	};

	const togglePicker = (name) => {
		let datePickerStatus = name === "date" ? true : false;
		let weightPickerStatus = name === "date" ? false : true;
		setHideFooter(true);
		setShowDatePicker(datePickerStatus);
		setShowWeightPicker(weightPickerStatus);
	};

	let formattedWeight = weight !== 0 ? weight : user.entries.at(-1) ? user.entries.at(-1).data.at(-1).weight : 50;

	return (
		<View style={tw.style("flex flex-col justify-between grow bg-white pl-3 pr-3 pt-15")}>
			<Header onPressSettings={onPressSettings} />
			<DateChangeTabs date={date} handleDateChange={handleDateChange} dateUnit={"d"}>
				<View style={tw.style("flex flex-col items-center")}>
					<TouchableOpacity onPress={() => togglePicker("weight")}>
						<Text style={tw.style("text-4xl font-bold tracking-tight")}>{weight} lbs</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => togglePicker("date")}>
						<Text style={tw.style("text-base text-gray-600")}>{moment(date).format("MMMM Do, YYYY")}</Text>
					</TouchableOpacity>
				</View>
			</DateChangeTabs>
			<Settings bottomDrawerRef={bottomDrawerRef} />
			{week && <Footer week={week} hide={hideFooter} goal={user.goalWeight} />}
			{showDatePicker && <DatePicker date={date} handleDateChange={handleDateChange} />}
			{showWeightPicker && <WeightPicker handleWeightChange={handleWeightChange} weight={formattedWeight} />}
		</View>
	);
}

export default HomeScreen;
