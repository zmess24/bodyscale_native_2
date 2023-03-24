import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constantStyles from "../constants/styles";

function HistoryScreen() {
	return (
		<View style={styles}>
			<Text>HistoryScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default HistoryScreen;
