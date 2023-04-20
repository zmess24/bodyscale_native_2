import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

const WeekRow = ({ data: { average, endDate, delta } }) => (
	<View>
		<View style={styles.sectionHeader}>
			<Text>{moment(endDate).format("MM-DD-YYYY")}</Text>
			<Text>{delta} lbs</Text>
			<Text>{average} lbs</Text>
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
