import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import constantStyles from "../../../constants/styles";

function Header() {
	return (
		<View style={styles.container}>
			<TouchableOpacity>
				<Text>All Time</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>This Year</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>This Month</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>This Week</Text>
			</TouchableOpacity>
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
