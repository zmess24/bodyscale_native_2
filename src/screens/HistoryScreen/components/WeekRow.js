import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

const WeekRow = ({ data }) => (
	<View>
		<View style={styles.sectionHeader}>
			<Text>{moment(data.endDate).format("MM-DD-YYYY")}</Text>
			<Text>{data.delta} lbs</Text>
			<Text>{data.average} lbs</Text>
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
