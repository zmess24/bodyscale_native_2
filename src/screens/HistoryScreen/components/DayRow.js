import React, { memo } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import moment from "moment";

function DayRow({ data: { date, weight }, navigation }) {
	const handlePress = () => navigation.navigate("Home", { date });
	return (
		<Pressable style={styles.sectionItem} onPress={handlePress}>
			<Text>{moment(date).format("MM-DD-YYYY")}</Text>
			<Text>{weight} lbs</Text>
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
