import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import constantStyles from "../../../constants/styles";

function Header({ activeTab, setActiveTab }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setActiveTab("all")} style={[styles.button, activeTab === "all" ? styles.active : styles.inactive]}>
				<Text>All Time</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTab("year")} style={styles.button}>
				<Text>This Year</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTab("month")} style={styles.button}>
				<Text>This Month</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setActiveTab("week")} style={styles.button}>
				<Text>This Week</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "85%",
		justifyContent: "space-around",
		borderColor: "#eeeee",
		borderRadius: 10,
		borderWidth: 1,
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: "white",
	},
	button: {
		padding: 8,
		borderRadius: 10,
	},
	active: {
		backgroundColor: "black",
		color: "white",
	},
	inactive: {
		backgroundColor: "white",
		color: "black",
	},
});

export default Header;
