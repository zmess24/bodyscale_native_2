import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { Octicons } from "@expo/vector-icons";

function Footer({ week: { average, delta, startDate, endDate }, hide }) {
	let negative = delta && delta.indexOf("-") > -1 ? true : false;
	return (
		<View style={tw.style("w-4/5 flex flex-col", hide && "opacity-0")}>
			<View style={tw.style("flex flex-row justify-center mb-3")}>
				<Text style={tw.style("text-sm text-gray-500")}>
					{moment(startDate).format("MMMM Do")} - {moment(endDate).format("MMMM Do, YYYY")}
				</Text>
			</View>
			<View style={tw.style("flex flex-row justify-between")}>
				<View style={tw.style("flex flex-col justify-center")}>
					<Text style={tw.style("text-base text-gray-600")}>Average Weight</Text>
					<Text style={tw.style("text-2xl font-semibold tracking-tight")}>{average} lbs</Text>
				</View>
				<View style={tw.style("flex flex-col justify-center")}>
					<Text style={tw.style("text-base text-gray-600")}>Week Change</Text>
					<Text style={tw.style("text-2xl font-semibold tracking-tight")}>
						{!negative && "+"}
						{delta ? delta : "--"} lbs
					</Text>
				</View>
			</View>
		</View>
	);
}

export default Footer;
