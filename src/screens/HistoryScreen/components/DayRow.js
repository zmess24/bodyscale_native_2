import React, { memo } from "react";
import { StyleSheet, Text, View, SectionList, SafeAreaView } from "react-native";
import moment from "moment";

const DayRow = ({ data }) => (
	<View style={styles.sectionItem}>
		<Text>{moment(data.date).format("MM-DD-YYYY")}</Text>
		<Text>{data.weight} lbs</Text>
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
