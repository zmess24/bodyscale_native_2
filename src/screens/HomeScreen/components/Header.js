import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";

function Header() {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.row}>
				<FontAwesome name="gear" size={24} color="black" />
				{/* <Text style={{ fontSize: 16, verticalAlign: "middle" }}></Text> */}
			</TouchableOpacity>
			<View style={styles.row}>
				<FontAwesome5 name="running" size={26} color="black" />
				<Text style={{ fontSize: 16, verticalAlign: "middle" }}>200 lbs</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		fontSize: 24,
	},
});

export default Header;
