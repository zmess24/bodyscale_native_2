import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constantStyles from "../constants/styles";

function SettingsScreen() {
	return (
		<View style={styles}>
			<Text>SettingsScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	...constantStyles,
	alignItems: "center",
	justifyContent: "center",
});

export default SettingsScreen;
