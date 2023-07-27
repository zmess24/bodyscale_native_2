import React from "react";
import { Text, View } from "react-native";
import DataItem from "./DataItem";
import moment from "moment";
import tw from "twrnc";

function Footer({ week: { average, delta, startDate, endDate }, hide, goal }) {
	let remaining = goal ? (goal - average).toFixed(2).toString() : "--";

	return (
		<View style={tw.style("flex-col mb-5", hide && "opacity-0")}>
			<View style={tw.style("flex flex-row justify-center mb-5")}>
				<Text style={tw.style("text-sm text-gray-500")}>
					{moment(startDate).format("MMMM Do")} - {moment(endDate).format("MMMM Do, YYYY")}
				</Text>
			</View>
			<View style={tw.style("flex flex-row justify-between")}>
				<DataItem icon="scale-bathroom" position={""} int={average} type={"numeric"} />
				<DataItem icon="delta" int={delta} />
				<DataItem icon="target" int={remaining} type={remaining === undefined ? "numeric" : "change"} />
			</View>
		</View>
	);
}

export default Footer;
