import React, { memo } from "react";
import { StyleSheet, Text, View, SectionList, SafeAreaView } from "react-native";
import moment from "moment";

const DayRow = ({ data: { weight, date } }) => (
	<View style={styles.sectionItem}>
		<Text>{moment(date).format("MM-DD-YYYY")}</Text>
		<Text>{weight} lbs</Text>
	</View>
);

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
