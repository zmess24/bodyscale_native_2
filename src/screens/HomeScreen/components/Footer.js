import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";

function Footer({ week: { average, delta, startDate, endDate } }) {
	let negative = delta.indexOf("-") > -1 ? true : false;
	return (
		<View style={tw.style("w-4/5 flex flex-col")}>
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
					<Text style={tw.style("text-2xl font-semibold tracking-tight text-green-700", negative && "text-rose-700")}>
						{!negative && "+"}
						{delta} lbs
					</Text>
				</View>
			</View>
		</View>
	);
}

export default Footer;
