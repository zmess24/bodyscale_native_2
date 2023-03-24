import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constantStyles from "../constants/styles";

function ChartScreen() {
	return (
		<View style={styles}>
			<Text>ChartScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default ChartScreen;
