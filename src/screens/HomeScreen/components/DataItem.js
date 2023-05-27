import React from "react";
import { Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DataItem({ title, int, type = "change" }) {
	let negative, formatted;

	if (int !== undefined) {
		negative = int.indexOf("-") > -1 ? true : false;
		formatted = int.replace("-", "");
	}

	return (
		<View style={tw.style("w-1/3 flex-col justify-center items-center")}>
			<Text style={tw.style("text-xs text-gray-600 items-start uppercase")}>{title}</Text>
			<View style={tw.style("flex flex-row items-center")}>
				{type === "change" && (
					<Octicons
						style={tw.style("mr-1 text-center")}
						name={negative ? "triangle-down" : "triangle-up"}
						size={26}
						color={negative ? "red" : "green"}
					/>
				)}
				<Text style={tw.style("text-lg font-semibold tracking-tight")}>{formatted ? `${formatted} lbs` : "---"}</Text>
			</View>
		</View>
	);
}

export default DataItem;
