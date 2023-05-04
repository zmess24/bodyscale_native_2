import React, { memo } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import moment from "moment";
import tw from "twrnc";

function DayRow({ data: { date, weight }, navigation }) {
	const handlePress = () => {
		let dateObj = new Date(date);
		let parsed = dateObj.setDate(dateObj.getDate() + 1);
		navigation.navigate("Home", { date: parsed });
	};

	return (
		<Pressable style={styles.sectionItem} onPress={handlePress}>
			<Text style={tw.style("text-base")}>{moment(date).format("MM-DD-YYYY")}</Text>
			<Text style={tw.style("text-base")}>{weight} lbs</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	sectionItem: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
});

export default memo(DayRow);
