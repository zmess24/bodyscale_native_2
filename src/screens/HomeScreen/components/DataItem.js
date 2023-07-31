import React from "react";
import { Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import tw from "twrnc";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { colorTheme } from "../../../constants/styles";

function DataItem({ icon, int, type = "change" }) {
	let negative, formatted;

	if (int !== undefined) {
		negative = int.indexOf("-") > -1 ? true : false;
		formatted = int.replace("-", "");
	}

	return (
		<View style={tw.style("w-1/3 flex-col items-center")}>
			{icon === "scale-bathroom" ? (
				<MaterialCommunityIcons name="scale-bathroom" size={20} color={colorTheme.accent} />
			) : (
				<FontAwesome name={icon} size={20} color={colorTheme.accent} />
			)}
			<View style={tw.style("flex flex-row items-center mt-1")}>
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
