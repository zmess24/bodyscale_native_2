import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import tw from "twrnc";

function DateChangeTabs({ children, date, handleDateChange, dateUnit }) {
	return (
		<View style={tw.style("flex flex-row justify-between border-2 border-red-900")}>
			<TouchableOpacity onPress={() => handleDateChange(null, new Date(moment(date).subtract(1, dateUnit)))}>
				<MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
			</TouchableOpacity>
			{children}
			<TouchableOpacity
				disabled={moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? true : false}
				onPress={() => handleDateChange(null, new Date(moment(date).add(1, dateUnit)))}
			>
				<MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
			</TouchableOpacity>
		</View>
	);
}

export default DateChangeTabs;
