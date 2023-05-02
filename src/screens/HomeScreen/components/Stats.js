import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

function StatsWeek({ average, delta, startDate, endDate }) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={{ fontSize: 16, verticalAlign: "middle" }}>Moderate</Text>
				<Text style={{ fontSize: 16, verticalAlign: "middle" }}>Moderate</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		fontSize: 24,
	},
});

export default StatsItem;
