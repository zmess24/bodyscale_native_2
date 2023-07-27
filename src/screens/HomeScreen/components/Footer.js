import React from "react";
import { Text, View } from "react-native";
import DataItem from "./DataItem";
import moment from "moment";
import tw from "twrnc";

function Footer({ week: { average, delta, startDate, endDate }, hide, goal }) {
	let remaining = goal ? (goal - average).toFixed(2).toString() : goal;

	return (
		<View style={tw.style("flex-col border-2 border-red-900", hide && "opacity-0")}>
			<View style={tw.style("flex flex-row justify-center mb-3")}>
				<Text style={tw.style("text-sm text-gray-500")}>
					{moment(startDate).format("MMMM Do")} - {moment(endDate).format("MMMM Do, YYYY")}
				</Text>
			</View>
			<View style={tw.style("flex flex-row justify-start")}>
				<DataItem icon="scale-bathroom" int={average} type={"numeric"} />
				<DataItem icon="delta" int={delta} />
				<DataItem icon="target" int={remaining} type={remaining === undefined ? "numeric" : "change"} />
			</View>
		</View>
	);
}

export default Footer;
