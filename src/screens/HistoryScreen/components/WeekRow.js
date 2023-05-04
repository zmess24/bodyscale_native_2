import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import tw from "twrnc";

const WeekRow = ({ data }) => (
	<View>
		<View style={styles.sectionHeader}>
			<Text style={tw.style("text-base")}>{moment(data.endDate).format("MMMM Do, YYYY")}</Text>
			<Text style={tw.style("text-base")}>{data.delta} lbs</Text>
			<Text style={tw.style("text-base")}>{data.average} lbs</Text>
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
