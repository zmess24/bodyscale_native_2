import React from "react";
import { StyleSheet, Text, View } from "react-native";
import constantStyles from "../../../constants/styles";

function Header() {
	return (
		<View style={styles.container}>
			<Text>All Time</Text>
			<Text>This Year</Text>
			<Text>This Month</Text>
			<Text>This Week</Text>
			<Text>Tab 5</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-around",
	},
});

export default Header;
