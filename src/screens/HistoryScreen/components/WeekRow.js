import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

function WeekRow({ data }) {
	let negative, formatted;

	if (data.delta !== undefined) {
		negative = data.delta.indexOf("-") > -1 ? true : false;
		formatted = data.delta.replace("-", "");
	}

	return (
		<View>
			<View style={tw.style("flex flex-row justify-between items-center rounded py-2 px-3 bg-gray-100")}>
				<View style={tw.style("flex flex-row items-center")}>
					<MaterialCommunityIcons name="scale-bathroom" size={16} color="gray" />
					<Text style={tw.style("pl-2 text-sm font-semibold")}>{moment(data.endDate).format("MMMM Do, YYYY")}</Text>
				</View>
				<View style={tw.style("flex flex-col items-end")}>
					<Text style={tw.style("text-sm font-semibold")}>{data.average} lbs</Text>
					<View style={tw.style("flex flex-row items-center")}>
						<Octicons
							style={tw.style("mr-1 text-center")}
							name={negative ? "triangle-down" : "triangle-up"}
							size={16}
							color={negative ? "red" : "green"}
						/>
						<Text style={tw.style("text-xs text-gray-600")}>{formatted ? `${formatted} lbs` : "---"}</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionHeader: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#eee",
		justifyContent: "space-between",
		padding: 10,
	},
});

export default memo(WeekRow);
