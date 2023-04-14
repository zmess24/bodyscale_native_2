import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import constantStyles from "../../../constants/styles";

function Header({ activeTab, setActiveTimeTab }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setActiveTimeTab("all")}>
				<Text>All Time</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTimeTab("year")}>
				<Text>This Year</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTimeTab("month")}>
				<Text>This Month</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTimeTab("week")}>
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
		borderColor: "#eeeee",
		borderWidth: 1,
		marginRight: 20,
		marginLeft: 20,
	},
});

export default Header;
