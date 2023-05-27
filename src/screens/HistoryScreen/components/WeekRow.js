import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WeekRow = ({ data }) => (
	<View>
		<View style={tw.style("flex flex-row justify-between items-center rounded py-2 px-3 bg-gray-100")}>
			<View style={tw.style("flex flex-row items-center")}>
				<MaterialCommunityIcons name="scale-bathroom" size={18} color="gray" />
				<Text style={tw.style("pl-1 text-sm font-semibold")}>{moment(data.endDate).format("MMMM Do, YYYY")}</Text>
			</View>
			<View style={tw.style("flex flex-col items-end")}>
				<Text style={tw.style("text-sm font-semibold")}>{data.average} lbs</Text>
				<Text style={tw.style("text-xs text-gray-600")}>{data.delta} lbs</Text>
			</View>
		</View>
	</View>
);

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
