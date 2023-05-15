import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { Octicons } from "@expo/vector-icons";

function Footer({ week: { average, delta, startDate, endDate }, hide }) {
	let negative = delta.indexOf("-") > -1 ? true : false;
	let formattedDelta = delta.replace("-", "");

	return (
		<View style={tw.style("w-100 h-1/6 flex-col", hide && "opacity-0")}>
			<View style={tw.style("flex flex-row justify-center mb-3")}>
				<Text style={tw.style("text-sm text-gray-500")}>
					{moment(startDate).format("MMMM Do")} - {moment(endDate).format("MMMM Do, YYYY")}
				</Text>
			</View>
			<View style={tw.style("flex flex-row h-full justify-around border-solid border-2 border-gray-100")}>
				<View style={tw.style("w-1/3 flex-col justify-center items-center")}>
					<Text style={tw.style("text-xs text-gray-600")}>Average Weight</Text>
					<Text style={tw.style("text-xl font-semibold tracking-tight")}>{average} lbs</Text>
				</View>
				<View style={tw.style("w-1/3 flex-col justify-center items-center border-solid border-l-2 border-r-2 border-gray-100")}>
					<Text style={tw.style("text-xs text-gray-600")}>Week Change</Text>
					<View style={tw.style("flex flex-row items-center")}>
						<Octicons
							style={tw.style("mr-1 text-center")}
							name={negative ? "triangle-down" : "triangle-up"}
							size={26}
							color={negative ? "red" : "green"}
						/>
						<Text style={tw.style("text-xl font-semibold tracking-tight")}>{formattedDelta ? formattedDelta : "--"} lbs</Text>
					</View>
				</View>
				<View style={tw.style("w-1/3 flex-col justify-center items-center")}>
					<Text style={tw.style("text-xs text-gray-600")}>Remaining</Text>
					<View style={tw.style("flex flex-row items-center")}>
						<Octicons
							style={tw.style("mr-1 text-center")}
							name={negative ? "triangle-down" : "triangle-up"}
							size={26}
							color={negative ? "red" : "green"}
						/>
						<Text style={tw.style("text-xl font-semibold tracking-tight")}>{formattedDelta ? formattedDelta : "--"} lbs</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Footer;
