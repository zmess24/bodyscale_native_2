import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { Octicons } from "@expo/vector-icons";

function Footer({ week: { average, delta, startDate, endDate }, hide }) {
	let negative = delta && delta.indexOf("-") > -1 ? true : false;
	let formattedDelta = delta.replace("-", "");
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
					<View style={tw.style("flex flex-row items-center")}>
						<Octicons
							style={tw.style("mr-1 text-center")}
							name={negative ? "triangle-down" : "triangle-up"}
							size={26}
							color={negative ? "red" : "green"}
						/>
						<Text style={tw.style("text-2xl font-semibold tracking-tight")}>{formattedDelta ? formattedDelta : "--"} lbs</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Footer;
